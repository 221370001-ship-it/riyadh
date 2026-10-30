import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

// Prevent browser extensions (chrome-extension://) from breaking React app
window.addEventListener('error', (event) => {
  if (
    event.filename?.includes('chrome-extension://') ||
    event.message?.includes('M_ID')
  ) {
    event.stopImmediatePropagation();
    event.preventDefault();
  }
});

window.addEventListener('unhandledrejection', (event) => {
  if (
    event.reason?.stack?.includes('chrome-extension://') ||
    event.reason?.message?.includes('M_ID')
  ) {
    event.stopImmediatePropagation();
    event.preventDefault();
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
