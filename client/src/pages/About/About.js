import React from 'react';
import styled from '@emotion/styled';
import { Affiliates } from '@/components/Contact/Index';
import { Footer } from '@/components/Footer/Footer';
import tree from '../../assets/images/abouttree.jpg';
import * as Page from '@/components/Section/Page';

import './About.scss';

const About = () => {
  const NumberContainer = styled.div({
    position: 'relative',
    width: '100%',
    bottom: '4rem',
  });

  const NumberContainer2 = styled.div({
    position: 'absolute',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    color: '#3fab4530',
  });

  const Number = styled.h1({
    fontSize: '15.5rem',
  });

  const AffiliatesContainer = styled.div({
    width: '50%',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '32px',
    marginBottom: '24px',
    img: {
      height: '64px',
    },
    '@media(max-width: 768px)': {
      width: '100%',
    },
  });

  return (
    <Page.PageContainer>
      <Page.Main>
        <Page.MainSections>
          <Page.SubSection>
            <Page.SubSectionHeader>
              We are connecting our forest{' '}
              <Page.GreenText>to our digital world</Page.GreenText>
            </Page.SubSectionHeader>
          </Page.SubSection>
          <Page.SubSection>
            <Page.SubSectionHeader2>About Us</Page.SubSectionHeader2>
            <Page.SubSectionText>
              Welcome to Water the Trees, a platform that crowd sources tree
              planting and maintenance. We are an open source project run by
              tree planting volunteers.
            </Page.SubSectionText>
          </Page.SubSection>
        </Page.MainSections>
        <Page.ImageSection>
          <Page.Image src={tree}></Page.Image>
        </Page.ImageSection>
        <Page.MainSections>
          <Page.SubSection>
            <Page.SubSectionHeader>
              Together we can <Page.GreenText>map out the world</Page.GreenText>
            </Page.SubSectionHeader>
          </Page.SubSection>
          <Page.SubSection>
            <Page.SubSectionHeader2>Vision</Page.SubSectionHeader2>
            <Page.SubSectionText>
              Crowdsource the planting and maintenance of our world's tree to
              quickly mitigate climate change.
            </Page.SubSectionText>
            <Page.SubSectionHeader2>Mission</Page.SubSectionHeader2>
            <Page.SubSectionText>
              Trees provide the very necessities of life itself. They provide
              oxygen for us to breath, clean our air, protect our drinking
              water, create healthy communities, mitigate global warming, and
              can help stablilize the occuring drastic climate change,
              WaterTheTrees is dedicated to crowdsourcing the planting and
              maintenance of our world's trees.
            </Page.SubSectionText>
            <Page.SubSectionHeader2>Strategies & Goals</Page.SubSectionHeader2>
            <Page.SubSectionText>
              Keep a record of tree health and maintenance.
            </Page.SubSectionText>
            <Page.SubSectionText>
              Enable people to adopt and follow neightborhood and favorite
              trees.
            </Page.SubSectionText>
            <Page.SubSectionText>
              Notify people when trees need watering.
            </Page.SubSectionText>
            <Page.SubSectionText>
              Allow cities and tree organizations to make and track trees.
            </Page.SubSectionText>
          </Page.SubSection>
        </Page.MainSections>
        <Page.MainSections>
          <Page.NumberSubSection>
            <NumberContainer>
              <NumberContainer2>
                <Number>1</Number>
              </NumberContainer2>
            </NumberContainer>
            <Page.SubSectionHeader2>Plant More Trees</Page.SubSectionHeader2>
            <Page.SubSectionText>
              Our goal, we want everyone to plant more trees to provide
              ourselves a better future to control climate change.
            </Page.SubSectionText>
          </Page.NumberSubSection>
          <Page.NumberSubSection>
            <NumberContainer>
              <NumberContainer2>
                <Number>2</Number>
              </NumberContainer2>
            </NumberContainer>
            <Page.SubSectionHeader2>
              Keep More Trees Alive
            </Page.SubSectionHeader2>
            <Page.SubSectionText>
              As the climate continues to heat up trees suffer. We want to
              maintain as many trees as possible worldwide.
            </Page.SubSectionText>
          </Page.NumberSubSection>
          <Page.NumberSubSection>
            <NumberContainer>
              <NumberContainer2>
                <Number>3</Number>
              </NumberContainer2>
            </NumberContainer>
            <Page.SubSectionHeader2>Plant More Trees</Page.SubSectionHeader2>
            <Page.SubSectionText>
              to grow our tree population we want everyone to contribute to
              local tree planting and be aware of tree health.
            </Page.SubSectionText>
          </Page.NumberSubSection>
        </Page.MainSections>
        <Page.MainSections>
          <Page.SubSection>
            <Page.SubSectionHeader>
              <Page.GreenText>Join Our Team!</Page.GreenText>
            </Page.SubSectionHeader>
          </Page.SubSection>
          <Page.SubSection>
            <Page.SubSectionHeader2>
              Everyone is Welcomed!
            </Page.SubSectionHeader2>
            <Page.SubSectionText>
              We are always looking for team members to contribute to the
              project. Currently we are looking for Backend Developers, Frontend
              Developers, UX/UI Designers, Researchers, Admin, Marketing.
            </Page.SubSectionText>
            <Page.SubSectionHeader2>Get started by:</Page.SubSectionHeader2>
            <Page.SubSectionText>
              1. Read our{' '}
              <Page.WebLink
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.google.com/document/d/1L5Hc8_K_NhVhAejdE05C_Y__CgqeBWFrFYFoNqBSBbQ/edit"
              >
                Onboarding Steps
              </Page.WebLink>
              .
            </Page.SubSectionText>
            <Page.SubSectionText>
              2. Join us on{' '}
              <Page.WebLink
                target="_blank"
                rel="noopener noreferrer"
                href="https://sfbrigade.slack.com/archives/C010EGACUTU"
              >
                Slack
              </Page.WebLink>
              , and say Hi!
            </Page.SubSectionText>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://sfbrigade.slack.com/archives/C010EGACUTU"
            >
              <Page.GreenButton>Join our Slack</Page.GreenButton>
            </a>
          </Page.SubSection>
        </Page.MainSections>
        <Page.MainSections>
          <Page.AffiliatesSubSection>
            <Page.SubSectionText>
              A few organizations we'd like to thank for their support.
            </Page.SubSectionText>
            <AffiliatesContainer>
              <Affiliates />
            </AffiliatesContainer>
          </Page.AffiliatesSubSection>
        </Page.MainSections>
      </Page.Main>
      <Footer />
    </Page.PageContainer>
  );
};

export default About;
