import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
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
    const userMsg = { from: 'user', text: input }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)
    try {
      const result = await submitTriage(input, i18n.language)
      setMessages((prev) => [
        ...prev,
        {
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
      <div className="animate-fade-up">
        <h1 className="text-xl font-medium text-ink-900">{t('triageTitle')}</h1>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-500">
          <AlertTriangle size={13} strokeWidth={2} aria-hidden="true" />
          {t('triageDisclaimer')}
        </p>
      </div>

      <div className="mt-4 flex-1 space-y-3 overflow-y-auto">
        {messages.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center text-ink-500 animate-fade-in">
            <Stethoscope size={28} strokeWidth={1.5} className="text-forest-200" aria-hidden="true" />
            <p className="max-w-[26ch] text-sm">{t('triagePlaceholder')}</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] animate-pop-in rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              m.from === 'user'
                ? 'ml-auto bg-forest-700 text-white'
                : URGENCY_STYLES[m.urgency] || URGENCY_STYLES.moderate
            }`}
          >
            <p>{m.text}</p>
            {m.facility && (
              <p className="mt-1.5 text-xs font-medium opacity-80">{m.facility}</p>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex w-fit items-center gap-1 rounded-2xl bg-forest-50 px-4 py-3 animate-fade-in">
            <span className="h-1.5 w-1.5 animate-bob rounded-full bg-forest-400" style={{ animationDelay: '0s' }} />
            <span className="h-1.5 w-1.5 animate-bob rounded-full bg-forest-400" style={{ animationDelay: '0.15s' }} />
            <span className="h-1.5 w-1.5 animate-bob rounded-full bg-forest-400" style={{ animationDelay: '0.3s' }} />
          </div>
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
        <button
          onClick={handleSend}
          aria-label={t('triageSend')}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-marigold-600 text-white transition active:scale-90 hover:bg-marigold-700"
        >
          <SendHorizontal size={18} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
