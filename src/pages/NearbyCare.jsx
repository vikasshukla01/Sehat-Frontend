import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MapPin, Zap, Armchair, Building2 } from 'lucide-react'
import { findNearbyCare } from '../api/client.js'

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
      <h1 className="text-xl font-medium text-ink-900 animate-fade-up">{t('careTitle')}</h1>

      <div className="mt-4 flex gap-1 rounded-full bg-forest-50 p-1 animate-fade-up" style={{ animationDelay: '0.08s' }}>
        <button
          onClick={() => setMode('fastest')}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-sm font-medium transition ${
            mode === 'fastest' ? 'bg-forest-700 text-white shadow-sm' : 'text-forest-700'
          }`}
        >
          <Zap size={15} strokeWidth={2} aria-hidden="true" />
          {t('careFastest')}
        </button>
        <button
          onClick={() => setMode('comfort')}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-sm font-medium transition ${
            mode === 'comfort' ? 'bg-forest-700 text-white shadow-sm' : 'text-forest-700'
          }`}
        >
          <Armchair size={15} strokeWidth={2} aria-hidden="true" />
          {t('careComfort')}
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {loading &&
          [0, 1].map((i) => (
            <div key={i} className="h-[72px] animate-pulse rounded-2xl bg-forest-50" />
          ))}

        {!loading &&
          facilities.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-2xl border border-forest-100 bg-white px-4 py-3 animate-fade-up"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-marigold-50 text-marigold-700">
                <Building2 size={18} strokeWidth={2} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink-900">{f.name}</p>
                <p className="text-xs text-ink-500">{f.type}</p>
              </div>
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-forest-50 px-2.5 py-1 text-xs font-medium text-forest-700">
                <MapPin size={12} strokeWidth={2} aria-hidden="true" />
                {f.distanceKm} km
              </span>
            </div>
          ))}
      </div>
    </div>
  )
}
