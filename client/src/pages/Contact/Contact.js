import React from 'react';
import { Footer } from '@/components/Footer/Footer';
import { C4SF } from '@/components/Contacts';
import { TreeLogo, SlackLogo, GithubLogo, FigmaLogo } from '@/components/Icons';

import './Contact.scss';

export default function Contact() {
  return (
    <div className="contact">
      <div className="contact__logo">
        <TreeLogo />
      </div>
      <div className="contact__header">
        <h1>Get in Touch</h1>
        <span>
          We meet every week on Wednesday at 6:30PM Pacific. Join our{' '}
          <a
            href="https://join.slack.com/share/zt-ouzg0084-34S7_J9UZlcJSe9~qV7jbQ"
            rel="noreferrer"
            target="_blank"
          >
            Slack
          </a>
          .
        </span>
      </div>

      <div className="contact__main">
        <div className="contact__main__section">
          <h2>Email us at:</h2>
          <a
            href="mailto:info@waterthetrees.com"
            rel="noreferrer"
            target="_blank"
          >
            info@waterthetrees.com
          </a>
        </div>
        <div className="contact__main__section">
          <h2>Socials</h2>
          <span>Follow us on our various social media accounts!</span>
        </div>
        <div className="contact__main__section2">
          <a
            href="https://join.slack.com/share/zt-ouzg0084-34S7_J9UZlcJSe9~qV7jbQ"
            rel="noreferrer"
            target="_blank"
          >
            <SlackLogo />
          </a>
          <a
            href="https://github.com/waterthetrees/waterthetrees/"
            rel="noreferrer"
            target="_blank"
          >
            <GithubLogo />
          </a>
          <a
            href="https://www.figma.com/file/5C3v1LUNwMPQy9JOgnKEtr/Water-the-Trees"
            rel="noreferrer"
            target="_blank"
          >
            <FigmaLogo />
          </a>
        </div>
        <div className="contact__main__section">
          <h2>Help Locally!</h2>
          <span>
            Please visit our <a href="/community">Community Page</a> to learn
            how you can contribute today!
          </span>
        </div>
        <div className="contact__main__section">
          <h2>Join the Team!</h2>
          <span>
            Additionally our parent organization is always looking for
            volunteers!
          </span>
          <span>
            For developers,{' '}
            <a
              href="https://www.codeforsanfrancisco.org/"
              rel="noreferrer"
              target="_blank"
            >
              Code for San Francisco
            </a>
          </span>
        </div>
        <C4SF />
        <Footer />
      </div>
    </div>
  );
}
