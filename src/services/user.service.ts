import { getData } from "./api";
import indexedDb from "./dbInstance";

async function getIndexedDb() {
    const res = await indexedDb.getValue<any>('usersApi', 1);
    return res.data;
}

async function addData(dataToAdd: any) {
    const success = await indexedDb.putValue('usersApi', dataToAdd);
    if(success) {
        console.log('api cached');
    }
}

export const fetchUsers = async () => {
    try {
        const res = await getData('users');
        const toOffline = { id: 1, data: res }
        addData(toOffline);
        return res;
    } catch(error: any) {
        if(!navigator.onLine) {
            return await getIndexedDb();
        }
        console.log('error', error);
    }
}