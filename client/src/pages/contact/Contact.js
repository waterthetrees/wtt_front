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
          <a href src="https://join.slack.com/share/zt-ouzg0084-34S7_J9UZlcJSe9~qV7jbQ">proj-waterthetrees</a>
        </div>

        <div className="contact__p">
          Email us
          {' '}
          <a href="mailto:info@waterthetrees.com">info@waterthetrees.com</a>
        </div>

        <div className="contact__p">
          Join our parent organization and work on civic code projects!
          {' '}
          <a href src="https://www.codeforsanfrancisco.org/">Code for America San Francisco</a>
        </div>

        <div className="contact__p">
          Join our parent organization and help plant and water trees!
          {' '}
          <a href src="https://www.sierraclub.org/san-francisco-bay/tree-planting">Sierra Club Tree Team</a>
        </div>

      </div>
      <Footer />
    </div>
  );
}
