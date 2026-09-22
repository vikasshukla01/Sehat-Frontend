import { useTranslation } from 'react-i18next'

export default function Community() {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen bg-white px-4 pb-24 pt-6">
      <h1 className="text-xl font-semibold text-ink-900">{t('navCommunity')}</h1>
      <p className="mt-3 text-sm text-ink-900/60">
        Road hazard reports, health camp alerts, and verified community Q&amp;A will live here
        once the community service is connected.
      </p>
    </div>
  )
}
