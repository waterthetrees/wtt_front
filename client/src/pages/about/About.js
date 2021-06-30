import React from 'react';
import './About.scss';

import Footer from '../../components/Footer';

function About() {
  return (
    <div className="about">
      <div className="about__p">
        Water The Trees is a platform that crowd
        sources tree planting and maintenance. We believe in the power of
        trees to restore natural habitat for animals, insects, and fauna.
        We are interested in continuous massive tree planting events
        to help sequester carbon and stabilize climate change extremes.
      </div>
      <div className="about__p">
        <a
          name="onboarding"
          target="blank"
          href="https://docs.google.com/document/d/1L5Hc8_K_NhVhAejdE05C_Y__CgqeBWFrFYFoNqBSBbQ/edit"
          className="footer__joinus"
        >
          Join Us!
        </a>
      </div>
      <div className="about__p">
        We are an open source project
        run by tree planting volunteers.
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
