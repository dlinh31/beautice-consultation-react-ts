import { Outlet } from "react-router-dom";
import {Navbar, Footer} from './components';
const DefaultLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default DefaultLayout;
