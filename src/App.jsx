import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Home from './pages/Home.jsx'
import Triage from './pages/Triage.jsx'
import Passport from './pages/Passport.jsx'
import NearbyCare from './pages/NearbyCare.jsx'
import Community from './pages/Community.jsx'
import NavBar from './components/NavBar.jsx'

export default function App() {
  const { pathname } = useLocation()
  const { i18n } = useTranslation()

  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <>
      <div key={pathname} className="animate-fade-in">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/triage" element={<Triage />} />
          <Route path="/passport" element={<Passport />} />
          <Route path="/care" element={<NearbyCare />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </div>
      <NavBar />
    </>
  )
}
