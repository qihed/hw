import { Outlet } from 'react-router';
import { useQueryParamsStoreInit } from '../hooks/useQueryParamsStoreInit';

const App = () => {
  useQueryParamsStoreInit();

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default App;
