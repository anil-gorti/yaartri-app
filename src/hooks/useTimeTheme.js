import { useEffect, useState } from 'react';

const THEMES = {
  dawn: {
    hours: [5, 6, 7],
    accent: '#7dd3fc',
    accentDim: 'rgba(125, 211, 252, 0.15)',
    accentSubtle: 'rgba(125, 211, 252, 0.08)',
    glowColor: 'rgba(125, 211, 252, 0.06)',
    bgGradient: 'radial-gradient(ellipse at top, rgba(125,211,252,0.04), transparent 50%)',
    period: 'dawn',
    greeting: 'Good morning',
  },
  morning: {
    hours: [8, 9, 10, 11],
    accent: '#00FFC2',
    accentDim: 'rgba(0, 255, 194, 0.15)',
    accentSubtle: 'rgba(0, 255, 194, 0.08)',
    glowColor: 'rgba(0, 255, 194, 0.06)',
    bgGradient: 'radial-gradient(ellipse at top, rgba(0,255,194,0.04), transparent 50%)',
    period: 'morning',
    greeting: 'Good morning',
  },
  afternoon: {
    hours: [12, 13, 14, 15],
    accent: '#00FFC2',
    accentDim: 'rgba(0, 255, 194, 0.15)',
    accentSubtle: 'rgba(0, 255, 194, 0.08)',
    glowColor: 'rgba(0, 255, 194, 0.06)',
    bgGradient: 'radial-gradient(ellipse at top, rgba(0,255,194,0.03), transparent 50%)',
    period: 'afternoon',
    greeting: 'Good afternoon',
  },
  golden: {
    hours: [16, 17, 18],
    accent: '#fbbf24',
    accentDim: 'rgba(251, 191, 36, 0.15)',
    accentSubtle: 'rgba(251, 191, 36, 0.08)',
    glowColor: 'rgba(251, 191, 36, 0.06)',
    bgGradient: 'radial-gradient(ellipse at top, rgba(251,191,36,0.04), transparent 50%)',
    period: 'golden',
    greeting: 'Good evening',
  },
  evening: {
    hours: [19, 20, 21],
    accent: '#f97316',
    accentDim: 'rgba(249, 115, 22, 0.15)',
    accentSubtle: 'rgba(249, 115, 22, 0.08)',
    glowColor: 'rgba(249, 115, 22, 0.06)',
    bgGradient: 'radial-gradient(ellipse at top, rgba(249,115,22,0.04), transparent 50%)',
    period: 'evening',
    greeting: 'Good evening',
  },
  night: {
    hours: [22, 23, 0, 1, 2, 3, 4],
    accent: '#a78bfa',
    accentDim: 'rgba(167, 139, 250, 0.15)',
    accentSubtle: 'rgba(167, 139, 250, 0.08)',
    glowColor: 'rgba(167, 139, 250, 0.06)',
    bgGradient: 'radial-gradient(ellipse at top, rgba(167,139,250,0.03), transparent 50%)',
    period: 'night',
    greeting: 'Good night',
  },
};

function getThemeForHour(hour) {
  for (const theme of Object.values(THEMES)) {
    if (theme.hours.includes(hour)) return theme;
  }
  return THEMES.morning;
}

export function useTimeTheme() {
  const [theme, setTheme] = useState(() => getThemeForHour(new Date().getHours()));

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--accent-mint', theme.accent);
    root.style.setProperty('--accent-mint-dim', theme.accentDim);
    root.style.setProperty('--accent-mint-subtle', theme.accentSubtle);
    root.style.setProperty('--glow-color', theme.glowColor);
    root.style.setProperty('--bg-ambient', theme.bgGradient);
  }, [theme]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTheme(getThemeForHour(new Date().getHours()));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return theme;
}
