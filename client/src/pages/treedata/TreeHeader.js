/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Button } from '@mui/material';
import format from 'date-fns/format';
import { env } from '../../util/config';

// TODO: when edit mode is fixed, remove the env check below
export default function TreeHeader({
  treeData, edit, vacant,
}) {
  const {
    common, scientific, genus, datePlanted, dbh, height,
  } = treeData;
  const wikipediaLink = `https://en.wikipedia.org/wiki/${scientific}`;
  const planted = format(new Date(datePlanted), 'MMMM d, yyyy');
  return (
    <div className="text-left">
      <h1>
        {common}
      </h1>
      {!vacant && (
        <div>
          <h2><a href={wikipediaLink} name={wikipediaLink} target="_blank" rel="noreferrer">{scientific}</a></h2>
          {(scientific !== genus) && <h2>{genus}</h2>}
          {datePlanted && <h5>Planted: {planted}</h5>}
          {height && <h5>Height: {height}</h5>}
          {dbh && <h5>DBH: {dbh}</h5>}
        </div>
      )}

      {env !== 'production'
        && (
          <div className="text-right">
            <Button color="primary" onClick={edit}>Edit</Button>
          </div>
        )}
    </div>
  );
}
