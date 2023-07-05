import IndexedDb from './db';

const indexedDb = new IndexedDb('MyAppDatabase');
indexedDb.openDatabase(['myTable', 'usersApi', 'postsApi']);

export default indexedDb;
