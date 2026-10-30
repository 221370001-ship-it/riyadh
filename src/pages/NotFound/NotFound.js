import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './NotFound.css';

function NotFound() {
  return (
    <div className="notfound-page">
      <Header />
      <main className="notfound-main">
        <div className="notfound-card">
          <h1 className="notfound-code">404</h1>
          <h2 className="notfound-title">الصفحة غير موجودة</h2>
          <p className="notfound-desc">عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.</p>
          <Link to="/" className="notfound-btn">العودة للرئيسية</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default NotFound;
