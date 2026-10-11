import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 border-t border-forest-100 bg-white/95 backdrop-blur sm:static sm:border-none sm:bg-transparent">
      <div className="mx-auto flex max-w-sm items-stretch justify-between px-2 py-1.5 sm:max-w-none sm:justify-center sm:gap-2">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-[11px] font-medium transition sm:flex-row sm:gap-1.5 sm:px-3 sm:py-2 sm:text-sm ${
                  isActive
                    ? 'bg-forest-50 text-forest-700'
                    : 'text-ink-500 hover:text-forest-600'
                }`
              }
            >
              <Icon size={20} strokeWidth={2} aria-hidden="true" />
              <span>{t(item.key)}</span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
