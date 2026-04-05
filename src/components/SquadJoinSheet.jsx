import { useStore } from '../store/useStore';
import { Icons } from './Icons';

export default function SquadJoinSheet() {
  const { joinConfirm, dismissJoinConfirm, joinSquad, getSquadById, user } = useStore();

  if (!joinConfirm) return null;
  const squad = getSquadById(joinConfirm);
  if (!squad) return null;

  return (
    <div className="overlay-backdrop" onClick={dismissJoinConfirm}>
      <div className="join-sheet slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="join-sheet-header">
          <h3>Join This Squad?</h3>
          <button className="btn-icon btn-icon--sm" onClick={dismissJoinConfirm} aria-label="Close">
            <span>&times;</span>
          </button>
        </div>

        <div className="join-sheet-squad">
          <h4 className="join-squad-title">{squad.title}</h4>
          <div className="join-meta">
            <span><Icons.MapPin width="12" height="12" /> {squad.location}</span>
            <span><Icons.Clock width="12" height="12" /> {squad.time}</span>
          </div>
        </div>

        <div className="join-members-ring">
          {squad.members.map((m, i) => (
            <div
              key={i}
              className="join-member-avatar"
              style={{
                transform: `rotate(${(i * 360) / (squad.members.length + 1)}deg) translateY(-36px)`,
              }}
            >
              <div className="join-avatar-inner" style={{ transform: `rotate(-${(i * 360) / (squad.members.length + 1)}deg)` }}>
                {m.initials}
              </div>
            </div>
          ))}
          <div
            className="join-member-avatar join-member-you"
            style={{
              transform: `rotate(${(squad.members.length * 360) / (squad.members.length + 1)}deg) translateY(-36px)`,
            }}
          >
            <div className="join-avatar-inner join-avatar-you" style={{ transform: `rotate(-${(squad.members.length * 360) / (squad.members.length + 1)}deg)` }}>
              {user.name.slice(0, 2).toUpperCase()}
            </div>
          </div>
        </div>

        <div className="join-commitment">
          <Icons.Shield width="14" height="14" />
          <p>You're committing to arrive at <strong>{squad.time}</strong>. Ghosting affects your Yaar Score.</p>
        </div>

        <button className="btn-handshake" onClick={() => joinSquad(joinConfirm)}>
          <span className="handshake-icon">🤝</span>
          Confirm Handshake
        </button>

        <button className="btn-ghost" onClick={dismissJoinConfirm}>
          Not this time
        </button>
      </div>
    </div>
  );
}
