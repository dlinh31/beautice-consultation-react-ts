import { Routes, Route } from "react-router-dom";

import Home1 from './pages/home-1'
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout'
import Home2 from './pages/home-2'
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<Home1 />} />
          <Route path='/test' element={<Home2 />} />
        </Route>
      </Routes>
    
    </>
  )
}

export default App

