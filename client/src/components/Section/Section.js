import React from 'react';
import { Box } from '@mui/material';
import styled from '@emotion/styled';

export default function Section({ children, title }) {
  return (
    <Box
      sx={{
        mt: 2,
        mb: 4,
        '&:last-child': {
          mb: 2,
        },
      }}
    >
      <h3>{title}</h3>
      {children}
    </Box>
  );
}

export const PageContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginTop: '72px',
  fontFamily: 'montserrat',
});

export const Main = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '@media(max-width: 768px)': {
    width: '100%',
  },
});

export const MainSections = styled.div({
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
    alignItems: 'center',
  },
});

export const SubSection = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '40%',
  span: {
    marginBottom: '1em',
  },
  '@media(max-width: 768px)': {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    '> a': {
      display: 'flex',
      justifyContent: 'center',
    },
  },
});

export const SubSection2 = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  '@media(max-width: 768px)': {
    width: '100%',
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
  },
});

export const NumberSubSection = styled.div({
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

export const AffiliatesSubSection = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'center',
  '@media(max-width: 768px)': {
    display: 'flex',
    flexDirection: 'column',
  },
});

export const ImageSection = styled.div({
  width: '100%',
  height: '50em',
  marginBottom: '4em',
  display: 'flex',
  flexDirection: 'column',
  '@media(max-width: 768px)': {
    marginBottom: '1.5em',
    width: '100%',
    height: '100%',
  },
});

export const WebLink = styled.a({
  color: '#3fab45',
  textDecoration: 'underline',
  '&:hover': {
    color: 'green',
    textDecoration: 'underline',
  },
});

export const SubSectionHeader = styled.h1({
  fontSize: '3.75em',
  marginBottom: '1rem',
});

export const SubSectionHeader2 = styled.h2({
  fontSize: '2em',
  marginBottom: '1rem',
});

export const SubSectionText = styled.span({
  fontSize: '1.5em',
});

export const GreenText = styled.span({
  color: '#3fab45',
});

export const Image = styled.img({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const GreenButton = styled.button({
  background: '#3fab45',
  color: 'white',
  fontSize: '1.75em',
  border: 'none',
  borderRadius: '.5em',
});
