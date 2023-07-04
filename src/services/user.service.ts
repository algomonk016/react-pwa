import { getData } from "./api";

export const fetchUsers = async () => {
    try {
        const res = await getData('users');
        return res;
    } catch(error) {
        console.log('error', error)
    }
}