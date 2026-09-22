import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { submitTriage } from '../api/client.js'

export default function Triage() {
  const { t, i18n } = useTranslation()
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

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
        { from: 'sehat', text: result.message, facility: result.suggestedFacility },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-white px-4 pb-24 pt-6">
      <h1 className="text-xl font-semibold text-ink-900">{t('triageTitle')}</h1>
      <p className="mt-1 text-xs text-ink-900/50">{t('triageDisclaimer')}</p>

      <div className="mt-4 flex-1 space-y-3 overflow-y-auto">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
              m.from === 'user'
                ? 'ml-auto bg-pine-600 text-white'
                : 'bg-pine-50 text-ink-900'
            }`}
          >
            <p>{m.text}</p>
            {m.facility && (
              <p className="mt-1 text-xs font-medium text-pine-700">{m.facility}</p>
            )}
          </div>
        ))}
        {loading && <p className="text-xs text-ink-900/40">…</p>}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={t('triagePlaceholder')}
          className="flex-1 rounded-full border border-pine-100 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pine-400"
        />
        <button
          onClick={handleSend}
          className="rounded-full bg-clay-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-clay-700"
        >
          {t('triageSend')}
        </button>
      </div>
    </div>
  )
}
