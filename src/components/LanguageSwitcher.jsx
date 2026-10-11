import { useTranslation } from 'react-i18next'
import { Languages } from 'lucide-react'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'mr', label: 'मराठी' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'gu', label: 'ગુજરાતી' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'മലയാളം' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ' },
  { code: 'or', label: 'ଓଡ଼ିଆ' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const handleChange = (e) => {
    const code = e.target.value
    i18n.changeLanguage(code)
    localStorage.setItem('sehat_lang', code)
    document.documentElement.lang = code
  }

  return (
    <div className="relative flex items-center gap-1.5 rounded-full border border-forest-100 bg-white px-3 py-1.5 text-sm text-forest-700 transition hover:border-forest-400">
      <Languages size={15} strokeWidth={2} aria-hidden="true" />
      <select
        value={i18n.language}
        onChange={handleChange}
        className="appearance-none bg-transparent pr-1 font-medium focus:outline-none"
        aria-label="Choose language"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </div>
  )
}
