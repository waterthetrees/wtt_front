/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import React from 'react';
import { Link, Box } from '@mui/material';
import Section from '@/components/Section/Section';

export default function TreeLinks({ currentTreeData }) {
  const { download, info, city, sourceId } = currentTreeData;
  const sourceName = city || sourceId || '';
  const links = [
    {
      url: download,
      label: `${sourceName} Data`,
    },
    {
      url: info,
      label: `${sourceName} Info`,
    },
    {
      url: 'https://standards.opencouncildata.org/#/trees',
      label: 'Open Council Data Standards',
    },
  ];

  return (
    <Section title="Links">
      {links.map((link) => (
        <Anchor key={link.label} label={link.label} url={link.url} />
      ))}
    </Section>
  );
}

const Anchor = ({ url, label }) => (
  <Box sx={{ my: 1, textAlign: 'left' }}>
    {url && (
      <Link href={url} target="_blank" rel="noopener" underline="always">
        {label}
      </Link>
    )}
  </Box>
);
