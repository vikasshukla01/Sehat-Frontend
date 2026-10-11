import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Stethoscope, HeartPulse, HandHeart } from 'lucide-react'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'

const roles = [
  { key: 'rolePatient', to: '/triage', icon: User },
  { key: 'roleDoctor', to: '/passport', icon: Stethoscope },
  { key: 'roleAsha', to: '/community', icon: HeartPulse },
  { key: 'roleCaregiver', to: '/care', icon: HandHeart },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
}

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
}

export default function Home() {
  const { t } = useTranslation()

  return (
    <div className="flex min-h-screen flex-col bg-sand-50">
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between px-6 py-5"
      >
        <span className="font-display text-lg font-medium italic text-forest-700">{t('appName')}</span>
        <LanguageSwitcher />
      </motion.header>

      <main className="flex-1 px-6 pb-28">
        {/* Hero: the "journey" from village to care, the pitch's central metaphor */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-3xl bg-forest-700 px-6 pt-8 pb-10 text-center"
        >
          <svg
            viewBox="0 0 320 90"
            className="mx-auto mb-5 h-20 w-full max-w-xs"
            role="img"
            aria-label="A path connecting a home to a health centre"
          >
            <path
              id="journey-path"
              d="M20 60 C 80 60, 90 20, 150 20 S 250 70, 300 30"
              fill="none"
              stroke="#F0A93B"
              strokeOpacity="0.35"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <motion.path
              d="M20 60 C 80 60, 90 20, 150 20 S 250 70, 300 30"
              fill="none"
              stroke="#F0A93B"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, delay: 0.5, ease: 'easeInOut' }}
            />
            <motion.circle
              r="4"
              fill="#FDF3E2"
              initial={{ offsetDistance: '0%', opacity: 0 }}
              animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.6, delay: 1.7, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' }}
              style={{ offsetPath: "path('M20 60 C 80 60, 90 20, 150 20 S 250 70, 300 30')" }}
            />
            <motion.g
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            >
              <path d="M8 60 L20 50 L32 60 V74 H8 Z" fill="#D3E3D2" />
              <rect x="16" y="64" width="8" height="10" fill="#1F6B43" />
            </motion.g>
            <motion.g
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.5, type: 'spring', stiffness: 260, damping: 14 }}
            >
              <motion.circle
                cx="300"
                cy="30"
                r="14"
                fill="#FDF3E2"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              />
              <path d="M300 23v14M293 30h14" stroke="#B96D0C" strokeWidth="2.5" strokeLinecap="round" />
            </motion.g>
          </svg>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mx-auto max-w-[15ch] text-balance text-2xl font-medium leading-snug text-white"
          >
            {t('tagline')}
          </motion.h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="mt-7 text-center text-sm font-medium text-ink-700"
        >
          {t('whoAreYou')}
        </motion.p>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-4 grid grid-cols-2 gap-3"
        >
          {roles.map((role) => {
            const Icon = role.icon
            return (
              <motion.div key={role.key} variants={item} whileTap={{ scale: 0.96 }}>
                <Link
                  to={role.to}
                  className="group flex flex-col items-start gap-3 rounded-2xl border border-forest-100 bg-white px-4 py-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-forest-400 hover:shadow-md"
                >
                  <motion.span
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.4 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-50 text-forest-700 transition-colors group-hover:bg-marigold-100 group-hover:text-marigold-700"
                  >
                    <Icon size={20} strokeWidth={2} aria-hidden="true" />
                  </motion.span>
                  <span className="text-sm font-medium text-ink-900">{t(role.key)}</span>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </main>
    </div>
  )
}
