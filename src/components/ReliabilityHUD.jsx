export default function ReliabilityHUD({ score }) {
  const getColor = (s) => {
    if (s >= 90) return 'var(--accent-mint)';
    if (s >= 70) return 'var(--status-warning)';
    return 'var(--status-danger)';
  };

  return (
    <div className="ri-hud fade-in">
      <div className="ri-label-row">
        <span className="ri-label">Reliability Index</span>
        <span className="ri-value technical-font">{score}%</span>
      </div>
      <div className="ri-track">
        <div className="ri-fill" style={{ width: `${score}%`, backgroundColor: getColor(score) }} />
      </div>
    </div>
  );
}
