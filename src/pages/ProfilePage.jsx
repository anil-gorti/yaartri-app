import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Icons } from '../components/Icons';
import Badge from '../components/Badge';
import TrustShield from '../components/TrustShield';

export default function ProfilePage() {
  const { user } = useStore();
  const navigate = useNavigate();

  const stats = [
    { label: 'Yaar Score', value: user.yaarScore, icon: <Icons.Shield width="16" height="16" /> },
    { label: 'Streak', value: `${user.punctualityStreak}d`, icon: <Icons.Zap width="16" height="16" /> },
    { label: 'Squads', value: user.joinedSquads.length, icon: <Icons.Users width="16" height="16" /> },
  ];

  return (
    <div className="page">
      <header className="detail-header fade-in">
        <button className="btn-icon" onClick={() => navigate(-1)} aria-label="Go back">
          <Icons.ArrowLeft />
        </button>
        <span className="detail-header-title">Profile</span>
        {user.verified && <Badge variant="accent"><Icons.Check width="10" height="10" /> Verified</Badge>}
      </header>

      <main className="main-content main-content--no-nav">
        <div className="profile-card slide-up">
          <TrustShield score={user.ri} size={140} />
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-status text-muted">
            {user.verified ? 'Aadhaar Verified Yaar' : 'Unverified -- Limited Access'}
          </p>
        </div>

        <div className="stats-grid slide-up" style={{ animationDelay: '0.08s' }}>
          {stats.map(({ label, value, icon }) => (
            <div key={label} className="stat-card">
              <div className="stat-icon">{icon}</div>
              <div className="stat-value">{value}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>

        <div className="detail-section slide-up" style={{ animationDelay: '0.12s' }}>
          <h3 className="detail-section-title">Sarthi Principles</h3>
          <div className="principles-list">
            {[
              { text: 'Respect the RSVP', desc: 'Anti-Ghosting Law' },
              { text: 'Default to Transparency', desc: 'Sentiment Sentinel active' },
              { text: 'Leave Nobody Behind', desc: 'Table-Share Principle' },
              { text: 'Protect the Sanctuary', desc: 'Safe-Hub network only' }
            ].map((p, i) => (
              <div key={i} className="principle-item">
                <div className="principle-check"><Icons.Check /></div>
                <div className="principle-content">
                  <span className="principle-text">{p.text}</span>
                  <span className="principle-desc">{p.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
