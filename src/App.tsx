import { FC } from 'react';
import './App.css';
import AppRoutes from './routes';
import { useOnlineStatus } from "./hooks/useOnlineStatus";
import { Link } from 'react-router-dom';
export type Mode = 'online' | 'offline';

const LinkClass = 'bg-blue-400 px-2 py-1 rounded-sm mx-2 text-xs';
const HeaderClass = 'fixed top-0 left-0 right-0 bg-slate-800 border-b-1 z-10'

const App: FC = () => {
  const mode: Mode = useOnlineStatus() === true ? 'online' : 'offline';
  const OfflineClass = 'relative bg-red-800 text-slate-50 py-[0px] text-center w-full text-xs' + " " + (mode === 'online' ? 'hidden' : '') ;
  return (
    <div className="App App-header">
      <div className={HeaderClass}>
        <p className={OfflineClass}>You went offline</p>

        <div className='w-32 flex justify-between mr-auto p-2 '>
          <Link to={'/'} className={LinkClass}>Users</Link>
          <Link to={'/posts'} className={LinkClass}>Posts</Link>
        </div>
      </div>
      <div className='relative top-16'>
        <AppRoutes />
      </div>
    </div>
  )
}

export default App;
