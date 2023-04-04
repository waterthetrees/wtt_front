import React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';
import { TreeLogo } from '@/components/Icons';

const Footer = () => (
  <div className="footer">
    <div className="footer__follow">
      <div className="footer__section">
        <span>Follow Us</span>
      </div>
    </div>
    <div className="footer__content">
      <div className="footer__section1">
        Directory
        <span>Map</span>
        <span>About Us</span>
        <span>Contact Us</span>
        <span>Donate</span>
      </div>
      <div className="footer__section1">
        Tree Data
        <span>Source</span>
        <span>Data</span>
        <span>Taxonomy</span>
      </div>
      <div className="footer__section2"> Collaborate</div>
    </div>
    <div className="footer__info">
      <Link to="/">
        <TreeLogo />
      </Link>
      <Link to="/privacy">Privacy Policy</Link>
      <Link to="/license">License</Link>
    </div>
  </div>
);

export { Footer };
