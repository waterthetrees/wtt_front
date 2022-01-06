import React from 'react';
import './Contacts.scss';

import slackLogo from '@/assets/images/logos/Slack_RGB.svg';
import googleDocsLogo from '@/assets/images/logos/google-docs.svg';

const Contacts = () => (
  <div className="contacts">
    <a
      className="contacts__links"
      name="onboarding"
      target="blank"
      href="https://docs.google.com/document/d/1L5Hc8_K_NhVhAejdE05C_Y__CgqeBWFrFYFoNqBSBbQ/edit"
    >
      Onboarding Steps:
      <img alt="google docs" src={googleDocsLogo} className="contacts__logo" />
    </a>
    <a
      className="contacts__links"
      name="slack"
      target="_blank"
      href="https://join.slack.com/share/zt-ouzg0084-34S7_J9UZlcJSe9~qV7jbQ"
      rel="noreferrer"
    >
      Join us on Slack:
      <img alt="slack" src={slackLogo} className="contacts__logo" />
    </a>
  </div>
);

export default Contacts;
