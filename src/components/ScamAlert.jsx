import { useStore } from '../store/useStore';
import { Icons } from './Icons';

export default function ScamAlert() {
  const { scamAlert, dismissScamAlert } = useStore();

  if (!scamAlert) return null;

  return (
    <div className="scam-overlay" onClick={dismissScamAlert}>
      <div className="scam-content" onClick={(e) => e.stopPropagation()}>
        <div className="scam-shield-pulse">
          <div className="scam-shield-ring" />
          <div className="scam-shield-ring scam-shield-ring--2" />
          <Icons.Shield width="32" height="32" />
        </div>

        <div className="scam-badge">
          <Icons.AlertTriangle width="12" height="12" />
          <span>{scamAlert.type}</span>
        </div>

        <h2 className="scam-title">Yaartri Shield Alert</h2>
        <p className="scam-message">{scamAlert.text}</p>

        {scamAlert.action && (
          <button className="btn-scam-action" onClick={() => { scamAlert.action(); dismissScamAlert(); }}>
            {scamAlert.actionLabel || 'View Safe Route'}
          </button>
        )}

        <button className="btn-ghost" onClick={dismissScamAlert}>
          Dismiss
        </button>
      </div>
    </div>
  );
}
