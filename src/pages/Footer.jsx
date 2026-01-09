import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Send,
  ChevronDown,
  ChevronUp,
  ArrowRight
} from 'lucide-react';
import { Box } from '@mui/material';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [expandedSection, setExpandedSection] = useState(null);

  const handleToggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const navigationLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Pivora Gateway', path: '/gateway' },
    { label: 'Blog', path: '/blog' },
    { label: 'Careers', path: '/careers' },
    { label: 'Contact', path: '/contact' }
  ];

  const legalLinks = [
    { label: 'Privacy Policy', path: '/privacypolicypevora' },
    { label: 'Terms of Service', path: '/termspolicypevora' },
    { label: 'Refund Policy', path: '/refundpolicypevora' },
    { label: 'Cancellation Policy', path: '/cancellationpolicypevora' }
  ];

  const socialLinks = [
    { icon: Linkedin, url: 'https://linkedin.com', label: 'LinkedIn', color: '#0077b5' },
    { icon: Twitter, url: 'https://twitter.com', label: 'Twitter', color: '#1da1f2' },
    { icon: Instagram, url: 'https://instagram.com', label: 'Instagram', color: '#e4405f' },
    { icon: Facebook, url: 'https://facebook.com', label: 'Facebook', color: '#1877f2' },
    { icon: Youtube, url: 'https://youtube.com', label: 'Youtube', color: '#ff0000' }
  ];

  const contactInfo = [
    { icon: Mail, text: 'support@pivoraglobal.com', type: 'email' },
    { icon: Phone, text: '+91-9876543210', type: 'phone' },
    { icon: MapPin, text: 'Mumbai, Maharashtra, India', type: 'address' }
  ];

  const handleSubscribe = () => {
    if (email) {
      console.log('Subscribed:', email);
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      <Box className="footer-background">
        <Box className="glow glow-1"></Box>
        <Box className="glow glow-2"></Box>
      </Box>

      <Box className="footer-container">
        {/* Main Footer Content */}
        <Box className="footer-grid">
          {/* Brand Section */}
          <Box className="footer-section brand-section">
            <Box className="brand-header">
              <Box className="brand-logo">
                <Send size={24} strokeWidth={2.5} />
              </Box>
              <h2 className="brand-title">Pivora Global</h2>
            </Box>

            <p className="brand-description">
              Building secure and intelligent fintech ecosystems with cutting-edge technology and innovation.
            </p>

            {/* Newsletter */}
            <Box className="newsletter">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="newsletter-input"
              />
              <button onClick={handleSubscribe} className="newsletter-button">
                Subscribe
                <Send size={16} />
              </button>
            </Box>
          </Box>

          {/* Quick Links */}
          <Box className="footer-section">
            <Box 
              className="section-header"
              onClick={() => handleToggleSection('quick')}
            >
              <h3>Quick Links</h3>
              <button className="toggle-btn mobile-only">
                {expandedSection === 'quick' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </Box>
            <Box className={`section-content ${expandedSection === 'quick' || window.innerWidth >= 640 ? 'expanded' : ''}`}>
              {navigationLinks.map((link) => (
                <a key={link.path} href={link.path} className="footer-link">
                  <ArrowRight size={14} className="mobile-only" />
                  {link.label}
                </a>
              ))}
            </Box>
          </Box>

          {/* Legal Links */}
          <Box className="footer-section">
            <Box 
              className="section-header"
              onClick={() => handleToggleSection('legal')}
            >
              <h3>Legal</h3>
              <button className="toggle-btn mobile-only">
                {expandedSection === 'legal' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </Box>
            <Box className={`section-content ${expandedSection === 'legal' || window.innerWidth >= 640 ? 'expanded' : ''}`}>
              {legalLinks.map((link) => (
                <a key={link.path} href={link.path} className="footer-link">
                  <ArrowRight size={14} className="mobile-only" />
                  {link.label}
                </a>
              ))}
            </Box>
          </Box>

          {/* Contact Info */}
          <Box className="footer-section">
            <Box 
              className="section-header"
              onClick={() => handleToggleSection('contact')}
            >
              <h3>Contact Us</h3>
              <button className="toggle-btn mobile-only">
                {expandedSection === 'contact' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </Box>
            <Box className={`section-content ${expandedSection === 'contact' || window.innerWidth >= 640 ? 'expanded' : ''}`}>
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Box key={index} className="contact-item">
                    <Box className="contact-icon">
                      <Icon size={16} />
                    </Box>
                    <span>{item.text}</span>
                  </Box>
                );
              })}

              {/* Social Links */}
              <Box className="social-section">
                <h4>Follow Us</h4>
                <Box className="social-links">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="social-link"
                        style={{ '--hover-color': social.color }}
                      >
                        <Icon size={18} />
                      </a>
                    );
                  })}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Boxider */}
        <hr className="footer-Boxider" />

        {/* Bottom Bar */}
        <Box className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} Pevora Global Technology Pvt. Ltd. All Rights Reserved.
          </p>
          <Box className="bottom-links">
            {legalLinks.slice(0, 3).map((link) => (
              <a key={link.path} href={link.path} className="bottom-link">
                {link.label}
              </a>
            ))}
          </Box>
        </Box>
      </Box>

      <style jsx>{`
        .footer {
          background: linear-gradient(180deg, #0a1f2e 0%, #0f2027 50%, #203a43 100%);
          position: relative;
          overflow: hidden;
          color: white;
        }

        .footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #00ffc8, transparent);
        }

        .footer-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
        }

        .glow-1 {
          top: 20%;
          left: -100px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(0,255,200,0.06) 0%, transparent 70%);
        }

        .glow-2 {
          bottom: 30%;
          right: -100px;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(0,168,255,0.06) 0%, transparent 70%);
        }

        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1.5rem;
          position: relative;
          z-index: 1;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          padding: 3rem 0 2rem;
        }

        @media (min-width: 640px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
            padding: 4rem 0 2.5rem;
          }
        }

        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 2rem;
          }
        }

        @media (min-width: 1024px) {
          .footer-grid {
            grid-template-columns: 2fr 1.25fr 1.25fr 1.5fr;
            gap: 3rem;
            padding: 5rem 0 3rem;
          }
        }

        .footer-section {
          display: flex;
          flex-direction: column;
        }

        .brand-section {
          grid-column: 1 / -1;
        }

        @media (min-width: 768px) {
          .brand-section {
            grid-column: 1 / 2;
          }
        }

        @media (min-width: 1024px) {
          .brand-section {
            grid-column: 1 / 2;
          }
        }

        .brand-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          cursor: pointer;
        }

        .brand-logo {
          width: 42px;
          height: 42px;
          background: linear-gradient(135deg, #00ffc8 0%, #00a8ff 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(0,255,200,0.25);
          color: #0a1f2e;
        }

        .brand-title {
          font-size: 1.3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #00ffc8 0%, #ffffff 50%, #00a8ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }

        @media (min-width: 768px) {
          .brand-title {
            font-size: 1.4rem;
          }
        }

        .brand-description {
          color: rgba(255,255,255,0.7);
          line-height: 1.7;
          margin-bottom: 1.5rem;
          font-size: 0.875rem;
        }

        @media (min-width: 768px) {
          .brand-description {
            font-size: 0.95rem;
            margin-bottom: 2rem;
          }
        }

        .newsletter {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(0,255,200,0.2);
          border-radius: 10px;
          padding: 0.5rem;
          backdrop-filter: blur(10px);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          max-width: 100%;
        }

        @media (min-width: 640px) {
          .newsletter {
            flex-direction: row;
            max-width: 480px;
          }
        }

        @media (min-width: 1024px) {
          .newsletter {
            max-width: 420px;
          }
        }

        .newsletter-input {
          flex: 1;
          background: transparent;
          border: none;
          color: white;
          font-size: 0.875rem;
          padding: 0.75rem 1.25rem;
          outline: none;
        }

        .newsletter-input::placeholder {
          color: rgba(255,255,255,0.5);
        }

        .newsletter-button {
          background: linear-gradient(135deg, #00ffc8 0%, #00a8ff 100%);
          color: #0a1f2e;
          border: none;
          border-radius: 8px;
          padding: 0.75rem 1.5rem;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          white-space: nowrap;
          transition: all 0.3s ease;
        }

        .newsletter-button:hover {
          background: linear-gradient(135deg, #00e6b8 0%, #0096e6 100%);
          transform: scale(1.02);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          cursor: pointer;
        }

        @media (min-width: 640px) {
          .section-header {
            cursor: default;
            margin-bottom: 2rem;
          }
        }

        .section-header h3 {
          color: #00ffc8;
          font-size: 0.95rem;
          font-weight: 700;
          margin: 0;
          position: relative;
          padding-bottom: 0.75rem;
        }

        @media (min-width: 768px) {
          .section-header h3 {
            font-size: 1.05rem;
          }
        }

        .section-header h3::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 3px;
          background: linear-gradient(90deg, #00ffc8, #00a8ff);
          border-radius: 2px;
        }

        .toggle-btn {
          background: none;
          border: none;
          color: #00ffc8;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
        }

        .mobile-only {
          display: block;
        }

        @media (min-width: 640px) {
          .mobile-only {
            display: none;
          }
          
          .toggle-btn {
            display: none;
          }
        }

        .section-content {
          display: none;
          flex-direction: column;
          gap: 1rem;
        }

        .section-content.expanded {
          display: flex;
        }

        @media (min-width: 640px) {
          .section-content {
            display: flex;
          }
        }

        .footer-link {
          color: rgba(255,255,255,0.65);
          font-size: 0.875rem;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.2s ease;
        }

        .footer-link:hover {
          color: #00ffc8;
          padding-left: 0.5rem;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem;
          background: rgba(0,255,200,0.04);
          border: 1px solid rgba(0,255,200,0.1);
          border-radius: 8px;
          transition: all 0.2s ease;
          margin-bottom: 0.75rem;
        }

        .contact-item:hover {
          background: rgba(0,255,200,0.08);
          border-color: rgba(0,255,200,0.25);
        }

        .contact-icon {
          color: #00ffc8;
          opacity: 0.9;
          flex-shrink: 0;
          margin-top: 0.2rem;
        }

        .contact-item span {
          color: rgba(255,255,255,0.7);
          font-size: 0.85rem;
          line-height: 1.6;
          word-break: break-word;
        }

        .social-section {
          margin-top: 1.5rem;
        }

        .social-section h4 {
          color: rgba(255,255,255,0.75);
          font-size: 0.9rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
        }

        .social-links {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .social-link {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,255,200,0.08);
          border: 1px solid rgba(0,255,200,0.2);
          color: rgba(255,255,255,0.7);
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .social-link:hover {
          background: var(--hover-color);
          color: #ffffff;
          border-color: var(--hover-color);
          transform: translateY(-4px);
          box-shadow: 0 6px 20px rgba(0,255,200,0.3);
        }

        .footer-Boxider {
          border: none;
          border-top: 1px solid rgba(0,255,200,0.15);
          margin: 2rem 0;
        }

        .footer-bottom {
          padding: 2rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        @media (min-width: 640px) {
          .footer-bottom {
            flex-direction: row;
            justify-content: space-between;
          }
        }

        .copyright {
          color: rgba(255,255,255,0.55);
          font-size: 0.75rem;
          margin: 0;
          text-align: center;
        }

        @media (min-width: 640px) {
          .copyright {
            text-align: left;
          }
        }

        @media (min-width: 768px) {
          .copyright {
            font-size: 0.8rem;
          }
        }

        .bottom-links {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          justify-content: center;
        }

        .bottom-link {
          color: rgba(255,255,255,0.55);
          font-size: 0.7rem;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        @media (min-width: 768px) {
          .bottom-link {
            font-size: 0.75rem;
          }
        }

        .bottom-link:hover {
          color: #00ffc8;
        }
      `}</style>
    </footer>
  );
};

export default Footer;



