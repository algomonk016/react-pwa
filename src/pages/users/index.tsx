import { FC, useEffect, useState } from "react";
import indexedDb from '../../services/dbInstance';

const Users: FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [mode, setMode] = useState<string>('online');

  // indexed db
  const [cnt, setCnt] = useState<number>(0);
  const [users2, setUsers2] = useState<any[]>([]);

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    const url = 'https://random-data-api.com/api/v2/users?size=2';
    fetch(url)
      .then(res => res.json())
      .then(res => {
        setUsers(res)
        setMode('online');
        localStorage.setItem('users', JSON.stringify(res));
      })
      .catch(res => {
        setMode('offline')
        const data = JSON.parse(localStorage.getItem('users') || '')
        if(!!data) setUsers(data)
      })
  }, []) 

  async function addData() {
    const dataToAdd = { id: cnt, name: 'Shivesh Tiwari', age: 23 };
    const success = await indexedDb.putValue('myTable', dataToAdd);
    if (success) {
      console.log('Data added successfully');
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
            users2.map(user => (
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
              {user.first_name} {user.last_name}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Users