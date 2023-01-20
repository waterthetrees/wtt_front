import React from 'react';
import { Footer } from '@/components/Footer/Footer';
import { C4SF } from '@/components/Contacts';
import { SlackLogo, GithubLogo, FigmaLogo } from '@/components/Icons';
import tree from '../../assets/images/addtree/tree.png';
import { GreenButton } from '@/components/Button/Green';

import './Contact.scss';

export default function Contact() {
  return (
    <div className="contact">
      <div className="contact__main">
        <div className="contact__main__image">
          <img className="contact__main__image__img" src={tree} alt="tree" />
          <div className="contact__main__image__absolute">
            <div className="contact__main__image__relative">
              <h1>Get in Touch with us!</h1>
              <h2>We meet every week on wednesday at 6:30 PM PST.</h2>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://sfbrigade.slack.com/archives/C010EGACUTU"
              >
                <GreenButton
                  styles={{ padding: '4px 12px', fontWeight: 'bold' }}
                >
                  Join our Slack
                </GreenButton>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
