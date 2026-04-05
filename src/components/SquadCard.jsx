import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Icons } from './Icons';
import Badge from './Badge';

export default function SquadCard({ squad, index = 0 }) {
  const [isHovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const { showJoinConfirm, user } = useStore();
  const hasJoined = user.joinedSquads.includes(squad.id);

  const handleJoin = (e) => {
    e.stopPropagation();
    if (!hasJoined) showJoinConfirm(squad.id);
  };

  return (
    <div
      className="squad-card slide-up"
      style={{ animationDelay: `${index * 0.06}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/squad/${squad.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/squad/${squad.id}`)}
    >
      <div className="squad-header">
        <div>
          <h3 className="squad-title">{squad.title}</h3>
          <div className="squad-meta">
            <Icons.MapPin /> {squad.location}
          </div>
        </div>
        <div
          className="trust-tick"
          style={{
            opacity: isHovered ? 1 : 0.7,
            boxShadow: isHovered ? '0 0 12px rgba(0,255,194,0.4)' : 'none',
          }}
        >
          <Icons.Check />
        </div>
      </div>

      <div className="squad-footer">
        <div className="squad-badges">
          <Badge icon={<Icons.Clock />}>{squad.time}</Badge>
          <Badge variant={squad.cost === "Free" ? "success" : "default"}>{squad.cost}</Badge>
        </div>
        <div className="squad-members-row">
          <div className="squad-members">
            {squad.members.slice(0, 4).map((member, i) => (
              <div key={i} className="squad-avatar" style={{ zIndex: 10 - i }}>
                {member.initials || member}
              </div>
            ))}
            {squad.members.length > 4 && (
              <div className="squad-avatar squad-avatar--more">+{squad.members.length - 4}</div>
            )}
          </div>
          <button
            className={`btn-join ${hasJoined ? 'btn-join--joined' : ''}`}
            onClick={handleJoin}
            disabled={hasJoined}
          >
            {hasJoined ? <><Icons.Check width="12" height="12" /> Joined</> : 'Join'}
          </button>
        </div>
      </div>
    </div>
  );
}
