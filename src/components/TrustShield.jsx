import { useEffect, useState } from 'react';

export default function TrustShield({ score, size = 120 }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const center = size / 2;
  const strokeWidth = 3;
  const radius = (size - strokeWidth * 2) / 2 - 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  const shieldPath = `M${center} ${center * 0.18} L${center * 1.6} ${center * 0.45} L${center * 1.6} ${center * 0.95} C${center * 1.6} ${center * 1.55} ${center} ${center * 1.85} ${center} ${center * 1.85} C${center} ${center * 1.85} ${center * 0.4} ${center * 1.55} ${center * 0.4} ${center * 0.95} L${center * 0.4} ${center * 0.45} Z`;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 300);
    return () => clearTimeout(timer);
  }, [score]);

  const getColor = (s) => {
    if (s >= 90) return 'var(--accent-mint)';
    if (s >= 70) return 'var(--status-warning)';
    return 'var(--status-danger)';
  };

  const color = getColor(animatedScore);
  const glowIntensity = animatedScore / 100;
  const gaps = Math.max(0, Math.floor((100 - animatedScore) / 15));

  return (
    <div className="trust-shield-container">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="trust-shield-svg">
        <defs>
          <filter id="shield-glow">
            <feGaussianBlur stdDeviation={3 * glowIntensity} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity={0.8 * glowIntensity} />
            <stop offset="100%" stopColor={color} stopOpacity={0.3 * glowIntensity} />
          </linearGradient>
          <clipPath id="shield-clip">
            <path d={shieldPath} />
          </clipPath>
        </defs>

        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--border-subtle)"
          strokeWidth={1}
          opacity={0.3}
        />

        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
          filter="url(#shield-glow)"
          style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.5s ease' }}
        />

        <path
          d={shieldPath}
          fill="url(#shield-grad)"
          stroke={color}
          strokeWidth={1.5}
          opacity={0.6 * glowIntensity}
          filter="url(#shield-glow)"
          style={{ transition: 'opacity 1s ease' }}
        />

        {Array.from({ length: gaps }).map((_, i) => {
          const angle = (i * 72 + 36) * (Math.PI / 180);
          const gx = center + radius * 0.7 * Math.cos(angle);
          const gy = center + radius * 0.7 * Math.sin(angle);
          return (
            <circle
              key={i}
              cx={gx}
              cy={gy}
              r={3}
              fill="var(--bg-deep)"
              stroke="var(--status-danger)"
              strokeWidth={0.5}
              opacity={0.5}
              className="shield-gap"
            />
          );
        })}

        <text
          x={center}
          y={center - 2}
          textAnchor="middle"
          dominantBaseline="central"
          className="shield-score-text"
          fill="var(--text-primary)"
          fontSize={size * 0.18}
          fontWeight="600"
          fontFamily="'Roboto Mono', monospace"
          letterSpacing="-0.02em"
        >
          {animatedScore}
        </text>
        <text
          x={center}
          y={center + size * 0.14}
          textAnchor="middle"
          dominantBaseline="central"
          fill="var(--text-muted)"
          fontSize={size * 0.075}
          fontWeight="500"
          letterSpacing="0.08em"
          style={{ textTransform: 'uppercase' }}
        >
          TRUST
        </text>
      </svg>

      <div
        className="shield-ambient-ring"
        style={{
          boxShadow: `0 0 ${40 * glowIntensity}px ${10 * glowIntensity}px ${color}`,
          opacity: 0.15 * glowIntensity,
        }}
      />
    </div>
  );
}
