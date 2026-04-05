import { useStore } from '../store/useStore';

export default function ActivityTicker() {
  const { activityFeed } = useStore();

  if (!activityFeed.length) return null;

  return (
    <div className="ticker-container">
      <div className="ticker-track">
        {activityFeed.concat(activityFeed).map((item, i) => (
          <div key={`${item.id}-${i}`} className="ticker-item">
            <span className="ticker-dot" />
            <span className="ticker-text">{item.text}</span>
            <span className="ticker-time">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
