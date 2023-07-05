import { ApiResponse, getData } from "services/api";
import { IndexDbTable } from "services/indexedDb";

export const fetchUsers = async (): Promise<ApiResponse> => {
    try {
        const res = await getData('users', {
            cache: {
                indexedDb: true,
                dbDetails: {
                    tableName: IndexDbTable.users,
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