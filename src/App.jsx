import { useState, useEffect } from 'react';

const IdentityService = {
  requestAadhaarOTP: async () => new Promise(res => setTimeout(res, 1000)),
  verifyOTP: async () => new Promise(res => setTimeout(res, 1500))
};

const GeoPulse = {
  monitorGroupState: async () => new Promise(res => setTimeout(() => res({ status: "SECURE" }), 2000))
};

const NavigatorHUD = ({ isThinking, statusText }) => (
  <div className="navigator-hud">
    <div className="agent-branding">
      <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '2px' }}>
        Sarthi Agent 
      </span>
      <div className="agent-status">
        {isThinking ? (
          <div className="thinking-ring"></div>
        ) : (
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--accent)', boxShadow: '0 0 8px rgba(27, 208, 154, 0.5)' }}></div>
        )}
        <span style={{ color: isThinking ? 'var(--text-main)' : 'var(--text-main)' }}>
          {statusText || "Protection Active"}
        </span>
      </div>
    </div>
  </div>
);

const AadhaarBridge = ({ onComplete }) => {
  const [step, setStep] = useState('input');
  
  const handleRequest = async () => {
    setStep('verifying_otp');
    await IdentityService.requestAadhaarOTP();
    setStep('otp');
  };

  const handleVerify = async () => {
    setStep('verifying_final');
    await IdentityService.verifyOTP();
    onComplete();
  }

  return (
    <div className="page-transition" style={{ textAlign: 'center', marginTop: '60px' }}>
      <div className="lock-ring">
        <div className="lock-ring-inner">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="var(--primary)"><path d="M12 1L3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
        </div>
      </div>
      <h2>The Asli Gateway</h2>
      
      {step === 'input' && (
        <>
          <p className="subtitle" style={{ padding: '0 10px' }}>
            Zero-knowledge Aadhaar verification. The irreversible key to the Sarthi sanctuary.
          </p>
          <button className="btn-primary" onClick={handleRequest}>Link via Digilocker/OTP</button>
        </>
      )}

      {step === 'verifying_otp' && <div style={{ marginTop: '40px'}}><div className="thinking-ring" style={{ margin: '0 auto', width: '24px', height: '24px'}}></div><p style={{ marginTop: '20px', color: 'var(--text-muted)' }}>Contacting UIDAI Bridge...</p></div>}

      {step === 'otp' && (
        <div className="page-transition">
          <p className="subtitle">Enter the 4-digit OTP sent to your linked mobile number.</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '32px' }}>
            {[1,2,3,4].map(idx => (
              <div key={idx} style={{ width: '50px', height: '60px', backgroundColor: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: 'var(--primary)', fontWeight: 'bold', boxShadow: 'var(--shadow-sm)' }}>
                *
              </div>
            ))}
          </div>
          <button className="btn-primary" onClick={handleVerify}>Verify Identity Hash</button>
        </div>
      )}

      {step === 'verifying_final' && <div style={{ marginTop: '40px'}}><div className="thinking-ring" style={{ margin: '0 auto', width: '24px', height: '24px'}}></div><p style={{marginTop: '20px', color: 'var(--success)', fontWeight:'600'}}>Securing Zero-Knowledge Proof...</p></div>}
    </div>
  );
};

const ConsentGatedRadar = ({ onActivate }) => (
  <div className="page-transition" style={{ textAlign: 'center', marginTop: '60px' }}>
    <div className="radar-container">
      <div className="radar-pulse-1"></div>
      <div className="radar-pulse-2"></div>
      <div className="radar-core">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
      </div>
    </div>
    
    <h2>Welcome to Varanasi</h2>
    <p className="subtitle" style={{ padding: '0 10px' }}>
      Activate Sarthi to unlock verified travel squads. We use your location to establish "High-Trust" boundaries.
    </p>
    <button className="btn-primary" onClick={onActivate} style={{ boxShadow: '0 8px 24px rgba(27, 208, 154, 0.4)', background: 'linear-gradient(135deg, #1bd09a 0%, #10b981 100%)' }}>
      Toggle "Active Sarthi"
    </button>
  </div>
);

const ProactiveProposal = ({ onAction }) => (
  <div className="page-transition">
    <h2 style={{ marginBottom: '8px' }}>Discovery Engine</h2>
    <p className="subtitle">Sunset arriving. High Bucket-List density locally.</p>
    
    <div className="card action-card" style={{ padding: '0' }}>
      
      {/* Visual Header using CSS Gradient */}
      <div style={{ height: '140px', background: 'linear-gradient(45deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)', position: 'relative' }}>
         <div style={{ position: 'absolute', bottom: '16px', left: '20px', background: 'rgba(255,255,255,0.9)', padding: '6px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 'bold' }}>
           Dashashwamedh Ghat
         </div>
      </div>

      <div style={{ padding: '24px' }}>
        <div className="badge saffron">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          Sarthi Squad Match
        </div>
        
        <p style={{ fontSize: '18px', lineHeight: '1.5', fontWeight: 500, margin: '0 0 24px' }}>
          "3 verified Yaars are exploring Dashashwamedh Ghat. A shared Aarti boat is ₹300/head vs ₹1200 solo. Secure spot?"
        </p>
        
        <div className="btn-group">
          <button className="btn-primary" onClick={() => onAction('accept')} style={{ flex: 1.5 }}>
            Join Squad
          </button>
          <button className="btn-secondary" onClick={() => onAction('decline')} style={{ flex: 1 }}>
            Skip
          </button>
        </div>
      </div>
    </div>
  </div>
);

const LogisticsCopilot = ({ onGeofenceSweep, geofenceStatus, onSplitFare }) => (
  <div className="page-transition">
    <h2>Sarthi Logistics</h2>
    <p className="subtitle">Aarti Boat Rendezvous</p>
    
    <div className="card action-card">
       <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
         <div className="badge" style={{ margin: 0, backgroundColor: geofenceStatus === 'sweep_success' ? 'rgba(27,208,154,0.1)' : '#f1f5f9', color: geofenceStatus === 'sweep_success' ? '#1bd09a' : '#64748b' }}>
           {geofenceStatus === 'idle' && 'GeoPulse Idle'}
           {geofenceStatus === 'sweeping' && 'Running Sweep...'}
           {geofenceStatus === 'sweep_success' && 'Zone 100% Secure'}
         </div>
       </div>

       <p style={{ fontSize: '16px', fontWeight: 600, margin: '0 0 8px', color: '#0f172a' }}>
         {geofenceStatus === 'idle' && "Dashboard initialized."}
         {geofenceStatus === 'sweeping' && "Calculating Haversine bounds..."}
         {geofenceStatus === 'sweep_success' && "All squad members remain safely inside the Aarti River View boundary."}
       </p>

       <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
         {geofenceStatus === 'idle' && "Run sweep to verify safe-zone coordinates."}
         {geofenceStatus === 'sweep_success' && "No deviations detected. Scam shield active."}
       </p>

       {geofenceStatus === 'idle' && (
         <button className="btn-primary" style={{ marginTop: '24px', background: 'var(--primary)' }} onClick={onGeofenceSweep}>
           Run Safety Sweep
         </button>
       )}
    </div>

    {geofenceStatus === 'sweep_success' && (
      <div className="card action-card page-transition" style={{ borderLeft: '4px solid var(--saffron)' }}>
        <h4 style={{ color: 'var(--saffron)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Frictionless Checkout</h4>
        <p style={{ fontSize: '18px', fontWeight: 500, margin: '12px 0 24px', color: '#0f172a' }}>
          "The boat ride was ₹1200. Shall I generate a ₹300 UPI intent to the squad?"
        </p>
        <button className="btn-primary" style={{ background: '#0f172a' }} onClick={onSplitFare}>
          Generate Split
        </button>
      </div>
    )}
  </div>
);

export default function App() {
  const [isThinking, setIsThinking] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [authStage, setAuthStage] = useState('locked'); 
  const [currentTab, setCurrentTab] = useState('proposal'); 
  const [geofenceStatus, setGeofenceStatus] = useState('idle'); 

  useEffect(() => {
    if (authStage === 'active' && currentTab === 'proposal') {
      setIsThinking(true);
      setStatusText("Scanning Real-Time Geofence...");
      const timer = setTimeout(() => {
        setIsThinking(false);
        setStatusText("Ready: Sarthi Squad Identified");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [authStage, currentTab]);

  const handleAction = (action) => {
    if (action === 'accept') {
      setIsThinking(true);
      setStatusText("Sending Aadhaar-Verified Handshakes...");
      setTimeout(() => {
        setIsThinking(false);
        setStatusText("Squad Confirmed. Active Geofencing.");
        setCurrentTab('logistics');
      }, 2000);
    }
  };

  const handleGeofenceSweep = async () => {
    setGeofenceStatus('sweeping');
    setIsThinking(true);
    setStatusText("GeoPulse: Verifying Haversine Bounds...");
    await GeoPulse.monitorGroupState();
    setGeofenceStatus('sweep_success');
    setIsThinking(false);
    setStatusText("GeoPulse: Zone Secure.");
  }

  const handleSplitFare = () => {
    setIsThinking(true);
    setStatusText("Smart-Split: Generating UPI IDs...");
    setTimeout(() => { setIsThinking(false); setStatusText("UPI Intents Successfully Sent."); }, 1500);
  }

  const NavIcon = ({ type }) => {
    const icons = {
      radar: <svg viewBox="0 0 24 24" className="nav-icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"/></svg>,
      logistics: <svg viewBox="0 0 24 24" className="nav-icon"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>,
    };
    return icons[type] || null;
  };

  return (
    <div className="app-container">
      {(authStage === 'dormant' || authStage === 'active') && <NavigatorHUD isThinking={isThinking} statusText={statusText} />}
      
      <div className="main-content">
        {authStage === 'locked' && <AadhaarBridge onComplete={() => setAuthStage('dormant')} />}
        
        {authStage === 'dormant' && <ConsentGatedRadar onActivate={() => setAuthStage('active')} />}
        
        {authStage === 'active' && currentTab === 'proposal' && (
          <ProactiveProposal onAction={handleAction} />
        )}
        
        {authStage === 'active' && currentTab === 'logistics' && (
          <LogisticsCopilot geofenceStatus={geofenceStatus} onGeofenceSweep={handleGeofenceSweep} onSplitFare={handleSplitFare} />
        )}
      </div>
      
      {(authStage === 'dormant' || authStage === 'active') && (
        <div className="bottom-nav">
          <button className={`nav-item ${currentTab === 'proposal' ? 'active' : ''}`} onClick={() => {if (authStage === 'active') setCurrentTab('proposal')}}>
            <NavIcon type="radar" />
            <span>Discover</span>
          </button>
          <button className={`nav-item ${currentTab === 'logistics' ? 'active' : ''}`} onClick={() => {if (authStage === 'active') setCurrentTab('logistics')}}>
            <NavIcon type="logistics" />
            <span>GeoPulse</span>
          </button>
        </div>
      )}
    </div>
  )
}
