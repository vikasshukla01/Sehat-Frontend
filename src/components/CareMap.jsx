import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// react-leaflet's default marker icon references image files that Vite
// doesn't bundle correctly out of the box, so every marker silently renders
// as a broken image. Building markers from inline SVG via L.divIcon sidesteps
// that entirely and lets each marker match the app's own color system.
function pinIcon({ fill, stroke, size = 30 }) {
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8z" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>
      <circle cx="12" cy="10" r="3.2" fill="${stroke}"/>
    </svg>`
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  })
}

const patientIcon = pinIcon({ fill: '#D3E3D2', stroke: '#1F6B43', size: 32 })
const facilityIcon = pinIcon({ fill: '#FAE2B8', stroke: '#B96D0C', size: 28 })

// Recenters/refits the map whenever the patient location or facility list
// changes, since react-leaflet doesn't do this automatically after mount.
function FitBounds({ patient, facilities }) {
  const map = useMap()

  useEffect(() => {
    const points = [[patient.lat, patient.lng], ...facilities.map((f) => [f.lat, f.lng])]
    if (points.length === 1) {
      map.setView(points[0], 13)
    } else {
      map.fitBounds(points, { padding: [32, 32], maxZoom: 14 })
    }
  }, [map, patient, facilities])

  return null
}

export default function CareMap({ patient, facilities, activeIndex, onSelect }) {
  const markerRefs = useRef({})

  useEffect(() => {
    if (activeIndex == null) return
    const marker = markerRefs.current[activeIndex]
    marker?.openPopup()
  }, [activeIndex])

  return (
    <div className="h-64 w-full overflow-hidden rounded-2xl border border-forest-100">
      <MapContainer
        center={[patient.lat, patient.lng]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds patient={patient} facilities={facilities} />

        <Marker position={[patient.lat, patient.lng]} icon={patientIcon}>
          <Popup>You are here</Popup>
        </Marker>

        {facilities.map((f, i) => (
          <Marker
            key={i}
            position={[f.lat, f.lng]}
            icon={facilityIcon}
            eventHandlers={{ click: () => onSelect?.(i) }}
            ref={(el) => {
              if (el) markerRefs.current[i] = el
            }}
          >
            <Popup>
              <strong>{f.name}</strong>
              <br />
              {f.type} · {f.distanceKm} km
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
