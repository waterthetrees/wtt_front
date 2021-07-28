import React from 'react';
import './About.scss';

import Contacts from '../../components/Contacts/Contacts';
import Affiliates from '../../components/Contacts/Affiliates';
import Footer from '../../components/Footer';

function About() {
  const affiliates = [{
    city: 'Alameda',
    links: {
      'Alameda Public Works': 'https://www.alamedaca.gov/Departments/Public-Works-Department/Street-Trees',
    },
  }, {
    city: 'Oakland',
    links: {
      'Oakland Public Works': 'https://www.oaklandca.gov/services/oak311',
    },
  }, {
    city: 'San Francisco',
    links: {
      'Friends of the Urban Forest': 'https://friendsoftheurbanforest.formtitan.com/f0a646a51519754097160#/',
      'San Francisco Public Works': 'https://sf311.org/services/tree-maintenance',
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
      To contribute to trees in your local community, reach out through the forms below:
      <Affiliates affiliates={affiliates} />
      <Footer />
    </div>
  );
}

export default About;
