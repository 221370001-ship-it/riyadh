import React from 'react';
import './Header.css';

// Clickable URLs directly extracted from the official Word document specifications
export const HEADER_LINKS = {
  aamalPortal: 'https://mybusiness.chamber.sa/Login.aspx',
  riyadhChamber: 'https://chamber.sa/Pages/Default.aspx',
  eServices: 'https://mybusiness.chamber.sa/Login.aspx',
};

function Header({ links = HEADER_LINKS }) {
  return (
    <header className="rc-header-wrapper">
      {/* ========================================================
          1. DESKTOP HEADER (> 768px)
          Uses official logos provided by user:
          Left: بوابة أعمالي
          Center: غرفة الرياض / Riyadh Chamber
          Right: الخدمات الإلكترونية / E-SERVICES
         ======================================================== */}
      <div className="rc-header-desktop">
        <div className="rc-header-desktop-content">
          {/* Left: بوابة أعمالي */}
          <a
            href={links.aamalPortal}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-desktop-logo-link"
            title="بوابة أعمالي"
          >
            <img
              src="/assets/aamal-logo-tight.png"
              alt="بوابة أعمالي"
              className="rc-desktop-logo rc-desktop-logo-aamal"
            />
          </a>

          {/* Center: Riyadh Chamber Logo */}
          <a
            href={links.riyadhChamber}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-desktop-logo-link"
            title="غرفة الرياض - Riyadh Chamber"
          >
            <img
              src="/assets/chamber-logo-tight.png"
              alt="غرفة الرياض - Riyadh Chamber"
              className="rc-desktop-logo rc-desktop-logo-chamber"
            />
          </a>

          {/* Right: E-Services */}
          <a
            href={links.eServices}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-desktop-logo-link"
            title="الخدمات الإلكترونية - E-SERVICES"
          >
            <img
              src="/assets/eservices-logo-tight.png"
              alt="الخدمات الإلكترونية - E-SERVICES"
              className="rc-desktop-logo rc-desktop-logo-eservices"
            />
          </a>
        </div>
        <div className="rc-header-bottom-bar" />
      </div>

      {/* ========================================================
          2. MOBILE RESPONSIVE HEADER (<= 768px)
          Matches reference screenshot (media_1793556630049_2440a4e9)
         ======================================================== */}
      <div className="rc-header-mobile">
        <div className="rc-mobile-top-bar">
          {/* Left: Riyadh Chamber Calligraphy & Subtitle */}
          <a
            href={links.riyadhChamber}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-mobile-logo-chamber-link"
            title="غرفة الرياض - Riyadh Chamber"
          >
            <img
              src="/assets/chamber-logo-tight.png"
              alt="غرفة الرياض - Riyadh Chamber"
              className="rc-mobile-logo-chamber"
            />
          </a>

          {/* Right: E-Services Logo & Arabic Text */}
          <a
            href={links.eServices}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-mobile-logo-eservices-link"
            title="الخدمات الإلكترونية - E-SERVICES"
          >
            <img
              src="/assets/eservices-logo-tight.png"
              alt="الخدمات الإلكترونية - E-SERVICES"
              className="rc-mobile-logo-eservices"
            />
          </a>
        </div>

        {/* Yellow Portal Title: My Business Portal */}
        <div className="rc-mobile-portal-bar">
          <a
            href={links.aamalPortal}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-mobile-portal-text"
          >
            My Business Portal
          </a>
        </div>

        {/* Separator Line */}
        <div className="rc-mobile-bottom-bar" />
      </div>
    </header>
  );
}

export default Header;
