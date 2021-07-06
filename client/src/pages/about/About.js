import React from 'react';
import './About.scss';

import Contacts from '../../components/Contacts/Contacts';
import Affiliates from '../../components/Contacts/Affiliates';
import Footer from '../../components/Footer';

function About() {
  const affiliates = [{
    city: 'Alameda',
    links: {
      'Sierra Club San Francisco': 'placeholder',
      'Public Works': 'placeholder',
    },
  }, {
    city: 'Oakland',
    links: {
      'Sierra Club San Francisco': 'test',
      'Public Works': 'test1',
    },
  }, {
    city: 'San Francisco',
    links: {
      'Sierra Club San Francisco': 'https://www.sierraclub.org/san-francisco-bay',
      'Public Works': '',
    },
  }];

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
          To join our dev team, reach out below:
        </div>
      </div>
      <Contacts />
      To water trees in your local community, reach out to the below:
      <Affiliates affiliates={affiliates} />
      <Footer />
    </div>
  );
}

export default About;
