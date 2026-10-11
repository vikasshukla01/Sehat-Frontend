import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { QrCode, ShieldCheck, Loader2 } from 'lucide-react'
import { generatePassportToken } from '../api/client.js'

export default function Passport() {
  const { t } = useTranslation()
  const [token, setToken] = useState(null)
  const [qrImage, setQrImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const result = await generatePassportToken('demo-patient')
      setToken(result.token)
      setQrImage(result.qrImageBase64 || null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-sand-50 px-6 pb-28 pt-8 text-center">
      <div className="animate-fade-up">
        <h1 className="text-xl font-medium text-ink-900">{t('passportTitle')}</h1>
        <p className="mt-2 max-w-xs text-sm text-ink-500">{t('passportDesc')}</p>
      </div>

      <div className="mt-8 flex h-52 w-52 items-center justify-center rounded-3xl border-2 border-dashed border-forest-200 bg-white p-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
        {qrImage ? (
          <img
            src={`data:image/png;base64,${qrImage}`}
            alt="Your health passport QR code"
            className="h-full w-full animate-pop-in object-contain"
          />
        ) : token ? (
          <span className="animate-pop-in break-all px-2 text-xs font-medium text-forest-700">{token}</span>
        ) : (
          <QrCode size={48} strokeWidth={1.25} className="text-forest-200" aria-hidden="true" />
        )}
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="mt-8 flex items-center gap-2 rounded-full bg-forest-700 px-6 py-3 text-sm font-medium text-white transition active:scale-95 hover:bg-forest-800 disabled:opacity-60"
      >
        {loading && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
        {loading ? '…' : t('passportGenerate')}
      </button>

      <p className="mt-6 flex max-w-xs items-start gap-1.5 text-left text-xs text-ink-500">
        <ShieldCheck size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-forest-400" aria-hidden="true" />
        A secure token only — never your raw medical records, and only shared with your consent.
      </p>
    </div>
  )
}
