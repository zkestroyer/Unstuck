import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("UNSTUCK ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    try {
      window.localStorage.removeItem('unstuck_session_v1');
    } catch {}
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          backgroundColor: '#F7F5EF',
          fontFamily: 'system-ui, sans-serif',
          color: '#202820',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '520px',
            background: '#FFFFFF',
            border: '2px solid #245C4B',
            borderRadius: '20px',
            padding: '36px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛡️</div>
            <h2 style={{ fontSize: '24px', color: '#245C4B', marginBottom: '12px' }}>
              You are safe. Nothing is broken.
            </h2>
            <p style={{ fontSize: '16px', color: '#4E5A52', lineHeight: '1.5', marginBottom: '24px' }}>
              This is an isolated sandbox. Tap the button below to restart your practice session with a clean slate.
            </p>
            {this.state.error && (
              <details style={{ textAlign: 'left', marginBottom: '24px', fontSize: '13px', color: '#666', background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Diagnostics Details</summary>
                <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', marginTop: '8px', fontSize: '12px' }}>
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <button
              type="button"
              onClick={this.handleReset}
              style={{
                backgroundColor: '#245C4B',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '9999px',
                padding: '14px 32px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(36, 92, 75, 0.25)'
              }}
            >
              Start Fresh (Go to Home) →
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
