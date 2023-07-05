import { Post } from ".";
import { getData, postData } from "../../services/api";
import indexedDb from "../../services/dbInstance";

async function getIndexedDb(id: number) {
    const res = await indexedDb.getValue<any>('postsApi', id);
    return res.data;
}

async function addData(dataToAdd: any) {
    const success = await indexedDb.putValue('postsApi', dataToAdd);
    if(success) {
        console.log('api cached');
    }
}

export const fetchPosts = async () => {
    try {
        const res = await getData('posts');
        const toOffline = { id: 1, data: res }
        addData(toOffline);
        return res;
    } catch(error: any) {
        if(!navigator.onLine) {
            return await getIndexedDb(1);
        }
        console.log('error', error);
    }
}

export const addPost = async (post: Post) => {
    try {
        const res = await postData('posts', post);
        return res;
    } catch(error) {
        if(!navigator.onLine) {
            return {
                status: 'offline',
                message: 'will be added once reconnected to internet'
            }
        }
    }
}