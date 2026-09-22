# SEHAT — Frontend

Vernacular-first PWA for the SEHAT healthcare accessibility platform (Smart India Hackathon 2026, PS ID SIH26133).

## What's here
- React + Vite + Tailwind
- Multi-language support via `react-i18next` (`src/i18n/index.js`) — English and Hindi are wired up as a starting pair; add the rest of the 11 languages the same way
- Pages: Home (role picker), Symptom triage, Health passport (QR), Nearby care, Community
- `src/api/client.js` — every backend call lives here. Right now it returns mock data. Once the backend is deployed, set the `VITE_API_BASE_URL` environment variable in your Vercel project and it will call the real API automatically — no other code changes needed.

## Local development (optional)
You don't need this to deploy — Vercel builds it for you. But if you ever want to run it on your own machine:
```
npm install
npm run dev
```

## Deployment
Deployed on Vercel, connected directly to this GitHub repo. Every push to `main` redeploys automatically.
