import { FC, useEffect, useState } from "react";
import indexedDb from '../../services/dbInstance';
import { fetchUsers } from "../../services/user.service";

type Mode = 'online' | 'offline';

const Users: FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [mode, setMode] = useState<Mode>('online');

  // indexed db
  const [cnt, setCnt] = useState<number>(0);
  const [users2, setUsers2] = useState<any[]>([]);

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    const fetchUsersWrapper = async () => {
      const res = await fetchUsers();
      setUsers(res);
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
      <h1>yohohoho - {mode}</h1>

      <div>
        <button onClick={addData}>Add</button>
        <p style={{ fontSize: 24, fontWeight: '800' }}>indexedDB users</p>

        <div>
          {
            (users2 || []).map(user => (
              <div key={`users-2-${user.id}`}>
                {user.id}-{user.name}

                <button onClick={() => deleteData(user.id)} style={{ margin: '10px' }}>X</button>
              </div>
            ))
          }
        </div>
      </div>

      <div>
        <p style={{ fontSize: 24, fontWeight: '800' }}>Api fetched users</p>
        { 
          users.map(user => (
            <div key={user.id}>
              {user.name} : {user.username}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Users