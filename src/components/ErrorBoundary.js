import React from 'react';

/**
 * Global ErrorBoundary to catch and suppress rogue browser extension crashes
 * such as Chrome extensions attempting to access undefined variables (e.g., 'M_ID').
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Check if error is from a 3rd party extension script
    const isExtensionError =
      error?.stack?.includes('chrome-extension://') ||
      error?.message?.includes('M_ID');

    if (isExtensionError) {
      console.warn('Suppressed third-party browser extension error:', error);
      return { hasError: false, error: null };
    }

    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (
      error?.stack?.includes('chrome-extension://') ||
      error?.message?.includes('M_ID')
    ) {
      // Ignored
      return;
    }
    console.error('Application Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
          <h2>حدث خطأ غير متوقع</h2>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#1e2d4d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '12px'
            }}
          >
            إعادة تحميل الصفحة
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

