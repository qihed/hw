import './App.css';
import '../styles/index.css';
import { Outlet } from 'react-router';

const App = () => {
  return (
    <div className="app">
      <Outlet />
    </div>
  );
};

export default App;
