import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.scss';
import { Link } from 'react-router-dom';
import { TreeLogo } from '@/components/Icons';
import { Launch } from '@mui/icons-material';
import {
  LinkedinLogo,
  SlackLogo,
  GithubLogo,
  FigmaLogo,
} from '@/components/Icons';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="footer">
      <div className="footer__content">
        <div className="footer__follow">
          <div className="footer__section">
            <span className="footer__text2">Follow Us</span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/groups/14161126/"
            >
              <LinkedinLogo
                sx={{ width: '24px', marginLeft: '32px' }}
              ></LinkedinLogo>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://sfbrigade.slack.com/archives/C010EGACUTU"
            >
              <SlackLogo sx={{ width: '24px', marginLeft: '24px' }}></SlackLogo>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/waterthetrees/waterthetrees"
            >
              <GithubLogo
                sx={{ width: '24px', marginLeft: '24px' }}
              ></GithubLogo>
            </a>
          </div>
        </div>
        <div className="footer__wiki">
          <div className="footer__section1">
            <span className="footer__text3">Directory</span>
            <span
              className="footer__text1 footer__hover"
              onClick={() => navigate('/map')}
            >
              Map <Launch></Launch>
            </span>
            <span
              className="footer__text1 footer__hover"
              onClick={() => navigate('/about')}
            >
              About Us <Launch></Launch>
            </span>
            <span
              className="footer__text1 footer__hover"
              onClick={() => navigate('/contact')}
            >
              Contact Us <Launch></Launch>
            </span>
            <span className="footer__text1 footer__hover">
              Donate <Launch></Launch>
            </span>
          </div>
          <div className="footer__section1">
            <span className="footer__text3">Tree Data</span>
            <span
              className="footer__text1 footer__hover"
              onClick={() => navigate('/source')}
            >
              Source <Launch></Launch>
            </span>
            <span
              className="footer__text1 footer__hover"
              onClick={() => navigate('/data')}
            >
              Data <Launch></Launch>
            </span>
            <span className="footer__text1 footer__hover">
              Taxonomy <Launch></Launch>
            </span>
          </div>
          <div className="footer__section2">
            <span className="footer__text3">Collaborate</span>
            <span className="footer__text1">
              Water the Trees is always looking to collaboirate with
              environmental organizations and cities to provide the most
              accurate tree data. We welcome any conversations on features you'd
              like to see implemented or improvements on our features, If you
              have any questions or want to reach out, contact us at&nbsp;
              <span className="footer__green">info@waterthetrees.com</span> or
              join our{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://sfbrigade.slack.com/archives/C010EGACUTU"
                className="footer__green"
              >
                slack channel
              </a>
              .
            </span>
          </div>
        </div>
        <div className="footer__info">
          <Link to="/">
            <TreeLogo />
          </Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/license">License</Link>
          <div className="footer__section3">
            <span
              className="footer__text1 footer__hover"
              onClick={() => navigate('/help')}
            >
              Help <Launch></Launch>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Footer };
