import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Footer } from '@/components/Footer/Footer';
import { Affiliates } from '@/components/Contacts';
import { TreeLogo } from '@/components/Icons';

import TreeImage from '@/assets/images/addtree/treefattrunk.png';

import './About.scss';

const About = () => {
  const PageContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    marginTop: '72px',
    paddingTop: '42px',
  });

  const MainContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',

    '@media(max-width: 768px)': {
      width: '100%',
    },
  });

  const Main = styled.div({
    display: 'flex',
    flexDirection: 'column',
    'p:last-child': {
      marginBottom: '0px',
    },
    alignItems: 'center',
  });

  const MainSections = styled.div({
    margin: '4em 0',
    display: 'flex',
    justifyContent: 'space-between',
    width: '60%',
  });

  const SubSection = styled.div({
    display: 'flex',
    flexDirection: 'column',
    width: '40%',
  });

  const SubSectionHeader = styled.h1({
    fontSize: '3.4em',
  });

  const SubSectionHeader2 = styled.h2({
    fontSize: '2em',
  });

  const SubSectionText = styled.span({
    fontSize: '1.5em',
  });
  // const SubSectionHeader = styled.h1({
  //   fontSize: '40px',
  // });
  const GreenText = styled.span({
    color: 'green',
  });

  return (
    <PageContainer>
      <MainContainer>
        <Main>
          <MainSections>
            <SubSection>
              <SubSectionHeader>
                We are connecting our forest{' '}
                <GreenText>to our digital world</GreenText>
              </SubSectionHeader>
            </SubSection>
            <SubSection>
              <SubSectionText>
                Welcome to Water the Trees, a platform that crowd sources tree
                planting and maintenance. We are an open source project run by
                tree planting volunteers.
              </SubSectionText>
            </SubSection>
          </MainSections>
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
        </Main>
      </MainContainer>
      <h1>Hi</h1>
    </PageContainer>
  );

  // const PageContainer = styled.div({
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   boxSizing: 'border-box',
  //   fontFamily: 'Montserrat',
  //   marginTop: '72px',
  //   padding: '0px 0px 40px 0px',
  //   textAlign: 'center',
  //   fontSize: '1.33rem',
  //   '@media(max-width: 768px)': {
  //     margin: '0px',
  //     padding: '3rem 2rem',
  //   },
  //   a: {
  //     textDecoration: 'underline',
  //     color: '#3FAB45',
  //     cursor: 'pointer',
  //   },
  // });

  // const HeaderContainer = styled.div({
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   marginTop: '112px',
  //   marginBottom: '56px',
  //   width: '30%',
  //   '@media(max-width: 768px)': {
  //     width: '100%',
  //   },
  // });

  // const HeaderLogoContainer = styled.div({
  //   display: 'flex',
  //   justifyContent: 'center',
  //   marginBottom: '24px',
  // });

  // const HeaderText = styled.h1({
  //   fontSize: '2.65rem',
  //   marginBottom: '8px',
  // });

  // const HeaderSummary = styled.span({});

  // const MainContainer = styled.div({
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   width: '28%',
  //   '@media(max-width: 768px)': {
  //     width: '100%',
  //   },
  // });

  // const MainSection = styled.div({
  //   marginBottom: '40px',
  //   'p:last-child': {
  //     marginBottom: '0px',
  //   },
  // });

  // const MainSectionHeader = styled.h2({});

  // const MainSectionSummary = styled.p({
  //   marginBottom: '16px',
  // });

  // const MainSubSection = styled.div({
  //   marginTop: '24px',
  //   p: {
  //     marginBottom: '0px',
  //   },
  // });

  // const MainSubSectionHeader = styled.h4({});

  // const FooterContainer = styled.div({
  //   width: '100%',
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   backgroundColor: '#EFEFEF',
  // });

  // const AffiliatesContainer = styled.div({
  //   width: '30%',
  //   display: 'flex',
  //   justifyContent: 'space-between',
  //   marginTop: '32px',
  //   marginBottom: '24px',
  //   img: {
  //     height: '64px',
  //   },
  //   '@media(max-width: 768px)': {
  //     width: '100%',
  //   },
  // });

  // return (
  //   <PageContainer>
  //     <HeaderContainer>
  //       <HeaderLogoContainer>
  //         <TreeLogo />
  //       </HeaderLogoContainer>
  //       <HeaderText>About Water the Trees</HeaderText>
  //       <HeaderSummary>
  //         Welcome to Water the Trees, a platform that crowd sources tree
  //         planting and maintenance. We are an open source project run by tree
  //         planting volunteers.
  //       </HeaderSummary>
  //     </HeaderContainer>
  //     <MainContainer>
  //       <MainSection>
  //         <MainSectionHeader>Vision</MainSectionHeader>
  //         <MainSectionSummary>
  //           We believe in the power of trees to restore natural habitat for
  //           animals, insect, and fauna.
  //         </MainSectionSummary>
  //       </MainSection>
  //       <MainSection>
  //         <MainSectionHeader>Mission</MainSectionHeader>
  //         <MainSectionSummary>
  //           We are interested in continuous massive tree planting events to help
  //           sequester carbon footprint and stablize climate change extremes.
  //         </MainSectionSummary>
  //       </MainSection>
  //       <MainSection>
  //         <MainSectionHeader>Who we are!</MainSectionHeader>
  //         <MainSectionSummary>
  //           Water the Trees begun as a tree tracking platform to track the life
  //           and health of a tree worldwide.
  //         </MainSectionSummary>
  //         <MainSectionSummary>
  //           Together with data, three enthusiast, and volunteers we are able to
  //           maintain a source to see the growth of trees in all communities.
  //         </MainSectionSummary>
  //       </MainSection>

  //       <MainSection>
  //         <MainSectionHeader>Join the team!</MainSectionHeader>
  //         <MainSectionSummary>
  //           We are always looking for team members to contribute to the project.
  //         </MainSectionSummary>
  //         <MainSectionSummary>
  //           Currently we are looking for Backend Developers,Frontend Developers,
  //           Designers, Researchers, Admin, Marketing and many more!
  //         </MainSectionSummary>
  //         <MainSubSection>
  //           <MainSubSectionHeader>How to get started:</MainSubSectionHeader>
  //           <MainSectionSummary>
  //             1. Read our{' '}
  //             <a
  //               target="_blank"
  //               rel="noopener noreferrer"
  //               href="https://docs.google.com/document/d/1L5Hc8_K_NhVhAejdE05C_Y__CgqeBWFrFYFoNqBSBbQ/edit"
  //             >
  //               Onboarding Steps
  //             </a>
  //           </MainSectionSummary>
  //           <MainSectionSummary>
  //             2. Join us on{' '}
  //             <a
  //               target="_blank"
  //               rel="noopener noreferrer"
  //               href="https://join.slack.com/share/zt-ouzg0084-34S7_J9UZlcJSe9~qV7jbQ"
  //             >
  //               Slack
  //             </a>
  //           </MainSectionSummary>
  //         </MainSubSection>
  //       </MainSection>
  //     </MainContainer>
  //     <FooterContainer>
  //       <MainSectionHeader>Community</MainSectionHeader>
  //       <MainSectionSummary>
  //         To save trees in your local community, please visit our{' '}
  //         <Link to="/community">Community</Link>
  //         outreach page to find organizations near you.
  //       </MainSectionSummary>
  //       <AffiliatesContainer>
  //         <Affiliates />
  //       </AffiliatesContainer>
  //     </FooterContainer>
  //     <Footer />
  //   </PageContainer>
  // );
};

export default About;
