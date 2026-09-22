import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePassportToken } from '../api/client.js'

export default function Passport() {
  const { t } = useTranslation()
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const result = await generatePassportToken('demo-patient')
      setToken(result.token)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-white px-6 pb-24 pt-8 text-center">
      <h1 className="text-xl font-semibold text-ink-900">{t('passportTitle')}</h1>
      <p className="mt-2 max-w-xs text-sm text-ink-900/60">{t('passportDesc')}</p>

      <div className="mt-8 flex h-48 w-48 items-center justify-center rounded-2xl border-2 border-dashed border-pine-100 bg-pine-50">
        {token ? (
          <span className="break-all px-3 text-xs font-mono text-pine-700">{token}</span>
        ) : (
          <span className="text-xs text-ink-900/30">QR preview</span>
        )}
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="mt-8 rounded-full bg-pine-600 px-6 py-3 text-sm font-medium text-white hover:bg-pine-700 disabled:opacity-50"
      >
        {loading ? '…' : t('passportGenerate')}
      </button>
    </div>
  )
}
