import React, { FC, useEffect, useState } from "react";

const Users: FC = () => {

  const [users, setUsers] = useState<any[]>([])
  const [mode, setMode] = useState<string>('online')

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

  return (
    <div>
      <h1>yohohoho - {mode}</h1>

      <div>
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