import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { MapPin, Zap, Armchair, Building2 } from 'lucide-react'
import { findNearbyCare } from '../api/client.js'

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const row = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 320, damping: 26 } },
}

export default function NearbyCare() {
  const { t } = useTranslation()
  const [facilities, setFacilities] = useState([])
  const [mode, setMode] = useState('fastest')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    findNearbyCare(0, 0)
      .then(setFacilities)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-sand-50 px-4 pb-28 pt-6">
      <motion.h1
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="text-xl font-medium text-ink-900"
      >
        {t('careTitle')}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="relative mt-4 flex gap-1 rounded-full bg-forest-50 p-1"
      >
        <motion.span
          layout
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
          className="absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-forest-700 shadow-sm"
          style={{ left: mode === 'fastest' ? 4 : 'calc(50% + 0px)' }}
        />
        <button
          onClick={() => setMode('fastest')}
          className={`relative z-10 flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-sm font-medium transition-colors ${
            mode === 'fastest' ? 'text-white' : 'text-forest-700'
          }`}
        >
          <Zap size={15} strokeWidth={2} aria-hidden="true" />
          {t('careFastest')}
        </button>
        <button
          onClick={() => setMode('comfort')}
          className={`relative z-10 flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-sm font-medium transition-colors ${
            mode === 'comfort' ? 'text-white' : 'text-forest-700'
          }`}
        >
          <Armchair size={15} strokeWidth={2} aria-hidden="true" />
          {t('careComfort')}
        </button>
      </motion.div>

      <motion.div variants={list} initial="hidden" animate="show" className="mt-6 space-y-3">
        {loading &&
          [0, 1].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.15 }}
              className="h-[72px] rounded-2xl bg-forest-50"
            />
          ))}

        {!loading &&
          facilities.map((f, i) => (
            <motion.div
              key={i}
              variants={row}
              whileHover={{ x: 2 }}
              className="flex items-center gap-3 rounded-2xl border border-forest-100 bg-white px-4 py-3"
            >
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-marigold-50 text-marigold-700"
              >
                <Building2 size={18} strokeWidth={2} aria-hidden="true" />
              </motion.span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink-900">{f.name}</p>
                <p className="text-xs text-ink-500">{f.type}</p>
              </div>
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-forest-50 px-2.5 py-1 text-xs font-medium text-forest-700">
                <MapPin size={12} strokeWidth={2} aria-hidden="true" />
                {f.distanceKm} km
              </span>
            </motion.div>
          ))}
      </motion.div>
    </div>
  )
}
