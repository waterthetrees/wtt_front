import React from 'react';
import { Affiliates } from '@/components/Contact/Index';
import { Footer } from '@/components/Footer/Footer';
import tree from '../../assets/images/abouttree.jpg';
import { GreenButton } from '@/components/Button/Green';

import './About.scss';

const About = () => {
  return (
    <div className="about">
      <div className="about__main">
        <div className="about__main__section">
          <div className="about__main__section__sub">
            <h1>
              We are connecting our forest{' '}
              <span className="about__main__section__green">
                to our digital world
              </span>
            </h1>
          </div>
          <div
            style={{ display: 'flex', justifyContent: 'flex-end' }}
            className="about__main__section__sub"
          >
            <p>
              Welcome to Water the Trees, a platform that crowd sources tree
              planting and maintenance. We are an open source project run by
              tree planting volunteers.
            </p>
          </div>
        </div>
        <div className="about__main__section__image">
          <img src={tree} alt="tree" />
        </div>
        <div className="about__main__section">
          <div className="about__main__section__sub">
            <h1>
              Together we can{' '}
              <span className="about__main__section__green">
                map out the world
              </span>
            </h1>
          </div>
          <div className="about__main__section__sub">
            <h2>Vision</h2>
            <p>
              Crowdsource the planting and maintenance of our world's tree to
              quickly mitigate climate change.
            </p>
            <h2>Mission</h2>
            <p>
              Trees provide the very necessities of life itself. They provide
              oxygen for us to breath, clean our air, protect our drinking
              water, create healthy communities, mitigate global warming, and
              can help stablilize the occuring drastic climate change,
              WaterTheTrees is dedicated to crowdsourcing the planting and
              maintenance of our world's trees.
            </p>
            <h2>Strategies & Goals</h2>
            <p>Keep a record of tree health and maintenance.</p>
            <p>
              Enable people to adopt and follow neightborhood and favorite
              trees.
            </p>
            <p>Notify people when trees need watering.</p>
            <p>Allow cities and tree organizations to make and track trees.</p>
          </div>
        </div>
        <div className="about__main__section">
          <div className="about__main__section__numsection">
            <div className="about__main__section__numsection__relative">
              <div className="about__main__section__numsection__absolute">
                <span>1</span>
              </div>
            </div>
            <h2>Plant More Trees</h2>
            <p>
              Our goal, we want everyone to plant more trees to provide
              ourselves a better future to control climate change.
            </p>
          </div>
          <div className="about__main__section__numsection">
            <div className="about__main__section__numsection__relative">
              <div className="about__main__section__numsection__absolute">
                <span>2</span>
              </div>
            </div>
            <h2>Keep More Trees Alive</h2>
            <p>
              As the climate continues to heat up trees suffer. We want to
              maintain as many trees as possible worldwide.
            </p>
          </div>
          <div className="about__main__section__numsection">
            <div className="about__main__section__numsection__relative">
              <div className="about__main__section__numsection__absolute">
                <span>3</span>
              </div>
            </div>
            <h2>Involve the general public</h2>
            <p style={{ marginBottom: '0px' }}>
              To grow our tree population, we want everyone to contribute to
              local tree planting and be aware of tree health.
            </p>
          </div>
        </div>
        <div className="about__main__section">
          <div className="about__main__section__sub">
            <h1>
              <span className="about__main__section__green">
                Join Our Team!
              </span>
            </h1>
          </div>
          <div className="about__main__section__sub">
            <h2>Everyone is Welcomed!</h2>
            <p>
              We are always looking for team members to contribute to the
              project. Currently we are looking for Backend Developers, Frontend
              Developers, UX/UI Designers, Researchers, Admin, Marketing.
            </p>
            <h2>Get started by:</h2>
            <p>
              1. Read our{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.google.com/document/d/1L5Hc8_K_NhVhAejdE05C_Y__CgqeBWFrFYFoNqBSBbQ/edit"
              >
                Onboarding Steps
              </a>
              .<br></br>
              2. Join us on{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://sfbrigade.slack.com/archives/C010EGACUTU"
              >
                Slack
              </a>
              , and say Hi!
            </p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://sfbrigade.slack.com/archives/C010EGACUTU"
            >
              <GreenButton styles={{ padding: '4px 12px' }}>
                <strong>Join our Slack</strong>
              </GreenButton>
            </a>
          </div>
        </div>
        <div className="about__main__section">
          <div className="about__main__section__affiliate">
            <p>A few organizations we'd like to thank for their support.</p>
            <div className="about__main__section__affiliate__container">
              <Affiliates />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
