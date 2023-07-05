import { IDBPDatabase, openDB } from 'idb';

class IndexedDb {
  private database: string;
  private db: IDBPDatabase | null;

  constructor(database: string) {
    this.database = database;
    this.db = null;
  }

  public async openDatabase(tableNames: string[]): Promise<boolean> {
    try {
      this.db = await openDB(this.database, 1, {
        upgrade(db: IDBPDatabase) {
          for (const tableName of tableNames) {
            if (!db.objectStoreNames.contains(tableName)) {
              db.createObjectStore(tableName, { autoIncrement: true, keyPath: 'id' });
            }
          }
        },
      });
  
      // Verify that all specified object stores exist
      const missingObjectStores = tableNames.filter(tableName => !this.db!.objectStoreNames.contains(tableName));
      if (missingObjectStores.length > 0) {
        throw new Error(`Object stores not found: ${missingObjectStores.join(', ')}`);
      }
  
      return true;
    } catch (error) {
      console.error('Failed to open database:', error);
      return false;
    }
  }
  

  public async getValue<T>(tableName: string, id: number): Promise<T | undefined> {
    if (!this.db) {
      console.error('Database is not open.');
      return undefined;
    }

    const tx = this.db.transaction(tableName, 'readonly');
    const store = tx.objectStore(tableName);
    try {
      const result = await store.get(id);
      console.log('Get Data ', result);
      return result;
    } catch (error) {
      console.error(`Failed to get value from ${tableName}:`, error);
      return undefined;
    }
  }

  public async getAllValue<T>(tableName: string): Promise<T[]> {
    if (!this.db) {
      console.error('Database is not open.');
      return [];
    }

    const tx = this.db.transaction(tableName, 'readonly');
    const store = tx.objectStore(tableName);
    try {
      const result = await store.getAll();
      console.log('Get All Data', result);
      return result;
    } catch (error) {
      console.error(`Failed to get all values from ${tableName}:`, error);
      return [];
    }
  }

  public async putValue<T>(tableName: string, value: T): Promise<boolean> {
    if (!this.db) {
      console.error('Database is not open.');
      return false;
    }

    const tx = this.db.transaction(tableName, 'readwrite');
    const store = tx.objectStore(tableName);
    try {
      await store.put(value);
      console.log('Put Data ', value);
      return true;
    } catch (error) {
      console.error(`Failed to put value in ${tableName}:`, error);
      return false;
    }
  }

  public async putBulkValue<T>(tableName: string, values: T[]): Promise<T[]> {
    if (!this.db) {
      console.error('Database is not open.');
      return [];
    }

    const tx = this.db.transaction(tableName, 'readwrite');
    const store = tx.objectStore(tableName);
    try {
      for (const value of values) {
        await store.put(value);
        console.log('Put Bulk Data ', value);
      }
      return await this.getAllValue(tableName);
    } catch (error) {
      console.error(`Failed to put bulk values in ${tableName}:`, error);
      return [];
    }
  }

  public async deleteValue(tableName: string, id: number): Promise<boolean> {
    if (!this.db) {
      console.error('Database is not open.');
      return false;
    }

    const tx = this.db.transaction(tableName, 'readwrite');
    const store = tx.objectStore(tableName);
    try {
      const result = await store.get(id);
      if (!result) {
        console.log('Id not found', id);
        return false;
      }
      await store.delete(id);
      console.log('Deleted Data', id);
      return true;
    } catch (error) {
      console.error(`Failed to delete value from ${tableName}:`, error);
      return false;
    }
  }
}

export default IndexedDb;