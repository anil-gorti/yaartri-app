import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Icons } from '../components/Icons';
import Badge from '../components/Badge';
import TrustShield from '../components/TrustShield';
import SquadJoinSheet from '../components/SquadJoinSheet';

export default function SquadDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getSquadById, showJoinConfirm, user } = useStore();
  const squad = getSquadById(id);

  if (!squad) {
    return (
      <div className="page">
        <div className="error-state">
          <Icons.AlertTriangle width="24" height="24" />
          <h3>Squad not found</h3>
          <button className="btn-ghost" onClick={() => navigate('/home')}>Back to Map</button>
        </div>
      </div>
    );
  }

  const hasJoined = user.joinedSquads.includes(squad.id);

  return (
    <div className="page">
      <header className="detail-header fade-in">
        <button className="btn-icon" onClick={() => navigate(-1)} aria-label="Go back">
          <Icons.ArrowLeft />
        </button>
        <span className="detail-header-title">Squad Details</span>
        <div style={{ width: 36 }} />
      </header>

      <main className="main-content main-content--no-nav">
        <div className="detail-hero slide-up">
          <div className="detail-status-row">
            <Badge variant={squad.status === 'Forming' ? 'accent' : 'success'}>{squad.status}</Badge>
            <Badge variant="outline">{squad.activityType?.replace(/_/g, ' ')}</Badge>
          </div>

          <h1 className="detail-title">{squad.title}</h1>

          <div className="detail-meta">
            <div className="detail-meta-item">
              <Icons.MapPin />
              <span>{squad.location}</span>
            </div>
            <div className="detail-meta-item">
              <Icons.Clock />
              <span>{squad.time}</span>
            </div>
            <div className="detail-meta-item">
              <Icons.Zap />
              <span>{squad.cost}</span>
            </div>
          </div>
        </div>

        <div className="detail-section slide-up" style={{ animationDelay: '0.08s' }}>
          <h3 className="detail-section-title">About</h3>
          <p className="detail-description">{squad.description}</p>
        </div>

        <div className="detail-section slide-up" style={{ animationDelay: '0.12s' }}>
          <h3 className="detail-section-title">Verified Yaars ({squad.verifiedCount})</h3>
          <div className="member-list">
            {squad.members.map((member, i) => (
              <div key={i} className="member-row">
                <div className="member-avatar">{member.initials || member}</div>
                <div className="member-info">
                  <span className="member-name">{member.name || 'Yaar'}</span>
                  {member.verified && (
                    <span className="verified-badge">
                      <Icons.Shield width="10" height="10" /> Verified
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-actions slide-up" style={{ animationDelay: '0.16s' }}>
          {hasJoined ? (
            <button className="btn-primary btn-primary--success" disabled>
              <Icons.Check /> Joined
            </button>
          ) : (
            <button className="btn-handshake" onClick={() => showJoinConfirm(squad.id)}>
              <span className="handshake-icon">🤝</span> Commit to This Squad
            </button>
          )}
        </div>
      </main>

      <SquadJoinSheet />
    </div>
  );
}
