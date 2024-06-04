import {Routes, Route, Navigate } from "react-router-dom";
import Home1 from './pages/home1'
import Home2 from './pages/home2'
import Auth from "./pages/auth";
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout'
import SecondLayout from "./layouts/SecondLayout/SecondLayout";
import RequireAuth from "./pages/auth/RequireAuth/RequireAuth";
const App = () => {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Auth isLogin={true} />} />
        <Route path='/signup' element={<Auth isLogin={false} />} />
        <Route path='/' element={<DefaultLayout />}>
            <Route index element={<Home1 />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path='/' element={<SecondLayout />}>
            <Route path='/home2' element={<Home2 />} />
          </Route>
        </Route>
        {/* <Route path="*" element={<Navigate to="/" replace={true} />} /> */}
      </Routes>
    </>
  )
}

export default App

