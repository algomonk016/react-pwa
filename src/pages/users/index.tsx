import { FC, useEffect, useState } from "react";
import indexedDb from 'services/indexedDb';
import { fetchUsers } from "./user.service";
import { ApiResponse } from "services/api";
import { Mode } from "App";

const Users: FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [apiResponseType, setApiResponseType] = useState<Mode>('online');

  // indexed db
  const [cnt, setCnt] = useState<number>(0);
  const [users2, setUsers2] = useState<any[]>([]);

  useEffect(() => { getData(); }, [])

  useEffect(() => {
    const fetchUsersWrapper = async () => {
      const res: ApiResponse = await fetchUsers();
      setApiResponseType(res.mode);
      setUsers(res.data);
    }

    fetchUsersWrapper();
  }, []) 

  async function addData() {
    const dataToAdd = { id: cnt, name: 'Shivesh Tiwari', age: 23 };
    const success = await indexedDb.putValue('myTable', dataToAdd);
    if (success) {
      getData();
    } else {
      console.error('Failed to add data');
    }
  }
  
  async function getData() {
    const data = await indexedDb.getAllValue<any>('myTable');
    setUsers2(data);
    if(data.length === 0) setCnt(1);
    else setCnt(data.at(-1).id + 1);
  }

  async function deleteData(id: number) {
    await indexedDb.deleteValue('myTable', id);
    getData();
  }

  return (
    <div>
      <div className="border-2 border-t-0 border-indigo-500 rounded-lg px-2">
        <div className="flex items-center justify-between">
          <p className="capitalize text-xl text-slate-100">indexedDB users</p>
          <button className="button bg-orange-600 px-2 py-1 rounded-lg my-2" onClick={addData}>Add</button>
        </div>
        <div>
          {
            users2.map(user => (
              <div key={`users-2-${user.id}`} className="flex items-center justify-between my-2">
                {user.id}-{user.name}
                <button onClick={() => deleteData(user.id)} className="ml-4 button bg-red-800 rounded-xl px-2.5 flex items-center pb-1">x</button>
              </div>
            ))
          }
        </div>
      </div>

      <div className="border-2 border-t-0 border-indigo-500 rounded-lg px-2 mt-5">
        <p className="capitalize text-xl text-slate-100">Api fetched users : {apiResponseType}</p>
        { 
          (users || []).map(user => (
            <div key={user.id} className="my-1">
              {user.name} : {user.username}
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Users