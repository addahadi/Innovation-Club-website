import { useState } from 'react'
import { Routes , Route} from 'react-router-dom'

import DashboardLayout from './Layout/DashboardLayout.jsx'
import "./App.css"
import AdminLogin from './pages/AdminLogin.jsx'
import RequireAdmin from './Layout/RequireAdmin.jsx'
import About from './pages/About.jsx'
import Landing from './pages/Landing.jsx'

import HeroSection from './components/Landing/HeroSection.jsx'
import FAQSection from './components/Landing/FAQSection.jsx'
import GetToKnowUs from './components/Landing/GetToKnowUs.jsx'
import Event from './pages/Event.jsx'
import Home from './pages/Home.jsx'
import WhoWeAre from './components/About/WhoWeAre.jsx'
import Hierarchy from './components/About/Hierarchy.jsx'
import OurValues from './components/About/OurValues.jsx'
import Chart from './components/About/Chart.jsx'
import AdminClubSetting from './pages/AdminClubSetting.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/"  element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="/landing"  element={
          <RequireAdmin>
            <Landing />
          </RequireAdmin>}
        >
          <Route path="hero" element={<HeroSection/>} />
          <Route path="faq" element={<FAQSection />} />
          <Route path="get-to-know-us" element={<GetToKnowUs />} />

        </Route>
        <Route path="about" element={<About />} >
          <Route path="who-we-are" element={<WhoWeAre />} />
          <Route path="hierarchy" element={<Hierarchy />} />
          <Route path="our-values" element={<OurValues />} />
          <Route path="chart" element={<Chart />} />
        </Route>
        <Route path="events" element={<Event />} />
        <Route path="club-settings" element={<AdminClubSetting />} />
      </Route>
      <Route path='/login' element={<AdminLogin/>} />
    </Routes>
  )
}

export default App
