import React from 'react';
import './About.scss';

import slackLogo from '../../assets/images/logos/Slack_RGB.svg';
import googleDocsLogo from '../../assets/images/logos/google-docs.svg';

import Footer from '../../components/Footer';

function About() {
  return (
    <div className="about">
      <div>
        <div className="about__text">
          Water The Trees is a platform that crowd
          sources tree planting and maintenance.
        </div>
        <div className="about__text">
          We are an open source project
          run by tree planting volunteers.
        </div>
        <div className="about__text">
          We believe in the power of
          trees to restore natural habitat for animals, insects, and fauna.
        </div>
        <div className="about__text">
          We are interested in continuous massive tree planting events
          to help sequester carbon and stabilize climate change extremes.
        </div>
      </div>
      <div className="about__links">
        <a
          name="onboarding"
          target="blank"
          href="https://docs.google.com/document/d/1L5Hc8_K_NhVhAejdE05C_Y__CgqeBWFrFYFoNqBSBbQ/edit"
        >
          <img alt="google docs" src={googleDocsLogo} className="about__logo" />
        </a>
        <a
          href="https://join.slack.com/share/zt-ouzg0084-34S7_J9UZlcJSe9~qV7jbQ"
          rel="noreferrer"
          target="_blank"
        >
          <img alt="slack" src={slackLogo} className="about__logo" />
        </a>
      </div>
      <div className="about__body">
        <div className="about__volunteers">
          Sierra Club
        </div>
        <div className="about__volunteers">
          Public Works
        </div>
        <div className="about__volunteers">
          Code for America
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
