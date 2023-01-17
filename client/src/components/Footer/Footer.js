import React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';
import { TreeLogo } from '@/components/Icons';

const Footer = () => (
  <div className="footer">
    <div className="footer__content">
      <Link to="/">
        <TreeLogo />
      </Link>
      <Link to="/privacy">Privacy Policy</Link>
      <Link to="/license">License</Link>
    </div>
  </div>
);

export { Footer };
