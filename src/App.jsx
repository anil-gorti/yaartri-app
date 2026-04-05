import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import OnboardingPage from './pages/OnboardingPage';
import HomePage from './pages/HomePage';
import SquadDetailPage from './pages/SquadDetailPage';
import CreateSquadPage from './pages/CreateSquadPage';
import ProfilePage from './pages/ProfilePage';

function Shell({ children }) {
  return (
    <div className="app-shell">
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Shell><OnboardingPage /></Shell>} />
        <Route path="/home" element={<Shell><HomePage /></Shell>} />
        <Route path="/squad/:id" element={<Shell><SquadDetailPage /></Shell>} />
        <Route path="/create" element={<Shell><CreateSquadPage /></Shell>} />
        <Route path="/profile" element={<Shell><ProfilePage /></Shell>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
