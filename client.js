// Central place for backend calls. Right now the backend doesn't exist yet,
// so every function returns mock data after a short delay. Once the FastAPI
// backend is deployed, set VITE_API_BASE_URL (in Vercel project settings)
// and swap each mock body for a real fetch() call — nothing else in the
// app needs to change.

const BASE_URL = import.meta.env.VITE_API_BASE_URL || null

const mockDelay = (data, ms = 500) =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms))

export async function submitTriage(text, lang) {
  if (BASE_URL) {
    const res = await fetch(`${BASE_URL}/triage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, lang }),
    })
    if (!res.ok) throw new Error('Triage request failed')
    return res.json()
  }
  return mockDelay({
    urgency: 'moderate',
    message:
      'Based on what you described, we suggest visiting a primary health centre within the next day. This is not a diagnosis.',
    suggestedFacility: 'Primary Health Centre, 3.2 km away',
  })
}

export async function generatePassportToken(patientId) {
  if (BASE_URL) {
    const res = await fetch(`${BASE_URL}/passport/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patientId }),
    })
    if (!res.ok) throw new Error('Token request failed')
    return res.json()
  }
  return mockDelay({ token: 'demo-token-' + Math.random().toString(36).slice(2, 10) })
}

export async function findNearbyCare(lat, lng) {
  if (BASE_URL) {
    const res = await fetch(`${BASE_URL}/care/nearby?lat=${lat}&lng=${lng}`)
    if (!res.ok) throw new Error('Nearby care request failed')
    return res.json()
  }
  return mockDelay([
    { name: 'Primary Health Centre', distanceKm: 3.2, type: 'PHC' },
    { name: 'District Hospital', distanceKm: 11.5, type: 'Hospital' },
  ])
}
