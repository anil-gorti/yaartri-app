import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Icons } from '../components/Icons';
import LoadingSpinner from '../components/LoadingSpinner';

const NARRATIVE_SCREENS = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Your identity is your armor',
    body: 'Every Yaar is Aadhaar-verified. Your data is hashed and never stored. Zero knowledge, total trust.',
    accent: 'var(--accent-mint)',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Squads, not strangers',
    body: 'Join verified groups for shared experiences. Split costs, share rides, explore together -- all accountability-backed.',
    accent: '#7dd3fc',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'Sarthi watches your back',
    body: 'Our AI agent detects scams in real-time, flags route deviations, and shields you from tourist traps. Always on. Always vigilant.',
    accent: '#fbbf24',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
        <line x1="8" y1="2" x2="8" y2="18" />
        <line x1="16" y1="6" x2="16" y2="22" />
      </svg>
    ),
    title: 'Safe-Hubs across India',
    body: 'Verified cafes, monuments, and transport hubs. Every meetup happens inside the trust perimeter.',
    accent: '#f97316',
  },
];

export default function OnboardingPage() {
  const [screen, setScreen] = useState(0);
  const [phase, setPhase] = useState('narrative');
  const [aadhaar, setAadhaar] = useState('');
  const [otp, setOtp] = useState('');
  const { verifyIdentity, isLoading, error, user, initAgent } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.verified && phase === 'verify') {
      setPhase('success');
      const timer = setTimeout(() => {
        initAgent();
        navigate('/home', { replace: true });
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [user.verified, phase]);

  const handleNext = useCallback(() => {
    if (screen < NARRATIVE_SCREENS.length - 1) {
      setScreen(s => s + 1);
    } else {
      setPhase('verify');
    }
  }, [screen]);

  const handleVerify = async () => {
    if (!aadhaar || !otp) return;
    await verifyIdentity(aadhaar, otp);
  };

  const handleSkip = () => {
    initAgent();
    navigate('/home', { replace: true });
  };

  const current = NARRATIVE_SCREENS[screen];

  return (
    <div className="page-fullscreen onboarding-page">
      <div className="onboard-ambient" />

      {phase === 'narrative' && (
        <div className="narrative-container" key={screen}>
          <div className="narrative-progress">
            {NARRATIVE_SCREENS.map((_, i) => (
              <div key={i} className={`progress-dot ${i === screen ? 'progress-dot--active' : ''} ${i < screen ? 'progress-dot--done' : ''}`} />
            ))}
          </div>

          <div className="narrative-content fade-in" key={`content-${screen}`}>
            <div className="narrative-icon" style={{ color: current.accent, borderColor: current.accent }}>
              {current.icon}
            </div>
            <h1 className="narrative-title">{current.title}</h1>
            <p className="narrative-body">{current.body}</p>
          </div>

          <div className="narrative-actions">
            <button className="btn-primary narrative-next" onClick={handleNext}>
              {screen < NARRATIVE_SCREENS.length - 1 ? 'Continue' : 'Enter the Network'}
            </button>
            {screen < NARRATIVE_SCREENS.length - 1 && (
              <button className="btn-ghost" onClick={() => { setPhase('verify'); }}>
                Skip intro
              </button>
            )}
          </div>
        </div>
      )}

      {phase === 'verify' && (
        <div className="verify-container slide-up">
          <div className="vault-pulse vault-idle">
            <svg className="vault-icon-svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>

          <h2 className="onboard-title">Verify Your Identity</h2>
          <p className="onboard-sub">Aadhaar-Lite verification for the trust network</p>

          <div className="onboard-form">
            <div className="form-group">
              <label className="form-label">Aadhaar Number</label>
              <input
                className="form-input"
                type="text"
                maxLength={12}
                placeholder="XXXX XXXX XXXX"
                value={aadhaar}
                onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ''))}
              />
            </div>
            <div className="form-group">
              <label className="form-label">OTP</label>
              <input
                className="form-input"
                type="text"
                maxLength={4}
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              />
              <span className="form-hint technical-font">Demo: use OTP 1234</span>
            </div>

            {error && <p className="form-error">{error}</p>}

            <button
              className="btn-primary"
              onClick={handleVerify}
              disabled={isLoading || aadhaar.length !== 12 || otp.length !== 4}
            >
              {isLoading ? <LoadingSpinner text="" /> : 'Verify & Enter'}
            </button>
            <button className="btn-ghost" onClick={handleSkip}>Skip for now</button>
          </div>
        </div>
      )}

      {phase === 'success' && (
        <div className="success-container fade-in">
          <div className="vault-pulse vault-success">
            <svg className="vault-icon-svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="onboard-title" style={{ color: 'var(--accent-mint)' }}>Identity Confirmed</h2>
          <p className="onboard-sub technical-font">Entering high-integrity network</p>
        </div>
      )}
    </div>
  );
}
