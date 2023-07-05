import { Mode } from "App";
import indexedDb, { IndexDbTable, addPostRequestToIndexedDb, getValueIndexedDb, postValueIndexedDb } from "services/indexedDb";

export const Regex = {
  id: /^[a-z0-9]+$/,
  mobile: /^([0-9]{10})$/,
  latitude: /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/,
  longitude: /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/
};

const basePath = 'https://jsonplaceholder.typicode.com/'

type IndexedDb = {
  tableName: IndexDbTable;
  id: number
}

interface CacheOptions {
  redux?: boolean;
  indexedDb?: boolean;
  dbDetails?: IndexedDb
}

export interface APIOptions {
  cache?: CacheOptions
}

export interface ApiResponse {
  mode: Mode,
  data: any
}

export async function handleErrors(response: Response) {
  if (!response.ok) {
    const err = await response.json();
    throw Error(err.error.message);
  }
  return response.status === 200 ? response.json() : undefined;
}

export function setAccessToken(access_token: string) {
  localStorage.setItem('access_token', access_token);
}

export function clearAccessToken() {
  localStorage.removeItem('access_token');
}

export const getData = async (url = '', options: APIOptions = {}): Promise<ApiResponse> => {
    const finalUrl = `${basePath}${url}`;
    
    const { cache } = options

    if(!navigator.onLine) {
      const hasCache = !!cache && cache.indexedDb && !!cache.dbDetails && !!cache.dbDetails?.tableName;
      if(hasCache) {
        const { data }: any = await getValueIndexedDb(cache.dbDetails!.tableName, cache.dbDetails!.id);
        return { mode: 'offline', data };
      } else {
        return {
          mode: 'offline',
          data: 'No cache found'
        };
      }
    }

    const response = await fetch(finalUrl);
    const data = await response.json();
    
    const hasCache = !!cache && cache.indexedDb && !!cache.dbDetails && !!cache.dbDetails?.tableName;
    if(hasCache) {
      await postValueIndexedDb(cache.dbDetails!.tableName, { id: cache.dbDetails?.id, data});
    }

    return { mode: 'online', data }
}

export const postData = async (url = '', payload: any, options: APIOptions = {}): Promise<ApiResponse> => {
  const finalUrl = `${basePath}${url}`;

  if(!navigator.onLine) {
    const success = await addPostRequestToIndexedDb(url, payload, options);
    return {
      mode: 'offline',
      data: {
        cached: success,
        message: 'will be called once connection is regained'
      }
    }
  }
  
  const response = await fetch(finalUrl, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })

  const data = await response.json();

  return { mode: 'online', data: data || { staus: 'success' } };
}