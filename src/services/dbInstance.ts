import IndexedDb from './db';

const indexedDb = new IndexedDb('MyAppDatabase');
indexedDb.openDatabase(['myTable']);

export default indexedDb;
