/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Button } from '@mui/material';
import format from 'date-fns/format';
import { env } from '../../util/config';

// TODO: when edit mode is fixed, remove the env check below
export default function TreeHeader({
  treeData, edit,
}) {
  const {
    common, scientific, genus, datePlanted, dbh, height,
  } = treeData;
  return (
    <div className="text-left">
      <h1>{common}</h1>
      {!['vacant', 'vacant site', 'unsuitable site', 'asphalted well'].includes(common.toLowerCase()) && (
        <div>
          <h2>{scientific}</h2>
          {(scientific !== genus) && <h2>{genus}</h2>}
          <h5>Planted: {format(new Date(datePlanted), 'MMMM d, yyyy')}</h5>
          <h5>Height: {height}</h5>
          <h5>DBH: {dbh}</h5>
        </div>
      )}

      {env !== 'prod'
        && (
          <div className="text-right">
            <Button color="primary" onClick={edit}>Edit</Button>
          </div>
        )}
    </div>
  );
}
