import React from 'react';
import { Footer } from '@/components/Footer/Footer';
import CodeLogo from '@/assets/images/logos/c4sf-logo.jpg';
import SierrClubLogo from '@/assets/images/logos/san-francisco-bay.png';
import Contacts from './Contacts';
import './Contact.scss';

export default function Contact() {
  return (
    <div className="contact">
      <div className="contact__header">
        <h2>Ways to get in touch:</h2>
      </div>

      <div className="contact__main">
        <div className="contact__p">
          <span>
            Join us on slack to get involved in coding for the trees and climate
            change!
          </span>
          <Contacts />
          <span>
            Or, email us at{' '}
            <a
              href="mailto:info@waterthetrees.com"
              rel="noreferrer"
              target="_blank"
            >
              info@waterthetrees.com
            </a>
          </span>
        </div>

        <div className="contact__p">
          <span>
            Additionally, our parent organizations are always looking for
            volunteers!
          </span>
          <span>For developers:</span>
          <a
            href="https://www.codeforsanfrancisco.org/"
            rel="noreferrer"
            target="_blank"
          >
            <img
              alt="Code for America Logo"
              src={CodeLogo}
              className="contact__logo"
            />
            Code for America San Francisco
          </a>
          <span>For tree afficionados and climate enthusiasts:</span>
          <a
            href="https://www.sierraclub.org/san-francisco-bay/tree-planting"
            rel="noreferrer"
            target="_blank"
          >
            <img
              alt="Sierra Club Logo"
              src={SierrClubLogo}
              className="contact__logo"
            />
            Sierra Club Tree Team
          </a>
        </div>
        <Footer />
      </div>
    </div>
  );
}
