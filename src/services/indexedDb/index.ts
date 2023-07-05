import { APIOptions } from 'services/api';
import IndexedDb from './db';

export enum IndexDbTable {
	users = 'usersApi',
	posts = 'postsApi',
	postRequests = 'postRequests'
}

const indexedDb = new IndexedDb('MyAppDatabase');
indexedDb.openDatabase(['myTable', IndexDbTable.users, IndexDbTable.posts, IndexDbTable.postRequests]);

export const getValueIndexedDb = async (table: IndexDbTable, id: number) => {
	const res = await indexedDb.getValue<any>(table, id);
	return res;
}

export const getAllValueIndexedDb = async (table: IndexDbTable) => {
	const res = await indexedDb.getAllValue<any[]>(table);
	return res;
}

export const postValueIndexedDb = async (table: IndexDbTable, dataToAdd: any): Promise<boolean> => {
	const success = await indexedDb.putValue(table, dataToAdd);
	return success;
}
  
export const addPostRequestToIndexedDb = async (url: string, payload: any, options: APIOptions): Promise<boolean> => {
	const pendingPostRequests = await getAllValueIndexedDb(IndexDbTable.postRequests);

	const requestDetails = { url, payload, options }

	const newRequest = {
		id: pendingPostRequests.length + 1,
		data: requestDetails
	}

	const success: boolean = await postValueIndexedDb(IndexDbTable.postRequests, newRequest);

	return success;
}

export const deleteValue = async (table: IndexDbTable, id: number) => {
	const success = await indexedDb.deleteValue(table, id);
	return success;
}

export default indexedDb;
