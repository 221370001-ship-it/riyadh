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
      <div className="rc-header-container">
        {/* Actual High-Definition Header Image */}
        <img
          src="/assets/header.png"
          alt="Riyadh Chamber Header"
          className="rc-header-img"
        />

        {/* 1. Left: بوابة أعمالي -> https://mybusiness.chamber.sa/Login.aspx */}
        <a
          href={links.aamalPortal}
          target="_blank"
          rel="noopener noreferrer"
          className="rc-invisible-link rc-link-aamal"
          title="بوابة أعمالي"
          aria-label="بوابة أعمالي"
        />

        {/* 2. Center: Riyadh Chamber Logo -> https://chamber.sa/Pages/Default.aspx */}
        <a
          href={links.riyadhChamber}
          target="_blank"
          rel="noopener noreferrer"
          className="rc-invisible-link rc-link-center-logo"
          title="غرفة الرياض - Riyadh Chamber"
          aria-label="غرفة الرياض"
        />

        {/* 3. Right: E-Services -> https://mybusiness.chamber.sa/Login.aspx */}
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
    </header>
  );
}

export default Header;
