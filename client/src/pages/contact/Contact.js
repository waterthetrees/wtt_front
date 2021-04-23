import React from 'react';
import Footer from '../../components/Footer';
import './Contact.scss';

export default function Contact() {
  return (
    <div className="contact">
      <div className="contact__header">
        <h2>Contact</h2>
      </div>

      <div className="contact__main">
        <div className="contact__p">
          Join us on slack to get involved in coding for the trees and climate change!
          {' '}
          <a
            href="https://join.slack.com/share/zt-ouzg0084-34S7_J9UZlcJSe9~qV7jbQ"
            rel="noreferrer"
            target="_blank"
          >
            proj-waterthetrees
          </a>
        </div>

        <div className="contact__p">
          Email us
          {' '}
          <a
            href="mailto:info@waterthetrees.com"
            rel="noreferrer"
            target="_blank"
          >
            info@waterthetrees.com
          </a>
        </div>

        <div className="contact__p">
          Join our parent organization and work on civic code projects!
          {' '}
          <a
            href="https://www.codeforsanfrancisco.org/"
            rel="noreferrer"
            target="_blank"
          >
            Code for America San Francisco

          </a>
        </div>

        <div className="contact__p">
          Join our parent organization and help plant and water trees!
          {' '}
          <a
            href="https://www.sierraclub.org/san-francisco-bay/tree-planting"
            rel="noreferrer"
            target="_blank"
          >
            Sierra Club Tree Team

          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}
