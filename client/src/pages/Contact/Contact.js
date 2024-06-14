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
        <div className="contact__main__section">
          <div className="contact__main__section__sub">
            <h1>
              <span className="contact__main__green">Contact Information</span>
            </h1>
          </div>
          <div className="contact__main__section__sub">
            <h2>For Inquiries</h2>
            <p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://sfbrigade.slack.com/archives/C010EGACUTU"
              >
                info@waterthetrees.com
              </a>
            </p>
            <h2>Socials</h2>
            <p>Follow us on our various social media accounts!</p>
            <p></p>
            <div className="contact__main__section__sub__social">
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
          </div>
        </div>
        <div className="contact__main__section">
          <div className="contact__main__section__sub">
            <h1>
              Join our{' '}
              <span className="contact__main__green">Parent Organization</span>
            </h1>
          </div>
          <div className="contact__main__section__sub">
            <h2>Join us!</h2>
            <p>
              Additionally, our parent organizations are always looking for
              volunteers! For more information,{' '}
              <a
                href="https://www.codeforsanfrancisco.org/"
                rel="noreferrer"
                target="_blank"
              >
                Code for San Francisco
              </a>
            </p>
            <p></p>
            <div className="contact__main__section__sub__social">
              <C4SF />
            </div>
          </div>
        </div>
        <div className="contact__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}
