import { FC } from 'react';
import './App.css';
import AppRoutes from './routes';
import { useOnlineStatus } from "./hooks/useOnlineStatus";
export type Mode = 'online' | 'offline';

const App: FC = () => {
  const mode: Mode = useOnlineStatus() === true ? 'online' : 'offline';
  return (
    <div className="App App-header">
      {
        mode === 'offline' && <p className='fixed top-0 left- 0 right-0 bg-red-800 text-slate-50 py-1 text-center w-full text-xs'>You went offline</p>
      }
      <AppRoutes />
    </div>
  )
}

export default App;
