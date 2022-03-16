import React from 'react';
import {
  TableRow, TableCell, Link, Box,
} from '@mui/material';
import Section from '@/components/Section/Section';
import TreeDetailsTable from './TreeDetailsTable';

const infoKeys = [
  'address',
  'city',
  'zip',
  'state',
  'country',
  'neighborhood',
  ['lat', 'Latitude'],
  ['lng', 'Longitude'],
  'who',
  'Organization',
  'owner',
  ['idReference', 'Reference #'],
  'id',
  'sourceId',
  'sourceID',
  ['count', 'TreeCount'],
].map((info) => (Array.isArray(info)
  ? info
  : [info, info[0].toUpperCase() + info.slice(1)]));

export default function TreeInfo({ currentTreeData }) {
  const labelValues = infoKeys.reduce((result, [key, label]) => {
    const value = currentTreeData[key];

    if (value) {
      result.push([label, value, key]);
    }

    return result;
  }, []);

  if (!labelValues.length) {
    return null;
  }

  return (
    <Section
      title="Info"
    >
      <TreeDetailsTable>
        {labelValues.map(([label, value, key]) => (
          <TableRow
            key={key}
          >
            <TableCell sx={{ pl: 0, fontWeight: 'bold' }}>{label}</TableCell>
            <TableCell>{value}</TableCell>
          </TableRow>
        ))}
      </TreeDetailsTable>
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

// sx={{ '&:nth-child(odd)': { backgroundColor: 'lightgray' } }}
