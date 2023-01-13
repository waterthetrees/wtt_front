import React from 'react';
import styled from '@emotion/styled';
import { Footer } from '@/components/Footer/Footer';
import { C4SF } from '@/components/Contacts';
import { SlackLogo, GithubLogo, FigmaLogo } from '@/components/Icons';
import tree from '../../assets/images/contact/tree.png';
import * as Page from '@/components/Section/Section';

import './Contact.scss';

export default function Contact() {
  const SocialsContainer = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  });

  const Position = styled.div({
    position: 'absolute',
    width: '70%',
    zIndex: '10',
    '@media(max-width: 768px)': {
      width: '100%',
    },
  });

  const Position2 = styled.div({
    position: 'relative',
    width: '27%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    color: 'white',
    '@media(max-width: 768px)': {
      padding: '0 1.5rem',
      width: '70%',
    },
  });

  return (
    <Page.PageContainer>
      <Page.Main>
        <Page.ImageSection>
          <Page.SubSection2>
            <Page.Image src={tree}></Page.Image>
            <Position>
              <Position2>
                <Page.SubSectionHeader>
                  Get in Touch with us!
                </Page.SubSectionHeader>
                <Page.SubSectionHeader2>
                  We meet every week on wednesday at 6:30 PM PST.
                </Page.SubSectionHeader2>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://sfbrigade.slack.com/archives/C010EGACUTU"
                >
                  <Page.GreenButton>Join our Slack</Page.GreenButton>
                </a>
              </Position2>
            </Position>
          </Page.SubSection2>
        </Page.ImageSection>
        <Page.MainSections>
          <Page.SubSection>
            <Page.SubSectionHeader>
              <Page.GreenText>Contact Information</Page.GreenText>
            </Page.SubSectionHeader>
          </Page.SubSection>
          <Page.SubSection>
            <Page.SubSectionHeader2>For Inquiries</Page.SubSectionHeader2>
            <Page.SubSectionText>
              <Page.WebLink
                target="_blank"
                rel="noopener noreferrer"
                href="https://sfbrigade.slack.com/archives/C010EGACUTU"
              >
                info@waterthetrees.com
              </Page.WebLink>
            </Page.SubSectionText>
            <Page.SubSectionHeader2>Socials</Page.SubSectionHeader2>
            <Page.SubSectionText>
              Follow us on our various social media accounts!
            </Page.SubSectionText>
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
          </Page.SubSection>
        </Page.MainSections>
        <Page.MainSections>
          <Page.SubSection>
            <Page.SubSectionHeader>
              Join our <Page.GreenText>Parent Organization</Page.GreenText>
            </Page.SubSectionHeader>
          </Page.SubSection>
          <Page.SubSection>
            <Page.SubSectionHeader2>Join us!</Page.SubSectionHeader2>
            <Page.SubSectionText>
              Additionally, our parent organizations are always looking for
              volunteers! For more information,{' '}
              <Page.WebLink
                href="https://www.codeforsanfrancisco.org/"
                rel="noreferrer"
                target="_blank"
              >
                Code for San Francisco
              </Page.WebLink>
              .
            </Page.SubSectionText>
            <C4SF />
          </Page.SubSection>
        </Page.MainSections>
      </Page.Main>
      <Footer />
    </Page.PageContainer>
  );
}
