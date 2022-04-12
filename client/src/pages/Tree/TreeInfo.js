/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import React from 'react';
import {
  TableRow, TableCell,
} from '@mui/material';
import Section from '@/components/Section/Section';
import TreeTable from './TreeTable';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const infoKeys = [
  'address',
  'city',
  'zip',
  'state',
  'country',
  'neighborhood',
  ['lat', 'Latitude'],
  ['lng', 'Longitude'],
  'organization',
  'who',
  'owner',
  ['idReference', 'Ref #'],
  'id',
  'sourceid',
  'count',
  'treelocationcount',
].map((treeRow) => (Array.isArray(treeRow)
  ? treeRow
  : [treeRow, capitalizeFirstLetter(treeRow)]));

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
      <TreeTable>
        {labelValues.map(([label, value]) => (
          <TableRows key={label} label={label} value={value} />
        ))}
      </TreeTable>
    </Section>
  );
}

const TableRows = ({ label, value }) => (
  <TableRow key={label}>
    <TableCell sx={{ pl: 0, fontWeight: 'bold' }}>{label}</TableCell>
    <TableCell>{value}</TableCell>
  </TableRow>
);
