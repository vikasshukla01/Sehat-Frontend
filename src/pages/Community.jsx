import { useTranslation } from 'react-i18next'
import { Users, Construction, CalendarHeart, MessageCircleQuestion } from 'lucide-react'

const upcoming = [
  { icon: Construction, label: 'Road hazard reports' },
  { icon: CalendarHeart, label: 'Health camp alerts' },
  { icon: MessageCircleQuestion, label: 'Verified Q&A' },
]

export default function Community() {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen bg-sand-50 px-4 pb-28 pt-6">
      <h1 className="text-xl font-medium text-ink-900 animate-fade-up">{t('navCommunity')}</h1>

      <div className="mt-10 flex flex-col items-center text-center animate-fade-up" style={{ animationDelay: '0.1s' }}>
        <Users size={32} strokeWidth={1.5} className="text-forest-200" aria-hidden="true" />
        <p className="mt-3 max-w-xs text-sm text-ink-500">
          Road hazard reports, health camp alerts, and verified community Q&amp;A will live here once the community service is connected.
        </p>
      </div>

      <div className="mt-8 space-y-2.5">
        {upcoming.map((item, i) => {
          const Icon = item.icon
          return (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-2xl border border-dashed border-forest-100 bg-white/60 px-4 py-3 animate-fade-up"
              style={{ animationDelay: `${0.15 + i * 0.06}s` }}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-50 text-forest-600">
                <Icon size={16} strokeWidth={2} aria-hidden="true" />
              </span>
              <span className="text-sm text-ink-700">{item.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
