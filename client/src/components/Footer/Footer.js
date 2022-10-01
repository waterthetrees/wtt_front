import React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';

const Footer = () => (
  <div className="footer">
    <div className="footer-content">
      <Link to="/privacy" className="footer-link">
        Privacy Policy
      </Link>
      <Link to="/license" className="footer-link">
        License
      </Link>
    </div>
  </div>
);

export { Footer };
