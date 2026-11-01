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
          Preserved exactly as approved with desktop image & overlays
         ======================================================== */}
      <div className="rc-header-desktop">
        <div className="rc-header-container">
          <img
            src="/assets/header.png"
            alt="Riyadh Chamber Header"
            className="rc-header-img"
          />

          {/* 1. Left: بوابة أعمالي */}
          <a
            href={links.aamalPortal}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-invisible-link rc-link-aamal"
            title="بوابة أعمالي"
            aria-label="بوابة أعمالي"
          />

          {/* 2. Center: Riyadh Chamber Logo */}
          <a
            href={links.riyadhChamber}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-invisible-link rc-link-center-logo"
            title="غرفة الرياض - Riyadh Chamber"
            aria-label="غرفة الرياض"
          />

          {/* 3. Right: E-Services */}
          <a
            href={links.eServices}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-invisible-link rc-link-eservices"
            title="الخدمات الإلكترونية - E-SERVICES"
            aria-label="الخدمات الإلكترونية"
          />
        </div>
        <div className="rc-header-bottom-bar" />
      </div>

      {/* ========================================================
          2. MOBILE RESPONSIVE HEADER (<= 768px)
          Matches user reference screenshot (media_1793553725704_30ba5095)
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
              src="/assets/mobile-logo-chamber.png"
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
              src="/assets/mobile-logo-eservices.png"
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
