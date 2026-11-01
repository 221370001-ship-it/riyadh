import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

// Prevent browser extensions (chrome-extension://) from breaking React app
// Intercept errors at the earliest possible point
window.addEventListener('error', (event) => {
  if (
    event.filename?.includes('chrome-extension://') ||
    event.message?.includes('M_ID') ||
    event.error?.stack?.includes('chrome-extension://')
  ) {
    event.stopImmediatePropagation();
    event.preventDefault();
    return false;
  }
}, true); // capture phase — fires before React's own listener

window.addEventListener('unhandledrejection', (event) => {
  if (
    event.reason?.stack?.includes('chrome-extension://') ||
    event.reason?.message?.includes('M_ID')
  ) {
    event.stopImmediatePropagation();
    event.preventDefault();
  }
}, true);

// Also patch console.error to suppress extension noise from overlays
const _origConsoleError = console.error;
console.error = (...args) => {
  const msg = args[0];
  if (
    typeof msg === 'string' &&
    (msg.includes('M_ID') || msg.includes('chrome-extension://'))
  ) {
    return;
  }
  if (msg instanceof Error && msg.stack?.includes('chrome-extension://')) {
    return;
  }
  _origConsoleError.apply(console, args);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
// Do NOT use React.StrictMode — it causes double-invocations that
// trigger browser-extension errors repeatedly in the dev overlay.
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
