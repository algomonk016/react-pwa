import { Post } from ".";
import { ApiResponse, getData, postData } from "services/api";
import { IndexDbTable } from "services/indexedDb";

export const fetchPosts = async (): Promise<ApiResponse> => {
    try {
        const res = await getData('posts', {
            cache: {
                indexedDb: true,
                dbDetails: {
                    tableName: IndexDbTable.posts,
                    id: 1
                }
            }
        });
        return res;
    } catch(error: any) {
        return {
            mode: 'online',
            data: error
        }
    }
}

export const addPost = async (post: Post) => {
    try {
        const res = await postData('posts', post);
        return res;
    } catch(error) {
        console.log('error', error)
    }
}