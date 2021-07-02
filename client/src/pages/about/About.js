import React from 'react';
import './About.scss';

import Contacts from '../../components/Contacts/Contacts';
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
        <div className="about__text">
          Interested in joining our dev team? Reach out below:
        </div>
      </div>
      <Contacts />
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
