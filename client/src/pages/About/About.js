import React from 'react';
import { Link } from 'react-router-dom';
import './About.scss';
import { Footer } from '@/components/Footer/Footer';

import TreeImage from '@/assets/images/addtree/treefattrunk.png';

const About = () => {
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
    <div className="about">
      <div className="about__header">
        <div className="about__header__logo">
          <img
            className="about__header__logo__img"
            src={TreeImage}
            alt="tree"
          ></img>
        </div>
        <h1 className="about__header__text">About Water the Trees</h1>
        <span className="about__header__summary">
          Welcome to Water the Trees, a platform that crowd sources tree
          planting and
        </span>
        <span className="about__header__summary">
          maintenance. We are an open source project run by tree planting
          volunteers.
        </span>
      </div>
      <div className="about__main">
        <div className="about__main__section">
          <h2 className="about__main__section__header">Vision</h2>
          <p>
            We believe in the power of trees to restore natural habitat for
            animals, insect, and
          </p>
          <p>fauna.</p>
        </div>
        <div className="about__main__section">
          <h2 className="about__main__section__header">Mission</h2>
          <p>
            We are interested in continuous massive tree planting events to help
            sequester
          </p>
          <p>carbon footprint and stablize climate change extremes</p>
        </div>
        <div className="about__main__section">
          <h2 className="about__main__section__header">Who we are!</h2>
          <p>
            Water the Trees begun as a tree tracking platform to track the life
            and health of a
          </p>
          <p>tree worldwide.</p>
          <div className="about__main__section__subsection">
            <p>
              Together with data, three enthusiast, and volunteers we are able
              to maintain a
            </p>
            <p>source to see the growth of trees in all communities.</p>
          </div>
        </div>

        <div className="about__main__section">
          <h2 className="about__main__section__header">Join the team!</h2>
          <p>
            We are always looking for team members to contribute to the project.
          </p>
          <div className="about__main__section__subsection">
            <p>
              Currently we are looking for Backend Developers,Frontend
              Developers,
            </p>
            <p>Designers, Researchers, Admin, Marketing and many more!</p>
          </div>
          <div className="about__main__section__subsection2">
            <h3 className="about__main__section__subsection2__header">
              How to get started:
            </h3>
            <p>
              1. Read our{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.google.com/document/d/1L5Hc8_K_NhVhAejdE05C_Y__CgqeBWFrFYFoNqBSBbQ/edit"
              >
                Onboarding Steps
              </a>
            </p>
            <p>
              2. Join us on{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://join.slack.com/share/zt-ouzg0084-34S7_J9UZlcJSe9~qV7jbQ"
              >
                Slack
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="about__footer">
        <div className="about__footer__section">
          <h2>Community</h2>
          <span>
            To save trees in your local community, please visit our{' '}
            <Link to="/community">Community</Link> outreach page to find
            organizations near you.
          </span>
          <div className="about__footer__section__affiliates">
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
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
