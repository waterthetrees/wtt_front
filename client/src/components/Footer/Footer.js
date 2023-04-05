import React from 'react';
import './Footer.scss';
import { Link } from 'react-router-dom';
import { TreeLogo } from '@/components/Icons';
import { LinkedIn } from '@mui/icons-material';
import {
  LinkedinLogo,
  SlackLogo,
  GithubLogo,
  FigmaLogo,
} from '@/components/Icons';

const Footer = () => (
  <div className="footer">
    <div className="footer__follow">
      <div className="footer__section">
        <span className="footer__text2">Follow Us</span>
        <LinkedinLogo sx={{ width: '24px', marginLeft: '32px' }}></LinkedinLogo>
        <SlackLogo sx={{ width: '24px', marginLeft: '24px' }}></SlackLogo>
        <GithubLogo sx={{ width: '24px', marginLeft: '24px' }}></GithubLogo>
        {/* <LinkedIn sx={{ fontSize: '24px' }}></LinkedIn> */}
      </div>
    </div>
    <div className="footer__content">
      <div className="footer__section1">
        <span className="footer__text3">Directory</span>
        <span className="footer__text1">Map</span>
        <span className="footer__text1">About Us</span>
        <span className="footer__text1">Contact Us</span>
        <span className="footer__text1">Donate</span>
      </div>
      <div className="footer__section1">
        <span className="footer__text3">Tree Data</span>
        <span className="footer__text1">Source</span>
        <span className="footer__text1">Data</span>
        <span className="footer__text1">Taxonomy</span>
      </div>
      <div className="footer__section2">
        <span className="footer__text3">Collaborate</span>
        <span className="footer__text1">
          Water the Trees is always looking to collaboirate with environmental
          organizations and cities to provide the most accurate tree data. We
          welcome any conversations on features you'd like to see implemented or
          improvements on our features, If you have any questions or want to
          reach out, contact us at info@waterthetrees.com or join our slack
          channel.
        </span>
      </div>
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
