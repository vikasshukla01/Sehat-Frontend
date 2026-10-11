import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { User, Stethoscope, HeartPulse, HandHeart } from 'lucide-react'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'

const roles = [
  { key: 'rolePatient', to: '/triage', icon: User },
  { key: 'roleDoctor', to: '/passport', icon: Stethoscope },
  { key: 'roleAsha', to: '/community', icon: HeartPulse },
  { key: 'roleCaregiver', to: '/care', icon: HandHeart },
]

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-screen flex-col bg-sand-50">
      <header className="flex items-center justify-between px-6 py-5">
        <span className="font-display text-lg font-medium italic text-forest-700">{t('appName')}</span>
        <LanguageSwitcher />
      </header>

      <main className="flex-1 px-6 pb-28">
        {/* Hero: the "journey" from village to care, the pitch's central metaphor */}
        <div className="relative overflow-hidden rounded-3xl bg-forest-700 px-6 pt-8 pb-10 text-center">
          <svg
            viewBox="0 0 320 90"
            className="mx-auto mb-5 h-20 w-full max-w-xs"
            role="img"
            aria-label="A path connecting a home to a health centre"
          >
            <path
              d="M20 60 C 80 60, 90 20, 150 20 S 250 70, 300 30"
              fill="none"
              stroke="#F0A93B"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="240"
              className="animate-draw"
            />
            {/* home */}
            <g className="animate-fade-in" style={{ animationDelay: '0.9s' }}>
              <path d="M8 60 L20 50 L32 60 V74 H8 Z" fill="#D3E3D2" />
              <rect x="16" y="64" width="8" height="10" fill="#1F6B43" />
            </g>
            {/* care cross */}
            <g className="animate-fade-in animate-bob" style={{ animationDelay: '1.1s' }}>
              <circle cx="300" cy="30" r="14" fill="#FDF3E2" />
              <path d="M300 23v14M293 30h14" stroke="#B96D0C" strokeWidth="2.5" strokeLinecap="round" />
            </g>
          </svg>

          <h1 className="mx-auto max-w-[15ch] text-balance text-2xl font-medium leading-snug text-white animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {t('tagline')}
          </h1>
        </div>

        <p className="mt-7 text-center text-sm font-medium text-ink-700 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          {t('whoAreYou')}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          {roles.map((role, i) => {
            const Icon = role.icon
            return (
              <Link
                key={role.key}
                to={role.to}
                className="group flex flex-col items-start gap-3 rounded-2xl border border-forest-100 bg-white px-4 py-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-forest-400 hover:shadow-md active:translate-y-0 active:scale-[0.98]"
                style={{ animationDelay: `${0.35 + i * 0.05}s` }}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-50 text-forest-700 transition-colors group-hover:bg-marigold-100 group-hover:text-marigold-700">
                  <Icon size={20} strokeWidth={2} aria-hidden="true" />
                </span>
                <span className="text-sm font-medium text-ink-900">{t(role.key)}</span>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
