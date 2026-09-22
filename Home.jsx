import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'

const roles = [
  { key: 'rolePatient', to: '/triage' },
  { key: 'roleDoctor', to: '/passport' },
  { key: 'roleAsha', to: '/community' },
  { key: 'roleCaregiver', to: '/care' },
]

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-screen flex-col bg-pine-50">
      <header className="flex items-center justify-between px-6 py-5">
        <span className="font-display text-lg font-semibold text-pine-700">{t('appName')}</span>
        <LanguageSwitcher />
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 pb-24 text-center">
        <h1 className="max-w-sm text-3xl font-semibold leading-snug text-ink-900">
          {t('tagline')}
        </h1>

        <p className="mt-3 max-w-xs text-sm text-ink-900/60">{t('whoAreYou')}</p>

        <div className="mt-8 grid w-full max-w-sm grid-cols-2 gap-3">
          {roles.map((role) => (
            <Link
              key={role.key}
              to={role.to}
              className="rounded-2xl border border-pine-100 bg-white px-4 py-6 text-sm font-medium text-pine-700 shadow-sm transition hover:border-pine-400 hover:shadow"
            >
              {t(role.key)}
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
