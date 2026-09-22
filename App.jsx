import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Triage from './pages/Triage.jsx'
import Passport from './pages/Passport.jsx'
import NearbyCare from './pages/NearbyCare.jsx'
import Community from './pages/Community.jsx'
import NavBar from './components/NavBar.jsx'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/triage" element={<Triage />} />
        <Route path="/passport" element={<Passport />} />
        <Route path="/care" element={<NearbyCare />} />
        <Route path="/community" element={<Community />} />
      </Routes>
      <NavBar />
    </>
  )
}
