// import { Stores, addData } from "./db";

export const Regex = {
  id: /^[a-z0-9]+$/,
  mobile: /^([0-9]{10})$/,
  latitude: /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/,
  longitude: /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/
};

const basePath = 'https://jsonplaceholder.typicode.com/'

interface CacheOptions {
  redux?: boolean;
  indexedDb?: boolean;
}

export interface APIOptions {
  cache?: CacheOptions
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

export async function getData(url = '', options: APIOptions = {}) {
    const finalUrl = `${basePath}${url}`;
    
    return fetch(finalUrl)
      .then(res => res.json())
}

export async function postData(url = '', payload: any,options: APIOptions = {}) {
  const finalUrl = `${basePath}${url}`;
  
  return fetch(finalUrl, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(res => res.json())
}