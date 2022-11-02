import React from 'react';

export const Affiliates = (props) => {
  const affiliates = [
    {
      city: 'Alameda',
      link: 'https://www.alamedaca.gov/Departments/Public-Works-Department/Street-Trees',
      logo: 'https://www.acpwa.org/acpwa-assets/img/pwa-logo-2color-2.png',
    },
    {
      city: 'Oakland',
      link: 'https://www.oaklandca.gov/services/oak311',
      logo: 'https://cao-94612.s3.us-west-2.amazonaws.com/resources/wj_city_pw_logo_black_OL.jpg',
    },
    {
      city: 'San Francisco',
      link: 'https://friendsoftheurbanforest.formtitan.com/f0a646a51519754097160#/',
      logo: 'https://static.wixstatic.com/media/e4f6ab_cc7774e849d1432f88e48f2cbfa3f2af~mv2.png/v1/fill/w_240,h_216,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/FUF%20logo_rgb.png',
    },
    {
      city: 'San Francisco',
      link: 'https://sf311.org/services/tree-maintenance',
      logo: 'https://www.sfpublicworks.org/sites/default/files/pwlogo_0.png',
    },
  ];

  return (
    <>
      {affiliates?.map((affiliate) => (
        <a
          key={affiliate.link}
          href={affiliate.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={affiliate.logo} alt="affiliates" />
        </a>
      ))}
      {props.children}
    </>
  );
};
