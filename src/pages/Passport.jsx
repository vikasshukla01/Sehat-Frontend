import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { QrCode, ShieldCheck, Loader2 } from 'lucide-react'
import { generatePassportToken } from '../api/client.js'

export default function Passport() {
  const { t } = useTranslation()
  const [token, setToken] = useState(null)
  const [qrImage, setQrImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    setToken(null)
    setQrImage(null)
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
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-xl font-medium text-ink-900">{t('passportTitle')}</h1>
        <p className="mt-2 max-w-xs text-sm text-ink-500">{t('passportDesc')}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="relative mt-8 flex h-52 w-52 items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-forest-200 bg-white p-4"
      >
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.span
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              exit={{ opacity: 0 }}
              transition={{ rotate: { duration: 1, repeat: Infinity, ease: 'linear' } }}
            >
              <Loader2 size={32} strokeWidth={1.5} className="text-forest-300" aria-hidden="true" />
            </motion.span>
          ) : qrImage ? (
            <motion.img
              key="qr"
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              src={`data:image/png;base64,${qrImage}`}
              alt="Your health passport QR code"
              className="h-full w-full object-contain"
            />
          ) : token ? (
            <motion.span
              key="token"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="break-all px-2 text-xs font-medium text-forest-700"
            >
              {token}
            </motion.span>
          ) : (
            <motion.span
              key="placeholder"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <QrCode size={48} strokeWidth={1.25} className="text-forest-200" aria-hidden="true" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.button
        onClick={handleGenerate}
        disabled={loading}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.03 }}
        className="mt-8 flex items-center gap-2 rounded-full bg-forest-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-forest-800 disabled:opacity-60"
      >
        {loading ? '…' : t('passportGenerate')}
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 flex max-w-xs items-start gap-1.5 text-left text-xs text-ink-500"
      >
        <ShieldCheck size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-forest-400" aria-hidden="true" />
        A secure token only — never your raw medical records, and only shared with your consent.
      </motion.p>
    </div>
  )
}
