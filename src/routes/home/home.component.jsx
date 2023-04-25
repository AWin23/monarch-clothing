import { Outlet } from 'react-router-dom';

import Directory from '../../components/directory/directory.component';

const Home = () => {
  return (
    <div>
       <h1 style={{ textAlign: 'center' }}>Welcome to Monarch Clothing</h1>
      <Directory />
      <Outlet />
    </div>
  );
};

export default Home;
