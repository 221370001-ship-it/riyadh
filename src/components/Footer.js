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
      <div className="rc-footer-container">
        {/* Actual High-Definition Footer Image */}
        <img
          src="/assets/footer.png"
          alt="Riyadh Chamber Footer"
          className="rc-footer-img"
        />

        {/* --- ROW 1: TOP NAVIGATION BAR INVISIBLE LINKS --- */}
        {/* 1. الرئيسية */}
        <a
          href={links.home}
          target="_blank"
          rel="noopener noreferrer"
          className="rc-invisible-link rc-nav-home"
          title="الرئيسية"
          aria-label="الرئيسية"
        />
        {/* 2. التحقق من المعاملات */}
        <a
          href={links.verifyTransactions}
          target="_blank"
          rel="noopener noreferrer"
          className="rc-invisible-link rc-nav-verify"
          title="التحقق من المعاملات"
          aria-label="التحقق من المعاملات"
        />
        {/* 3. الأسئلة الشائعة */}
        <a
          href={links.faq}
          target="_blank"
          rel="noopener noreferrer"
          className="rc-invisible-link rc-nav-faq"
          title="الأسئلة الشائعة"
          aria-label="الأسئلة الشائعة"
        />
        {/* 4. الشكاوى والاقتراحات */}
        <a
          href={links.complaints}
          target="_blank"
          rel="noopener noreferrer"
          className="rc-invisible-link rc-nav-complaints"
          title="الشكاوى والاقتراحات"
          aria-label="الشكاوى والاقتراحات"
        />
        {/* 5. اتصل بنا */}
        <a
          href={links.contactUs}
          target="_blank"
          rel="noopener noreferrer"
          className="rc-invisible-link rc-nav-contact"
          title="اتصل بنا"
          aria-label="اتصل بنا"
        />
        {/* 6. فروع الغرفة */}
        <a
          href={links.branches}
          target="_blank"
          rel="noopener noreferrer"
          className="rc-invisible-link rc-nav-branches"
          title="فروع الغرفة"
          aria-label="فروع الغرفة"
        />
        {/* 7. تسجيل الاهتمامات */}
        <a
          href={links.registerInterests}
          target="_blank"
          rel="noopener noreferrer"
          className="rc-invisible-link rc-nav-interests"
          title="تسجيل الاهتمامات"
          aria-label="تسجيل الاهتمامات"
        />
        {/* 8. اتفاقية مستوى الخدمة */}
        <a
          href={links.sla}
          target="_blank"
          rel="noopener noreferrer"
          className="rc-invisible-link rc-nav-sla"
          title="اتفاقية مستوى الخدمة"
          aria-label="اتفاقية مستوى الخدمة"
        />

        {/* --- ROW 2: MAIN FOOTER CONTENT INVISIBLE LINKS --- */}
        {/* Left: Riyadh Chamber Logo */}
        <a
          href={links.riyadhChamberLogo}
          target="_blank"
          rel="noopener noreferrer"
          className="rc-invisible-link rc-footer-logo"
          title="غرفة الرياض"
          aria-label="غرفة الرياض"
        />

        {/* Center: Phone Number 920004565 */}
        <a
          href={links.phone}
          className="rc-invisible-link rc-footer-phone"
          title="اتصل بالدعم الفني: 920004565"
          aria-label="الهاتف"
        />

        {/* Center: App Store */}
        <a
          href={links.appStore}
          target="_blank"
          rel="noopener noreferrer"
          className="rc-invisible-link rc-footer-appstore"
          title="تنزيل من App Store"
          aria-label="App Store"
        />

        {/* Center: Google Play */}
        <a
          href={links.googlePlay}
          target="_blank"
          rel="noopener noreferrer"
          className="rc-invisible-link rc-footer-googleplay"
          title="احصل عليه من Google Play"
          aria-label="Google Play"
        />

        {/* Right: Social Media Icons (YouTube, LinkedIn, Facebook, Google+, Twitter) */}
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
    </footer>
  );
}

export default Footer;
