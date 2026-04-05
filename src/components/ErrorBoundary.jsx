import { Component } from 'react';
import { Icons } from './Icons';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-state">
          <div className="error-icon">
            <Icons.AlertTriangle width="24" height="24" />
          </div>
          <h3>Something went wrong</h3>
          <p className="text-muted">{this.state.error?.message || 'An unexpected error occurred.'}</p>
          <button className="btn-ghost" onClick={() => this.setState({ hasError: false, error: null })}>
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export function ErrorMessage({ message, onDismiss }) {
  if (!message) return null;
  return (
    <div className="error-toast fade-in">
      <Icons.AlertTriangle />
      <span>{message}</span>
      {onDismiss && <button className="error-dismiss" onClick={onDismiss}>&times;</button>}
    </div>
  );
}
