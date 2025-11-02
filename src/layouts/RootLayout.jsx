import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import Footer from '../pages/home/Footer/Footer';

const RootLayout = () => {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
