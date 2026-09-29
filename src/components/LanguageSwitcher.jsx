import { useTranslation } from 'react-i18next'

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const handleChange = (e) => {
    const code = e.target.value
    i18n.changeLanguage(code)
    localStorage.setItem('sehat_lang', code)
  }

  return (
    <select
      value={i18n.language}
      onChange={handleChange}
      className="rounded-full border border-pine-100 bg-white px-3 py-1.5 text-sm text-pine-700 focus:outline-none focus:ring-2 focus:ring-pine-400"
      aria-label="Choose language"
    >
      {LANGUAGES.map((l) => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  )
}
