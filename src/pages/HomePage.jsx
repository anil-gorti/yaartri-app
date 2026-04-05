import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { useStore } from '../store/useStore';
import { useTimeTheme } from '../hooks/useTimeTheme';
import { Icons } from '../components/Icons';
import TrustShield from '../components/TrustShield';
import BottomSheet from '../components/BottomSheet';
import SquadCard from '../components/SquadCard';
import ActivityTicker from '../components/ActivityTicker';
import EmptyState from '../components/EmptyState';
import FAB from '../components/FAB';
import SquadJoinSheet from '../components/SquadJoinSheet';
import ScamAlert from '../components/ScamAlert';
import Badge from '../components/Badge';
import 'leaflet/dist/leaflet.css';

const shieldIcon = new L.DivIcon({
  html: '<div class="map-marker-hub"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00FFC2" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>',
  className: 'yaartri-marker',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const squadIcon = new L.DivIcon({
  html: '<div class="map-marker-squad"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div>',
  className: 'yaartri-marker',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const VARANASI_CENTER = [25.3060, 83.0100];

export default function HomePage() {
  const navigate = useNavigate();
  const theme = useTimeTheme();
  const {
    user, safeHubs, fetchSafeHubs, getContextualSquads, getContextualMessage,
    triggerScamAlert, currentCity
  } = useStore();
  const [mapReady, setMapReady] = useState(false);
  const squads = getContextualSquads();
  const contextMsg = getContextualMessage();

  useEffect(() => {
    fetchSafeHubs();
    setMapReady(true);
  }, []);

  const handleDemoScamAlert = () => {
    triggerScamAlert({
      type: 'Route Deviation',
      text: 'Your driver has deviated 25% from the optimal route to Kashi Vishwanath. This matches a known commission-trap pattern. Yaartri has flagged the correct route.',
      actionLabel: 'View Safe Route',
      action: () => {},
    });
  };

  const peekContent = (
    <div className="peek-content">
      <div className="peek-header">
        <div className="peek-left">
          <TrustShield score={user.ri} size={48} />
          <div className="peek-info">
            <span className="peek-greeting">{theme.greeting}, {user.name}</span>
            <span className="peek-context">{contextMsg}</span>
          </div>
        </div>
        <button className="btn-icon btn-icon--sm" onClick={() => navigate('/profile')} aria-label="Profile">
          <Icons.User width="16" height="16" />
        </button>
      </div>
      <ActivityTicker />
    </div>
  );

  return (
    <div className="home-page">
      {mapReady && (
        <div className="home-map">
          <MapContainer
            center={VARANASI_CENTER}
            zoom={15}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
            attributionControl={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            {safeHubs.map((hub) => (
              <Marker key={hub.id} position={[hub.coordinates.lat, hub.coordinates.lng]} icon={shieldIcon}>
                <Popup><div className="map-popup"><strong>{hub.name}</strong><span>{hub.category.replace(/_/g, ' ')}</span></div></Popup>
              </Marker>
            ))}
            {safeHubs.map((hub) => (
              <Circle
                key={`z-${hub.id}`}
                center={[hub.coordinates.lat, hub.coordinates.lng]}
                radius={hub.radiusMeters}
                pathOptions={{ color: 'var(--accent-mint, #00FFC2)', fillColor: 'var(--accent-mint, #00FFC2)', fillOpacity: 0.04, weight: 1, opacity: 0.2 }}
              />
            ))}
            {squads.map((sq) => sq.coords && (
              <Marker key={sq.id} position={[sq.coords.lat, sq.coords.lng]} icon={squadIcon}>
                <Popup><div className="map-popup"><strong>{sq.title}</strong><span>{sq.members.length} Yaars &middot; {sq.time}</span></div></Popup>
              </Marker>
            ))}
          </MapContainer>

          <div className="map-top-bar fade-in">
            <div className="map-top-left">
              <Icons.Shield width="14" height="14" style={{ color: 'var(--accent-mint)' }} />
              <span className="map-brand">Yaartri</span>
            </div>
            <Badge variant="outline">{currentCity}</Badge>
          </div>

          <button className="map-alert-demo btn-icon" onClick={handleDemoScamAlert} aria-label="Demo scam alert" title="Demo: Trigger Scam Alert">
            <Icons.AlertTriangle width="14" height="14" />
          </button>
        </div>
      )}

      <FAB onClick={() => navigate('/create')} />

      <BottomSheet peekContent={peekContent}>
        <div className="sheet-inner">
          <div className="sheet-section-header">
            <h2>Nearby Squads</h2>
            <span className="sheet-count">{squads.length}</span>
          </div>

          {squads.length === 0 ? (
            <EmptyState city={currentCity} onAction={() => navigate('/create')} />
          ) : (
            <div className="squad-list">
              {squads.map((squad, idx) => (
                <SquadCard key={squad.id} squad={squad} index={idx} />
              ))}
            </div>
          )}
        </div>
      </BottomSheet>

      <SquadJoinSheet />
      <ScamAlert />
    </div>
  );
}
