import React from 'react';
import './About.scss';
import { Paper } from '@mui/material';

import { Footer } from '@/components/Footer/Footer';
import Contacts from '@/pages/Contact/Contacts';
import Affiliates from '@/pages/Contact/Affiliates';
import { Typography } from '@mui/material';

const About = () => {
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
    <Paper style={{ height: "100vh" }}>
      <div>
      
        {/* <Typography variant='h2'>
          Water The Trees is a platform that crowd
          sources tree planting and maintenance.
        </Typography> */}
       
        
        <div>
          We are an open source project
          run by tree planting volunteers.
        </div>
        <div>
          We believe in the power of
          trees to restore natural habitat for animals, insects, and fauna.
        </div>
        <div>
          We are interested in continuous massive tree planting events
          to help sequester carbon and stabilize climate change extremes.
        </div>
        <div>
          To join our dev team, reach out below:
        </div>
      
      </div>
      <Contacts />
      To contribute to trees in your local community, reach out through the forms below:
      <Affiliates affiliates={affiliates} />
      <Footer />

</Paper>
  );
};

export default About;
