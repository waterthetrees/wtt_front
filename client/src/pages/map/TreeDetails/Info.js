import React from 'react';
import {
  Table, TableBody, TableRow, TableCell, TableContainer, Link, Box,
} from '@mui/material';
import Section from '../Section';

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
      result.push([label, value]);
    }

    return result;
  }, []);

  return labelValues.length && (
    <Section
      title="Info"
    >
      <TableContainer>
        <Table size="small">
          <TableBody>
            {labelValues.map(([label, value]) => (
              <TableRow key={label}>
                <TableCell sx={{ fontWeight: 'bold' }}>{label}</TableCell>
                <TableCell>{value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
