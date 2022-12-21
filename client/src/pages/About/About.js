import React from 'react';
import styled from '@emotion/styled';
import { Affiliates } from '@/components/Contacts';
import { Footer } from '@/components/Footer/Footer';
import tree from '../../assets/images/about/abouttree.jpg';

import './About.scss';
const About = () => {
  const PageContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '72px',
    fontFamily: 'montserrat',
    '@media(max-width: 768px)': {
      padding: '1.5rem 1.5rem',
    },
  });

  const Main = styled.div({
    display: 'flex',
    flexDirection: 'column',
    'p:last-child': {
      marginBottom: '0px',
    },
    alignItems: 'center',
    '@media(max-width: 768px)': {
      width: '100%',
    },
  });

  const MainSections = styled.div({
    boxSizing: 'border-box',
    marginBottom: '4em',
    paddingTop: '4em',
    display: 'flex',
    justifyContent: 'space-between',
    width: '60%',
    borderTop: '1px solid black',
    ':first-child': {
      borderTop: '0px',
    },
    '@media(max-width: 768px)': {
      marginBottom: '.5em',
      paddingTop: '.5em',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  });

  const SubSection = styled.div({
    display: 'flex',
    flexDirection: 'column',
    width: '40%',
    span: {
      marginBottom: '1em',
    },
    '@media(max-width: 768px)': {
      margin: '1rem 0',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      '> a': {
        display: 'flex',
        justifyContent: 'center',
      },
    },
  });

  const SubSection2 = styled.div({
    display: 'flex',
    flexDirection: 'column',
    width: '20%',
    textAlign: 'center',
    '@media(max-width: 768px)': {
      margin: '1rem 0',
      width: '60%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  });

  const SubSection3 = styled.div({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    '@media(max-width: 768px)': {
      margin: '1rem 0',
      display: 'flex',
      flexDirection: 'column',
    },
  });
  const SubSectionHeader = styled.h1({
    fontSize: '3.75em',
  });

  const SubSectionHeader2 = styled.h2({
    fontSize: '2em',
  });

  const SubSectionText = styled.span({
    fontSize: '1.5em',
  });

  const WebLink = styled.a({
    color: '#3fab45',
    textDecoration: 'underline',
    '&:hover': {
      color: 'green',
      textDecoration: 'underline',
    },
  });
  const ImageContainer = styled.div({
    width: '100%',
    height: '50em',
    marginBottom: '4em',
    '@media(max-width: 768px)': {
      marginBottom: '.5em',
      width: '100%',
      height: '50%',
    },
  });
  const Image = styled.img({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  });

  const GreenText = styled.span({
    color: '#3fab45',
  });

  const GreenButton = styled.button({
    background: '#3fab45',
    color: 'white',
    fontSize: '1.75em',
    border: 'none',
    borderRadius: '.5em',
  });

  const NumberContainer = styled.div({
    position: 'relative',
    width: '100%',
    bottom: '4em',
  });

  const NumberContainer2 = styled.div({
    position: 'absolute',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    color: '#3fab4530',
  });
  const Number = styled.h1({
    fontSize: '12.5em',
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
    <PageContainer>
      <Main>
        <MainSections>
          <SubSection>
            <SubSectionHeader>
              We are connecting our forest{' '}
              <GreenText>to our digital world</GreenText>
            </SubSectionHeader>
          </SubSection>
          <SubSection>
            <SubSectionHeader2>About Us</SubSectionHeader2>
            <SubSectionText>
              Welcome to Water the Trees, a platform that crowd sources tree
              planting and maintenance. We are an open source project run by
              tree planting volunteers.
            </SubSectionText>
          </SubSection>
        </MainSections>
        <ImageContainer>
          <Image src={tree}></Image>
        </ImageContainer>
        <MainSections>
          <SubSection>
            <SubSectionHeader>
              Together we can <GreenText>map out the world</GreenText>
            </SubSectionHeader>
          </SubSection>
          <SubSection>
            <SubSectionHeader2>Vision</SubSectionHeader2>
            <SubSectionText>
              Crowdsource the planting and maintenance of our world's tree to
              quickly mitigate climate change.
            </SubSectionText>
            <SubSectionHeader2>Mission</SubSectionHeader2>
            <SubSectionText>
              Trees provide the very necessities of life itself. They provide
              oxygen for us to breath, clean our air, protect our drinking
              water, create healthy communities, mitigate global warming, and
              can help stablilize the occuring drastic climate change,
              WaterTheTrees is dedicated to crowdsourcing the planting and
              maintenance of our world's trees.
            </SubSectionText>
            <SubSectionHeader2>Strategies & Goals</SubSectionHeader2>
            <SubSectionText>
              Keep a record of tree health and maintenance.
            </SubSectionText>
            <SubSectionText>
              Enable people to adopt and follow neightborhood and favorite
              trees.
            </SubSectionText>
            <SubSectionText>
              Notify people when trees need watering.
            </SubSectionText>
            <SubSectionText>
              Allow cities and tree organizations to make and track trees.
            </SubSectionText>
          </SubSection>
        </MainSections>
        <MainSections>
          <SubSection2>
            <NumberContainer>
              <NumberContainer2>
                <Number>1</Number>
              </NumberContainer2>
            </NumberContainer>
            <SubSectionHeader2>Plant More Trees</SubSectionHeader2>
            <SubSectionText>
              Our goal, we want everyone to plant more trees to provide
              ourselves a better future to control climate change.
            </SubSectionText>
          </SubSection2>
          <SubSection2>
            <NumberContainer>
              <NumberContainer2>
                <Number>2</Number>
              </NumberContainer2>
            </NumberContainer>
            <SubSectionHeader2>Keep More Trees Alive</SubSectionHeader2>
            <SubSectionText>
              As the climate continues to heat up trees suffer. We want to
              maintain as many trees as possible worldwide.
            </SubSectionText>
          </SubSection2>
          <SubSection2>
            <NumberContainer>
              <NumberContainer2>
                <Number>3</Number>
              </NumberContainer2>
            </NumberContainer>
            <SubSectionHeader2>Plant More Trees</SubSectionHeader2>
            <SubSectionText>
              to grow our tree population we want everyone to contribute to
              local tree planting and be aware of tree health.
            </SubSectionText>
          </SubSection2>
        </MainSections>
        <MainSections>
          <SubSection>
            <SubSectionHeader>
              <GreenText>Join Our Team!</GreenText>
            </SubSectionHeader>
          </SubSection>
          <SubSection>
            <SubSectionHeader2>Everyone is Welcomed!</SubSectionHeader2>
            <SubSectionText>
              We are always looking for team members to contribute to the
              project. Currently we are looking for Backend Developers, Frontend
              Developers, UX/UI Designers, Researchers, Admin, Marketing.
            </SubSectionText>
            <SubSectionHeader2>Get started by:</SubSectionHeader2>
            <SubSectionText>
              1. Read our{' '}
              <WebLink
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.google.com/document/d/1L5Hc8_K_NhVhAejdE05C_Y__CgqeBWFrFYFoNqBSBbQ/edit"
              >
                Onboarding Steps
              </WebLink>
              .
            </SubSectionText>
            <SubSectionText>
              2. Join us on{' '}
              <WebLink
                target="_blank"
                rel="noopener noreferrer"
                href="https://sfbrigade.slack.com/archives/C010EGACUTU"
              >
                Slack
              </WebLink>
              , and say Hi!
            </SubSectionText>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://sfbrigade.slack.com/archives/C010EGACUTU"
            >
              <GreenButton>Join our Slack</GreenButton>
            </a>
          </SubSection>
        </MainSections>
        <MainSections>
          <SubSection3>
            <SubSectionText>
              A few organizations we'd like to thank for their support.
            </SubSectionText>
            <AffiliatesContainer>
              <Affiliates />
            </AffiliatesContainer>
          </SubSection3>
        </MainSections>
      </Main>
      <Footer />
    </PageContainer>
  );
};

export default About;
