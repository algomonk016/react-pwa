import React, { FC } from 'react';
import logo from './logo.svg';
import './App.css';
import Users from './pages/users';


const App: FC = () => {
  return (
    <div className="App App-header">
      <Users />
    </div>
  )
}

export default App;
