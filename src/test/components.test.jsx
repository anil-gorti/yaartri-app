import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Badge from '../components/Badge';
import LoadingSpinner from '../components/LoadingSpinner';
import ReliabilityHUD from '../components/ReliabilityHUD';
import { ErrorMessage } from '../components/ErrorBoundary';
import TrustShield from '../components/TrustShield';
import EmptyState from '../components/EmptyState';
import ActivityTicker from '../components/ActivityTicker';
import FAB from '../components/FAB';

function wrap(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe('Badge', () => {
  it('renders children', () => {
    wrap(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    const { container } = wrap(<Badge variant="accent">Accent</Badge>);
    expect(container.querySelector('.badge--accent')).toBeInTheDocument();
  });
});

describe('LoadingSpinner', () => {
  it('renders with default text', () => {
    wrap(<LoadingSpinner />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders with custom text', () => {
    wrap(<LoadingSpinner text="Scanning..." />);
    expect(screen.getByText('Scanning...')).toBeInTheDocument();
  });
});

describe('ReliabilityHUD', () => {
  it('displays score', () => {
    wrap(<ReliabilityHUD score={95} />);
    expect(screen.getByText('95%')).toBeInTheDocument();
    expect(screen.getByText('Reliability Index')).toBeInTheDocument();
  });
});

describe('ErrorMessage', () => {
  it('renders nothing when no message', () => {
    const { container } = wrap(<ErrorMessage message={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders error message', () => {
    wrap(<ErrorMessage message="Something broke" />);
    expect(screen.getByText('Something broke')).toBeInTheDocument();
  });
});

describe('TrustShield', () => {
  it('renders SVG with TRUST label', () => {
    wrap(<TrustShield score={90} size={120} />);
    expect(screen.getByText('TRUST')).toBeInTheDocument();
  });
});

describe('EmptyState', () => {
  it('renders title and subtitle', () => {
    wrap(<EmptyState city="varanasi" />);
    expect(screen.getByText('The ghats are waiting')).toBeInTheDocument();
  });

  it('renders CTA when onAction provided', () => {
    wrap(<EmptyState city="varanasi" onAction={() => {}} />);
    expect(screen.getByText('Create S.O.P.')).toBeInTheDocument();
  });
});

describe('FAB', () => {
  it('renders with aria label', () => {
    wrap(<FAB onClick={() => {}} />);
    expect(screen.getByRole('button', { name: 'Create Squad' })).toBeInTheDocument();
  });
});
