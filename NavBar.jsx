import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const items = [
  { to: '/', key: 'navHome' },
  { to: '/triage', key: 'navTriage' },
  { to: '/passport', key: 'navPassport' },
  { to: '/care', key: 'navCare' },
  { to: '/community', key: 'navCommunity' },
]

export default function NavBar() {
  const { t } = useTranslation()
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 flex justify-around border-t border-pine-100 bg-white py-2 sm:static sm:justify-center sm:gap-8 sm:border-none sm:bg-transparent sm:py-0">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `px-2 py-1 text-xs sm:text-sm font-medium ${
              isActive ? 'text-pine-700' : 'text-ink-900/50'
            }`
          }
        >
          {t(item.key)}
        </NavLink>
      ))}
    </nav>
  )
}
