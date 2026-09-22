import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { findNearbyCare } from '../api/client.js'

export default function NearbyCare() {
  const { t } = useTranslation()
  const [facilities, setFacilities] = useState([])

  useEffect(() => {
    findNearbyCare(0, 0).then(setFacilities)
  }, [])

  return (
    <div className="min-h-screen bg-white px-4 pb-24 pt-6">
      <h1 className="text-xl font-semibold text-ink-900">{t('careTitle')}</h1>

      <div className="mt-4 flex gap-2">
        <button className="flex-1 rounded-full bg-pine-600 px-4 py-2 text-sm font-medium text-white">
          {t('careFastest')}
        </button>
        <button className="flex-1 rounded-full border border-pine-100 px-4 py-2 text-sm font-medium text-pine-700">
          {t('careComfort')}
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {facilities.map((f, i) => (
          <div key={i} className="rounded-2xl border border-pine-100 px-4 py-3">
            <p className="text-sm font-medium text-ink-900">{f.name}</p>
            <p className="text-xs text-ink-900/50">
              {f.type} · {f.distanceKm} km
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
