import React from 'react';
import './About.scss';

import Footer from '../../components/Footer';

function About() {
  return (
    <div className="about">
      <div className="about__p">
        <h3>
          Water The Trees is a platform that crowd
          sources tree planting and maintenance. We believe in the power of
          trees to restore natural habitat for animals, insects, and fauna.
          We are interesting in continuous massive tree planting events
          to help sequester carbon
          and stabilize climate change extremes.
        </h3>
      </div>
      <div className="about__p">
        <h4>
          <a
            name="onboarding"
            target="blank"
            href="https://docs.google.com/document/d/1L5Hc8_K_NhVhAejdE05C_Y__CgqeBWFrFYFoNqBSBbQ/edit"
            className="footer__joinus"
          >
            Join Us!
          </a>
        </h4>
        <h5>
          Water the Trees is an open source project
          run by tree planting volunteers at Sierra Club,
          Public Works, and developers at Code for America.
        </h5>
      </div>
      <Footer />
    </div>
  );
}

export default About;
