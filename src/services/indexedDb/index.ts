import IndexedDb from './db';

export enum IndexDbTable {
    users = 'usersApi',
    posts = 'postsApi'
}

const indexedDb = new IndexedDb('MyAppDatabase');
indexedDb.openDatabase(['myTable', IndexDbTable.users, IndexDbTable.posts]);

export default indexedDb;
