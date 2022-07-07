/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import React from 'react';
import { TableRow, TableCell, styled } from '@mui/material';
import TreeTable from './TreeTable';
import Section from '@/components/Section/Section';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const getSectionInfo = (infoArray, currentTreeData) => {
  const target = {};
  infoArray.forEach(
    (key) => (target[capitalizeFirstLetter(key)] = currentTreeData[key]),
  );
  return target;
};

export default function TreeInfo({ currentTreeData }) {
  const sections = {
    Address: ['address', 'city', 'state', 'country', 'zip', 'lng', 'lat'],
    Organization: ['who', 'organization', 'email', 'phone', 'website', 'owner'],
    Ids: ['id', 'ref', 'sourceId'],
  };
  return (
    <>
      {Object.entries(sections).map(([title, sectionKeys]) => (
        <TreeInfoSections
          key={title}
          title={title}
          treeInfo={getSectionInfo(sectionKeys, currentTreeData)}
        />
      ))}
    </>
  );
}

const TableRowThin = styled(TableRow)`
  & .MuiTableCell-root {
    padding: 0.2rem;
    width: 100vw;
  }
`;

const TreeInfoSections = ({ treeInfo, title }) => {
  if (Object.keys(treeInfo).length === 0) {
    return null;
  }
  return (
    <Section title={title}>
      <TreeTable>
        {Object.entries(treeInfo).map(([label, value]) => {
          if (!value) return;
          return <TableRows key={label} label={label} value={value} />;
        })}
      </TreeTable>
    </Section>
  );
};

const TableRows = ({ label, value }) => {
  return (
    <TableRowThin key={label}>
      <TableCell sx={{ pl: 0, fontWeight: 'bold' }} style={{ width: '30%' }}>
        {label}
      </TableCell>
      <TableCell>{value}</TableCell>
    </TableRowThin>
  );
};
