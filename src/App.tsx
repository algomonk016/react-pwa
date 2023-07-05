import { FC, useEffect } from 'react';
import './App.css';
import AppRoutes from './routes';
import { useOnlineStatus } from "./hooks/useOnlineStatus";
import { Link } from 'react-router-dom';
import { postData } from 'services/api';
import { IndexDbTable, deleteValue, getAllValueIndexedDb } from 'services/indexedDb';
import { toast } from 'react-toastify';
import { openToast } from 'utils/toast';
export type Mode = 'online' | 'offline';

const LinkClass = 'bg-blue-400 px-2 py-1 rounded-sm mx-2 text-xs';
const HeaderClass = 'fixed top-0 left-0 right-0 bg-slate-800 border-b-1 z-10'

const App: FC = () => {
  const mode: Mode = useOnlineStatus() === true ? 'online' : 'offline';
  const OfflineClass = 'relative bg-red-800 text-slate-50 py-[0px] text-center w-full text-xs' + " " + (mode === 'online' ? 'hidden' : '') ;

  useEffect(() => {
    const processPendingRequests = async () => {
      const pendingPostRequests = await getAllValueIndexedDb(IndexDbTable.postRequests);
      for(const request of pendingPostRequests) {
        const { id, data } = request as any;
        const { url, payload, options } = data;
        const response = await postData(url, payload, options);
        if(!!response.data) {
          const success = await deleteValue(IndexDbTable.postRequests, id);
          openToast(`Post request Success: ${url} ${JSON.stringify(payload)}`, 'success');
        }
      }
    }

    if(mode === 'online') {
      processPendingRequests();
    }
  }, [mode])

  return (
    <div className="App App-header">
      <div className={HeaderClass}>
        <p className={OfflineClass}>You're offline</p>
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
