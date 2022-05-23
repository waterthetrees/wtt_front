/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import React from 'react';
import { TableRow, TableCell, styled } from '@mui/material';
import Section from '@/components/Section/Section';
import TreeTable from './TreeTable';
// import { styled } from '@mui/system';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const removeAddressIgnoreList = (currentTreeData) => {
  const {
    common,
    scientific,
    sourceId,
    updated,
    planted,
    ref,
    owner,
    dbh,
    height,
    count,
    download,
    info,
    id,
    ...addressInfo
  } = currentTreeData;
  return addressInfo;
};

const removeInfoIgnoreList = (currentTreeData) => {
  const {
    common,
    scientific,
    sourceId,
    updated,
    dbh,
    height,
    address,
    city,
    state,
    country,
    zip,
    lng,
    lat,
    download,
    info,
    planted,
    ref,
    id,
    count,
    ...orgInfo
  } = currentTreeData;
  return orgInfo;
};

const removeIdIgnoreList = (currentTreeData) => {
  const {
    common,
    scientific,
    updated,
    dbh,
    height,
    address,
    city,
    state,
    country,
    zip,
    lng,
    lat,
    download,
    info,
    planted,
    owner,
    count,
    ...idInfo
  } = currentTreeData;
  return idInfo;
};

export default function TreeInfo({ currentTreeData }) {
  return (
    <>
      <TreeInfoSections
        title="Address"
        treeInfo={removeAddressIgnoreList(currentTreeData)}
      />
      <TreeInfoSections
        title="Ids"
        treeInfo={removeIdIgnoreList(currentTreeData)}
      />
      <TreeInfoSections
        title="Organization"
        treeInfo={removeInfoIgnoreList(currentTreeData)}
      />
    </>
  );
}

const TableRowsThin = styled(TableRow)`
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
      {Object.entries(treeInfo).map(([label, value]) => {
        if (!value) return;
        return (
          <TableRows
            key={label}
            label={capitalizeFirstLetter(label)}
            value={value}
          />
        );
      })}
    </Section>
  );
};

const TableRows = ({ label, value }) => {
  return (
    <TableRowsThin key={label}>
      <TableCell sx={{ pl: 0, fontWeight: 'bold' }} style={{ width: '30%' }}>
        {label}
      </TableCell>
      <TableCell>{value}</TableCell>
    </TableRowsThin>
  );
};
