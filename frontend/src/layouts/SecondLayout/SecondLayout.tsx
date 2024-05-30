import { Outlet } from "react-router-dom";
import {Navbar, Footer} from './components';
const SecondLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default SecondLayout;
