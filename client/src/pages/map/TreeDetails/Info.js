import React from 'react';
import {
  TableRow, TableCell, Link, Box,
} from '@mui/material';
import Section from '../Section';
import DetailsTable from './DetailsTable';

const infoKeys = [
  'address',
  'city',
  'zip',
  'country',
  // 'neighborhood',
  ['lat', 'Latitude'],
  ['lng', 'Longitude'],
  ['owner', 'Organization'],
  'who',
  ['idReference', 'Reference #'],
].map((info) => (Array.isArray(info)
  ? info
  : [info, info[0].toUpperCase() + info.slice(1)]));

export default function Info({ currentTreeData }) {
  const labelValues = infoKeys.reduce((result, [key, label]) => {
    const value = currentTreeData[key];

    if (value) {
      result.push([label, value, key]);
    }

    return result;
  }, []);

  return labelValues.length && (
    <Section
      title="Info"
    >
      <DetailsTable>
        {labelValues.map(([label, value, key]) => (
          <TableRow key={key}>
            <TableCell sx={{ fontWeight: 'bold' }}>{label}</TableCell>
            <TableCell>{value}</TableCell>
          </TableRow>
        ))}
      </DetailsTable>
      <Box sx={{ my: 1, textAlign: 'right' }}>
        <Link
          href="https://standards.opencouncildata.org/#/trees"
          underline="hover"
        >
          Open Council Data Standards
        </Link>
      </Box>
    </Section>
  );
}
