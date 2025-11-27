import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <NavLink to="/" className="logo-link">Pivora Global</NavLink>
          <p className="footer-desc">Building secure and intelligent fintech ecosystems.</p>
        </div>

        <nav className="footer-nav">
          <h4>Quick Links</h4>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/services">Services</NavLink></li>
            <li><NavLink to="/gateway">Pivora Gateway</NavLink></li>
            <li><NavLink to="/blog">Blog</NavLink></li>
            <li><NavLink to="/careers">Careers</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </nav>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>support@pivoraglobal.com</p>
          <p>+91-9876543210</p>
          <div className="socials">
            <a href="#" aria-label="LinkedIn">LinkedIn</a>
            <a href="#" aria-label="Twitter">Twitter</a>
            <a href="#" aria-label="Instagram">Instagram</a>
          </div>
        </div>
      </div>

      <div className="footer-legal">
        <ul>
          <li><NavLink to="/privacy">Privacy Policy</NavLink></li>
          <li><NavLink to="/terms">Terms of Use</NavLink></li>
          <li><NavLink to="/refund">Refund Policy</NavLink></li>
        </ul>
        <small>© 2025 Pivora Global Technology Pvt. Ltd. All Rights Reserved.</small>
      </div>
    </footer>
  )
}

export default Footer