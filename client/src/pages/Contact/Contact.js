import React from 'react';
import styled from '@emotion/styled';
import { Footer } from '@/components/Footer/Footer';
import { C4SF } from '@/components/Contacts';
import { TreeLogo, SlackLogo, GithubLogo, FigmaLogo } from '@/components/Icons';

import './Contact.scss';

export default function Contact() {
  const PageContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxSizing: 'border-box',
    fontFamily: 'Montserrat',
    marginTop: '72px',
    padding: '0px 0px 64px 0px',
    textAlign: 'center',
    fontSize: '1.33rem',
    '@media(max-width: 768px)': {
      margin: '0px',
      padding: '3rem 2rem',
    },
    a: {
      textDecoration: 'underline',
      color: '#3FAB45',
      cursor: 'pointer',
    },
  });

  const HeaderContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '112px',
    marginBottom: '24px',
    width: '30%',
    '@media(max-width: 768px)': {
      width: '100%',
    },
  });

  const HeaderLogoContainer = styled.div({
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '24px',
  });

  const HeaderText = styled.h1({
    fontSize: '2.65rem',
    marginBottom: '8px',
  });

  const MainContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '28%',
    '@media(max-width: 768px)': {
      width: '100%',
    },
  });

  const MainSection = styled.div({
    marginBottom: '24px',
    'p:last-child': {
      marginBottom: '0px',
    },
  });

  const MainSection2 = styled.div({
    display: 'flex',
    marginBottom: '24px',
    justifyContent: 'space-evenly',
    width: '100%',
  });

  const MainSectionSummary = styled.p({});

  const MainSectionHeader = styled.h2({});

  const HeaderSummary = styled.span({});

  return (
    <PageContainer>
      <HeaderContainer>
        <HeaderLogoContainer>
          <TreeLogo />
        </HeaderLogoContainer>
        <HeaderText>Get in Touch</HeaderText>
        <HeaderSummary>
          We meet every week on Wednesday at 6:30PM Pacific. Join our{' '}
          <a
            href="https://join.slack.com/share/zt-ouzg0084-34S7_J9UZlcJSe9~qV7jbQ"
            rel="noreferrer"
            target="_blank"
          >
            Slack
          </a>
          .
        </HeaderSummary>
      </HeaderContainer>

      <MainContainer>
        <MainSection>
          <MainSectionHeader>Email us at:</MainSectionHeader>
          <MainSectionSummary>
            <a
              href="mailto:info@waterthetrees.com"
              rel="noreferrer"
              target="_blank"
            >
              info@waterthetrees.com
            </a>
          </MainSectionSummary>
        </MainSection>
        <MainSection>
          <MainSectionHeader>Socials: </MainSectionHeader>
          <MainSectionSummary>
            Follow us on our various social media accounts!
          </MainSectionSummary>
        </MainSection>
        <MainSection2>
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
        </MainSection2>
        <MainSection>
          <MainSectionHeader>Help Locally!</MainSectionHeader>
          <MainSectionSummary>
            Please visit our <a href="/community">Community Page</a> to learn
            how you can contribute today!
          </MainSectionSummary>
        </MainSection>
        <MainSection>
          <MainSectionHeader>Join the Team!</MainSectionHeader>
          <MainSectionSummary>
            Additionally our parent organization is always looking for
            volunteers!
          </MainSectionSummary>
          <MainSectionSummary>
            For developers,{' '}
            <a
              href="https://www.codeforsanfrancisco.org/"
              rel="noreferrer"
              target="_blank"
            >
              Code for San Francisco
            </a>
          </MainSectionSummary>
        </MainSection>
        <C4SF />
        <Footer />
      </MainContainer>
    </PageContainer>
  );
}
