import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Starter set of languages. SEHAT's pitch is 11 languages total —
// add the rest here as { code: { translation: {...} } } once you have
// verified translations. The app code never needs to change for this.
const resources = {
  en: {
    translation: {
      appName: 'SEHAT',
      tagline: 'Healthcare access, in your language',
      navHome: 'Home',
      navTriage: 'Check symptoms',
      navPassport: 'Health passport',
      navCare: 'Nearby care',
      navCommunity: 'Community',
      chooseLanguage: 'Choose your language',
      continue: 'Continue',
      whoAreYou: 'Who are you?',
      rolePatient: 'Patient',
      roleDoctor: 'Doctor',
      roleAsha: 'ASHA worker',
      roleCaregiver: 'Caregiver',
      triageTitle: 'Tell us what you feel',
      triagePlaceholder: 'Describe your symptoms...',
      triageSend: 'Send',
      triageDisclaimer: 'This is not a diagnosis. It only helps you decide what to do next.',
      passportTitle: 'Your health passport',
      passportDesc: 'A QR code that shares a secure token with your doctor — never your raw records — and only with your consent.',
      passportGenerate: 'Generate my QR',
      careTitle: 'Find care near you',
      careFastest: 'Fastest route',
      careComfort: 'Comfortable route',
    },
  },
  hi: {
    translation: {
      appName: 'सेहत',
      tagline: 'आपकी भाषा में स्वास्थ्य सेवा',
      navHome: 'होम',
      navTriage: 'लक्षण जांचें',
      navPassport: 'स्वास्थ्य पासपोर्ट',
      navCare: 'नज़दीकी देखभाल',
      navCommunity: 'समुदाय',
      chooseLanguage: 'अपनी भाषा चुनें',
      continue: 'जारी रखें',
      whoAreYou: 'आप कौन हैं?',
      rolePatient: 'मरीज़',
      roleDoctor: 'डॉक्टर',
      roleAsha: 'आशा कार्यकर्ता',
      roleCaregiver: 'देखभालकर्ता',
      triageTitle: 'हमें बताएं आप कैसा महसूस कर रहे हैं',
      triagePlaceholder: 'अपने लक्षण लिखें...',
      triageSend: 'भेजें',
      triageDisclaimer: 'यह निदान नहीं है। यह केवल अगला कदम तय करने में मदद करता है।',
      passportTitle: 'आपका स्वास्थ्य पासपोर्ट',
      passportDesc: 'एक QR कोड जो आपके डॉक्टर के साथ एक सुरक्षित टोकन साझा करता है — आपका पूरा रिकॉर्ड नहीं — और केवल आपकी सहमति से।',
      passportGenerate: 'मेरा QR बनाएं',
      careTitle: 'अपने पास देखभाल खोजें',
      careFastest: 'सबसे तेज़ रास्ता',
      careComfort: 'आरामदायक रास्ता',
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('sehat_lang') || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n
