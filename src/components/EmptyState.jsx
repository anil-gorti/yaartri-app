import { Icons } from './Icons';

const SCENES = {
  varanasi: {
    gradient: 'linear-gradient(135deg, rgba(251,191,36,0.08) 0%, rgba(249,115,22,0.05) 50%, transparent 100%)',
    emoji: '🕉️',
    title: 'The ghats are waiting',
    subtitle: 'No squads nearby yet. Be the first to propose one and light the way for fellow Yaars.',
  },
  default: {
    gradient: 'linear-gradient(135deg, rgba(0,255,194,0.06) 0%, rgba(167,139,250,0.04) 50%, transparent 100%)',
    emoji: '🧭',
    title: 'Chart new territory',
    subtitle: 'This area has no active squads. Create one and watch the trust network grow.',
  },
};

export default function EmptyState({ city = 'varanasi', onAction }) {
  const scene = SCENES[city.toLowerCase()] || SCENES.default;

  return (
    <div className="empty-state" style={{ background: scene.gradient }}>
      <div className="empty-visual">
        <div className="empty-glow" />
        <span className="empty-emoji">{scene.emoji}</span>
      </div>
      <h3 className="empty-title">{scene.title}</h3>
      <p className="empty-subtitle">{scene.subtitle}</p>
      {onAction && (
        <button className="btn-primary empty-cta" onClick={onAction}>
          <Icons.Plus width="16" height="16" /> Create S.O.P.
        </button>
      )}
    </div>
  );
}
