import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { isAdminAuthenticated } from './authSecurity';

function ProtectedRoute({ children }) {
  const [authorized, setAuthorized] = useState(undefined);

  useEffect(() => {
    if (isAdminAuthenticated()) {
      setAuthorized(true);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setAuthorized(Boolean(u) || isAdminAuthenticated());
    });
    return unsubscribe;
  }, []);

  if (authorized === undefined) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Cairo', Arial, sans-serif",
        fontSize: '18px',
        color: '#555',
        direction: 'rtl'
      }}>
        جاري التحميل...
      </div>
    );
  }

  if (!authorized) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
