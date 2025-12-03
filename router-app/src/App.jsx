import { useState } from 'react'
import { Routes , Route} from 'react-router-dom'

import DashboardLayout from './Layout/DashboardLayout.jsx'
import Home from './pages/home.jsx'
import "./App.css"
import AdminLogin from './pages/AdminLogin.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/"  element={<DashboardLayout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path='/login' element={<AdminLogin/>} />
    </Routes>
  )
}

export default App
