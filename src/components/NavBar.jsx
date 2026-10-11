import { NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Home as HomeIcon, Stethoscope, QrCode, MapPin, Users } from 'lucide-react'

const items = [
  { to: '/', key: 'navHome', icon: HomeIcon },
  { to: '/triage', key: 'navTriage', icon: Stethoscope },
  { to: '/passport', key: 'navPassport', icon: QrCode },
  { to: '/care', key: 'navCare', icon: MapPin },
  { to: '/community', key: 'navCommunity', icon: Users },
]

export default function NavBar() {
  const { t } = useTranslation()
  const { pathname } = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 border-t border-forest-100 bg-white/95 backdrop-blur sm:static sm:border-none sm:bg-transparent">
      <div className="mx-auto flex max-w-sm items-stretch justify-between px-2 py-1.5 sm:max-w-none sm:justify-center sm:gap-2">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = item.to === '/' ? pathname === '/' : pathname === item.to

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className="relative flex flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-[11px] font-medium transition-colors sm:flex-row sm:gap-1.5 sm:px-3 sm:py-2 sm:text-sm"
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-xl bg-forest-50"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                />
              )}
              <span className={`relative z-10 transition-transform ${isActive ? 'scale-110 text-forest-700' : 'text-ink-500'}`}>
                <Icon size={20} strokeWidth={2} aria-hidden="true" />
              </span>
              <span className={`relative z-10 ${isActive ? 'text-forest-700' : 'text-ink-500'}`}>{t(item.key)}</span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
