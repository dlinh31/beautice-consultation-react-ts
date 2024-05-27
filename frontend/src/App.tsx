import { Routes, Route } from "react-router-dom";
import Home1 from './pages/home-1'
import Home2 from './pages/home-2'
import Login from "./pages/auth/components/Login";
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<Home1 />} />
          <Route path='/test' element={<Home2 />} />
        </Route>
        <Route path='/login' element={<Login />}>

        </Route>
      </Routes>
    </>
  )
}

export default App

