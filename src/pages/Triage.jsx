import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { SendHorizontal, Stethoscope, AlertTriangle } from 'lucide-react'
import { submitTriage } from '../api/client.js'

const URGENCY_STYLES = {
  emergency: 'bg-terracotta-50 text-terracotta-700 border border-terracotta-100',
  urgent: 'bg-marigold-50 text-marigold-700 border border-marigold-100',
  moderate: 'bg-forest-50 text-ink-900 border border-forest-100',
  self_care: 'bg-forest-50 text-ink-900 border border-forest-100',
}

export default function Triage() {
  const { t, i18n } = useTranslation()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSend = async () => {
    if (!input.trim()) return
    const userMsg = { from: 'user', text: input, id: crypto.randomUUID() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)
    try {
      const result = await submitTriage(input, i18n.language)
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          from: 'sehat',
          text: result.message,
          facility: result.suggestedFacility,
          urgency: result.urgency || 'moderate',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-sand-50 px-4 pb-28 pt-6">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h1 className="text-xl font-medium text-ink-900">{t('triageTitle')}</h1>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-500">
          <AlertTriangle size={13} strokeWidth={2} aria-hidden="true" />
          {t('triageDisclaimer')}
        </p>
      </motion.div>

      <div className="mt-4 flex-1 space-y-3 overflow-y-auto">
        {messages.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col items-center justify-center gap-2 py-16 text-center text-ink-500"
          >
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Stethoscope size={28} strokeWidth={1.5} className="text-forest-200" aria-hidden="true" />
            </motion.span>
            <p className="max-w-[26ch] text-sm">{t('triagePlaceholder')}</p>
          </motion.div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <motion.div
              key={m.id}
              layout
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.from === 'user'
                  ? 'ml-auto bg-forest-700 text-white'
                  : URGENCY_STYLES[m.urgency] || URGENCY_STYLES.moderate
              }`}
            >
              <p>{m.text}</p>
              {m.facility && (
                <p className="mt-1.5 text-xs font-medium opacity-80">{m.facility}</p>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex w-fit items-center gap-1 rounded-2xl bg-forest-50 px-4 py-3"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-forest-400"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
              />
            ))}
          </motion.div>
        )}
        <div ref={endRef} />
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={t('triagePlaceholder')}
          className="flex-1 rounded-full border border-forest-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-forest-400"
        />
        <motion.button
          onClick={handleSend}
          whileTap={{ scale: 0.88 }}
          whileHover={{ scale: 1.05 }}
          aria-label={t('triageSend')}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-marigold-600 text-white transition-colors hover:bg-marigold-700"
        >
          <SendHorizontal size={18} strokeWidth={2} aria-hidden="true" />
        </motion.button>
      </div>
    </div>
  )
}
