import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { verifyAdminCredentials, isAdminAuthenticated } from '../../utils/authSecurity';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './AdminLogin.css';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdminAuthenticated()) {
      navigate('/admin');
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) navigate('/admin');
    });
    return unsub;
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const trimmedUser = username.trim();
      const trimmedPass = password.trim();

      // 1. Secure Cryptographic Hash Validation for authorized credentials
      const isValidAdmin = await verifyAdminCredentials(trimmedUser, trimmedPass);
      if (isValidAdmin) {
        navigate('/admin');
        return;
      }

      // 2. Firebase Authentication Verification (email format)
      const emailToUse = trimmedUser.includes('@')
        ? trimmedUser
        : `${trimmedUser}@riyadhchamber.com`;

      try {
        await signInWithEmailAndPassword(auth, emailToUse, trimmedPass);
        navigate('/admin');
        return;
      } catch (fbErr) {
        // Fall through to display invalid credentials error
      }

      setError('اسم المستخدم أو كلمة المرور غير صحيحة.');
    } catch (err) {
      console.error('Login error:', err);
      setError('حدث خطأ أثناء تسجيل الدخول. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Header />
      <main className="login-main">
        <div className="login-card" dir="rtl">
          <div className="login-card-badge">لوحة الإدارة</div>
          <h2 className="login-title">تسجيل الدخول</h2>
          <p className="login-subtitle">بوابة التحقق — غرفة الرياض</p>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label className="form-label">اسم المستخدم أو البريد الإلكتروني</label>
              <input
                type="text"
                className="form-input"
                placeholder="اسم المستخدم"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                dir="ltr"
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label className="form-label">كلمة المرور</label>
              <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                dir="ltr"
                autoComplete="current-password"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'جاري التحقق...' : 'تسجيل الدخول'}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AdminLogin;
