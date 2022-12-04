import React from 'react';
import styled from '@emotion/styled';
import { Footer } from '@/components/Footer/Footer';
import { C4SF } from '@/components/Contacts';
import { SlackLogo, GithubLogo, FigmaLogo } from '@/components/Icons';

import './Contact.scss';

export default function Contact() {
  const PageContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '72px',
    fontFamily: 'montserrat',
  });

  const Main = styled.div({
    display: 'flex',
    flexDirection: 'column',
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
      marginBottom: '1.5rem',
      paddingTop: '1.5rem',
      width: '90%',
      display: 'flex',
      flexDirection: 'column',
    },
  });
  const MainSections2 = styled.div({
    boxSizing: 'border-box',
    marginBottom: '4em',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderTop: '1px solid black',
    ':first-child': {
      borderTop: '0px',
    },
    '@media(max-width: 768px)': {
      marginBottom: '1.5em',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '500px',
    '@media(max-width: 768px)': {
      width: '100%',
      height: '400px',
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
    fontWeight: 'bold',
    color: '#3fab45',
    textDecoration: 'underline',
    '&:hover': {
      color: 'green',
      textDecoration: 'underline',
    },
  });

  const GreenText = styled.span({
    color: '#3fab45',
  });

  const GreenButton = styled.button({
    marginTop: '.5em',
    background: '#3fab45',
    color: 'white',
    fontSize: '1.75em',
    border: 'none',
    borderRadius: '.5em',
  });

  const SocialsContainer = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  });

  const ImageContainer = styled.div({
    position: 'absolute',
    width: '60%',
    zIndex: '10',
    '@media(max-width: 768px)': {
      width: '100%',
    },
  });

  const ImageContainer2 = styled.div({
    position: 'relative',
    width: '25%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    '@media(max-width: 768px)': {
      padding: '0 1.5rem',
      width: '70%',
    },
  });

  const Image = styled.img({
    width: '100%',
    height: '100%',
    // objectFit: 'contain',
  });

  return (
    <PageContainer>
      <Main>
        <MainSections2>
          <SubSection2>
            <Image src="https://image.lexica.art/md/28781071-3412-4a88-9441-0425ef099122"></Image>
            <ImageContainer>
              <ImageContainer2>
                <SubSectionHeader>Get in Touch with us!</SubSectionHeader>
                <SubSectionHeader2>
                  We meet every week on wednesday at 6:30 PM PST.
                </SubSectionHeader2>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://sfbrigade.slack.com/archives/C010EGACUTU"
                >
                  <GreenButton>Join our Slack</GreenButton>
                </a>
              </ImageContainer2>
            </ImageContainer>
          </SubSection2>
        </MainSections2>
        <MainSections>
          <SubSection>
            <SubSectionHeader>
              <GreenText>Contact Information</GreenText>
            </SubSectionHeader>
          </SubSection>
          <SubSection>
            <SubSectionHeader2>For Inquiries</SubSectionHeader2>
            <SubSectionText>
              <WebLink
                target="_blank"
                rel="noopener noreferrer"
                href="https://sfbrigade.slack.com/archives/C010EGACUTU"
              >
                info@waterthetrees.com
              </WebLink>
            </SubSectionText>
            <SubSectionHeader2>Socials</SubSectionHeader2>
            <SubSectionText>
              Follow us on our various social media accounts!
            </SubSectionText>
            <SocialsContainer>
              <a
                href="https://join.slack.com/share/zt-ouzg0084-34S7_J9UZlcJSe9~qV7jbQ"
                rel="noreferrer"
                target="_blank"
              >
                <SlackLogo />
              </a>
              <a
                href="https://github.com/waterthetrees/waterthetrees/"
                rel="noreferrer"
                target="_blank"
              >
                <GithubLogo />
              </a>
              <a
                href="https://www.figma.com/file/5C3v1LUNwMPQy9JOgnKEtr/Water-the-Trees"
                rel="noreferrer"
                target="_blank"
              >
                <FigmaLogo />
              </a>
            </SocialsContainer>
          </SubSection>
        </MainSections>
        <MainSections>
          <SubSection>
            <SubSectionHeader>
              Join our <GreenText>Parent Organization</GreenText>
            </SubSectionHeader>
          </SubSection>
          <SubSection>
            <SubSectionHeader2>Join us!</SubSectionHeader2>
            <SubSectionText>
              Additionally, our parent organizations are always looking for
              volunteers! For more information,{' '}
              <WebLink
                href="https://www.codeforsanfrancisco.org/"
                rel="noreferrer"
                target="_blank"
              >
                Code for San Francisco
              </WebLink>
              .
            </SubSectionText>
            <C4SF />
          </SubSection>
        </MainSections>
      </Main>
      <Footer />
    </PageContainer>
  );
}
