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
  fontFamily: '"Montserrat", sans-serif',
});

export const Main = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '@media only screen and(max-width: 768px)': {
    width: '100%',
  },
});

export const MainSections = styled.div({
  boxSizing: 'border-box',
  marginBottom: '4rem',
  paddingTop: '4rem',
  display: 'flex',
  justifyContent: 'space-between',
  width: '70%',
  borderTop: '1px solid black',
  ':first-child': {
    borderTop: '0px',
  },
  '@media only screen and (max-width: 768px)': {
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
  width: '47.5%',
  span: {
    marginBottom: '1rem',
  },
  '@media only screen and (max-width: 768px)': {
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
  '@media only screen and (max-width: 768px)': {
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
  '@media only screen and (max-width: 768px)': {
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
  '@media only screen and (max-width: 768px)': {
    display: 'flex',
    flexDirection: 'column',
  },
});

export const ImageSection = styled.div({
  width: '100%',
  height: '50rem',
  marginBottom: '4rem',
  display: 'flex',
  flexDirection: 'column',
  '@media only screen and (max-width: 768px)': {
    marginBottom: '1.5rem',
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
  fontSize: '4.75rem',
  marginBottom: '1rem',
  '@media only screen and (max-width: 768px)': {
    fontSize: '3.75em',
  },
});

export const SubSectionHeader2 = styled.h2({
  fontSize: '2.5rem',
  marginBottom: '1rem',
  '@media only screen and (max-width: 768px)': {
    fontSize: '2.25rem',
  },
});

export const SubSectionText = styled.span({
  fontSize: '1.5rem',
  '@media only screen and (max-width: 768px)': {
    fontSize: '1.25rem',
  },
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
  fontSize: '1.75rem',
  border: 'none',
  borderRadius: '.5rem',
});
