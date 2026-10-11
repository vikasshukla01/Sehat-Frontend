import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Home from './pages/Home.jsx'
import Triage from './pages/Triage.jsx'
import Passport from './pages/Passport.jsx'
import NearbyCare from './pages/NearbyCare.jsx'
import Community from './pages/Community.jsx'
import NavBar from './components/NavBar.jsx'

export default function App() {
  const location = useLocation()
  const { i18n } = useTranslation()
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: reduceMotion ? 0 : 0.22, ease: 'easeOut' }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/triage" element={<Triage />} />
            <Route path="/passport" element={<Passport />} />
            <Route path="/care" element={<NearbyCare />} />
            <Route path="/community" element={<Community />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      <NavBar />
    </>
  )
}
