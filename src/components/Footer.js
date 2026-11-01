import React from 'react';
import './Footer.css';

// Clickable URLs directly extracted from the official Word document specifications
export const FOOTER_LINKS = {
  // Top nav bar links
  home: 'https://mybusiness.chamber.sa/Login.aspx?ReturnUrl=%2findex.aspx',
  verifyTransactions: 'https://mybusiness.chamber.sa/verify/sanadservice.aspx',
  faq: 'https://www.chamber.sa/Home/ContactUs/FAQ/Pages/default.aspx',
  complaints: 'https://www.chamber.sa/Home/ContactUs/ContactUs/Pages/default.aspx',
  contactUs: 'https://www.chamber.sa/Home/ContactUs/ContactUs/Pages/default.aspx',
  branches: 'https://www.chamber.sa/Home/Branches/Pages/index.aspx',
  registerInterests: 'https://www.chamber.sa/Home/ContactUs/Pages/RegisterInterests.aspx',
  sla: 'https://chamber.sa/SLA/Pages/default.aspx',

  // Bottom section
  riyadhChamberLogo: 'https://chamber.sa/Pages/Default.aspx',
  phone: 'tel:920004565',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.gov.sa.newriyadhchamberandroid&hl=en',
  appStore: 'https://apps.apple.com/sa/app/%D8%A8%D9%88%D8%A7%D8%A8%D8%A9-%D8%A3%D8%B9%D9%85%D8%A7%D9%84%D9%8A/id1530349012',

  // Social media icons
  youtube: 'https://www.youtube.com/user/RiyadhChamber?feature=mhee',
  linkedin: 'https://www.linkedin.com/company/riyadhchamber/',
  facebook: 'https://www.facebook.com/RiyadhChamber?ref=hl',
  googlePlus: 'https://workspaceupdates.googleblog.com/2023/04/new-community-features-for-google-chat-and-an-update-currents%20.html',
  twitter: 'https://x.com/RiyadhChamber',
};

function Footer({ links = FOOTER_LINKS }) {
  return (
    <footer className="rc-footer-wrapper">
      {/* ========================================================
          1. DESKTOP FOOTER (> 768px)
          Preserved exactly as approved with desktop image & overlays
         ======================================================== */}
      <div className="rc-footer-desktop">
        <div className="rc-footer-container">
          <img
            src="/assets/footer.png"
            alt="Riyadh Chamber Footer"
            className="rc-footer-img"
          />

          {/* Row 1 Navigation Overlays */}
          <a
            href={links.home}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-invisible-link rc-nav-home"
            title="الرئيسية"
            aria-label="الرئيسية"
          />
          <a
            href={links.verifyTransactions}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-invisible-link rc-nav-verify"
            title="التحقق من المعاملات"
            aria-label="التحقق من المعاملات"
          />
          <a
            href={links.faq}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-invisible-link rc-nav-faq"
            title="الأسئلة الشائعة"
            aria-label="الأسئلة الشائعة"
          />
          <a
            href={links.complaints}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-invisible-link rc-nav-complaints"
            title="الشكاوى والاقتراحات"
            aria-label="الشكاوى والاقتراحات"
          />
          <a
            href={links.contactUs}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-invisible-link rc-nav-contact"
            title="اتصل بنا"
            aria-label="اتصل بنا"
          />
          <a
            href={links.branches}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-invisible-link rc-nav-branches"
            title="فروع الغرفة"
            aria-label="فروع الغرفة"
          />
          <a
            href={links.registerInterests}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-invisible-link rc-nav-interests"
            title="تسجيل الاهتمامات"
            aria-label="تسجيل الاهتمامات"
          />
          <a
            href={links.sla}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-invisible-link rc-nav-sla"
            title="اتفاقية مستوى الخدمة"
            aria-label="اتفاقية مستوى الخدمة"
          />

          {/* Row 2 Main Content Overlays */}
          <a
            href={links.riyadhChamberLogo}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-invisible-link rc-footer-logo"
            title="غرفة الرياض"
            aria-label="غرفة الرياض"
          />
          <a
            href={links.phone}
            className="rc-invisible-link rc-footer-phone"
            title="اتصل بالدعم الفني: 920004565"
            aria-label="الهاتف"
          />
          <a
            href={links.appStore}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-invisible-link rc-footer-appstore"
            title="تنزيل من App Store"
            aria-label="App Store"
          />
          <a
            href={links.googlePlay}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-invisible-link rc-footer-googleplay"
            title="احصل عليه من Google Play"
            aria-label="Google Play"
          />
          <a
            href={links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-invisible-link rc-social-youtube"
            title="YouTube"
            aria-label="YouTube"
          />
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-invisible-link rc-social-linkedin"
            title="LinkedIn"
            aria-label="LinkedIn"
          />
          <a
            href={links.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-invisible-link rc-social-facebook"
            title="Facebook"
            aria-label="Facebook"
          />
          <a
            href={links.googlePlus}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-invisible-link rc-social-googleplus"
            title="Google+"
            aria-label="Google+"
          />
          <a
            href={links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-invisible-link rc-social-twitter"
            title="Twitter / X"
            aria-label="Twitter"
          />
        </div>
      </div>

      {/* ========================================================
          2. MOBILE RESPONSIVE FOOTER (<= 768px)
          Matches user reference screenshot (media_1793553725705_0f1ab849)
         ======================================================== */}
      <div className="rc-footer-mobile">
        {/* Navigation Links in Rows */}
        <nav className="rc-mobile-nav" aria-label="Footer Navigation">
          <div className="rc-mobile-nav-row">
            <a href={links.verifyTransactions} target="_blank" rel="noopener noreferrer">
              Transaction verification
            </a>
            <a href={links.home} target="_blank" rel="noopener noreferrer">
              Home
            </a>
          </div>

          <div className="rc-mobile-nav-row">
            <a href={links.faq} target="_blank" rel="noopener noreferrer">
              Frequently Asked Questions
            </a>
          </div>

          <div className="rc-mobile-nav-row">
            <a href={links.contactUs} target="_blank" rel="noopener noreferrer">
              Contact us
            </a>
            <a href={links.complaints} target="_blank" rel="noopener noreferrer">
              Complaints and suggestions
            </a>
          </div>

          <div className="rc-mobile-nav-row">
            <a href={links.registerInterests} target="_blank" rel="noopener noreferrer">
              Registering interests
            </a>
            <a href={links.branches} target="_blank" rel="noopener noreferrer">
              Chamber branches
            </a>
          </div>

          <div className="rc-mobile-nav-row">
            <a href={links.sla} target="_blank" rel="noopener noreferrer">
              Service Level Agreement
            </a>
          </div>
        </nav>

        {/* 5 Social Media Circle Icons */}
        <div className="rc-mobile-social-row">
          {/* YouTube */}
          <a
            href={links.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-mobile-social-circle"
            title="YouTube"
            aria-label="YouTube"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-mobile-social-circle"
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>

          {/* Facebook */}
          <a
            href={links.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-mobile-social-circle"
            title="Facebook"
            aria-label="Facebook"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.688 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/>
            </svg>
          </a>

          {/* Google+ */}
          <a
            href={links.googlePlus}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-mobile-social-circle"
            title="Google+"
            aria-label="Google+"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M7.635 10.91v2.548h4.385c-.177 1.157-1.34 3.39-4.385 3.39-2.64 0-4.795-2.186-4.795-4.882 0-2.696 2.155-4.882 4.795-4.882 1.503 0 2.508.641 3.084 1.194l2.046-1.972C11.458 4.986 9.727 4.2 7.635 4.2 3.418 4.2 0 7.643 0 11.892c0 4.25 3.418 7.692 7.635 7.692 4.408 0 7.33-3.097 7.33-7.46 0-.5-.054-.882-.12-1.264H7.635zm12.365 0V8.727h-1.636V10.91h-2.182v1.636h2.182v2.182H20V12.545h2.182V10.91H20z"/>
            </svg>
          </a>

          {/* Twitter / Bird icon matching reference */}
          <a
            href={links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-mobile-social-circle"
            title="Twitter"
            aria-label="Twitter"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
          </a>
        </div>

        {/* All Rights Reserved */}
        <p className="rc-mobile-rights">All rights reserved © 2021</p>

        {/* Inquiries and Technical Support */}
        <p className="rc-mobile-support-title">
          For inquiries and technical support
        </p>

        {/* Phone Number: 920004565 */}
        <a href={links.phone} className="rc-mobile-phone-link">
          920004565
        </a>

        {/* Riyadh Chamber Footer Logo */}
        <div className="rc-mobile-footer-logo-wrapper">
          <a
            href={links.riyadhChamberLogo}
            target="_blank"
            rel="noopener noreferrer"
            title="غرفة الرياض - Riyadh Chamber"
          >
            <img
              src="/assets/chamber-logo-tight.png"
              alt="غرفة الرياض - Riyadh Chamber"
              className="rc-mobile-footer-chamber-img"
            />
          </a>
        </div>

        {/* App Badges: App Store & Google Play */}
        <div className="rc-mobile-badges-row">
          <a
            href={links.appStore}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-mobile-badge-link"
            title="تنزيل من App Store"
          >
            <img
              src="/assets/mobile-badge-appstore.png"
              alt="تنزيل من App Store"
              className="rc-mobile-badge-img"
            />
          </a>

          <a
            href={links.googlePlay}
            target="_blank"
            rel="noopener noreferrer"
            className="rc-mobile-badge-link"
            title="احصل عليه من Google Play"
          >
            <img
              src="/assets/mobile-badge-googleplay.png"
              alt="احصل عليه من Google Play"
              className="rc-mobile-badge-img"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
