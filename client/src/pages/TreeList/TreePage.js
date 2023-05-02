import { ArrowBack, Download } from '@mui/icons-material';
import React from 'react';
import { CSVLink } from 'react-csv';
import { Link, useLocation } from 'react-router-dom';

import { WttButton } from '@/components/Button/Button';
import { Tag } from '@/components/Tag/Tag';
import treeImages from '@/data/dist/treeImages.json';
import { ImageLoad } from '@/pages/Tree/TreeImage';

import { formatScientificName, toTitleCase } from '../../util/stringUtils';
import { dataSources } from './dataArrays';

import './TreeList.scss';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getTagVariant = (value) =>
  value === 'deciduous' ? 'brown' : 'green';

export default function TreePage() {
  const { state } = useLocation();
  const { tree, selectedDataSourceIndex } = state;
  const { scientific } = tree;
  // const formattedScientific = formatWord(scientific);
  const dataSelected = dataSources[selectedDataSourceIndex];
  const { data, name } = dataSelected;
  const csvFileName = `${name.replaceAll(' ', '-')}.csv`;
  const wikipediaExtract =
    treeImages[scientific]?.content || treeImages[scientific]?.extract || '';
  return (
    <div className="treepage">
      <div className="treepage__content">
        <div className="treepage__content-image">
          <Link to="/treelist">
            <ArrowBack fontSize="large" color="success" variant="filled" />
          </Link>
          {scientific &&
            Object.prototype.hasOwnProperty.call(treeImages, scientific) && (
              <ImageLoad
                src={treeImages[scientific]?.imageURL}
                placeholder="placeholder.jpg"
              />
            )}
        </div>
        <div className="treepage__content-info">
          {tree &&
            Object.entries(tree).map(([key, value]) => {
              const cappedKey = capitalizeFirstLetter(key);
              // const cappedValue = formatWord(key, value);
              const tagVariant = getTagVariant(value);

              switch (key) {
                case 'common':
                  return (
                    <div className="treepage__content-info-header" key={key}>
                      <h1>{toTitleCase(value)}</h1>
                    </div>
                  );
                case 'scientific':
                  return (
                    <div
                      className="treepage__content-info-header scientific"
                      key={key}
                    >
                      <h3>{formatScientificName(value)}</h3>
                    </div>
                  );
                case 'genus':
                  return null;
                case 'deciduousEvergreen':
                  return (
                    <Tag variant={tagVariant} key={key}>
                      {value}
                    </Tag>
                  );
                case 'url':
                  return null;
                case 'QRCode':
                  return null;
                default:
                  return (
                    <div className="treepage__content-info-item" key={key}>
                      <label className="treepage__content-info-item-label">
                        {cappedKey}:
                      </label>{' '}
                      {value}
                    </div>
                  );
              }
            })}
          <WikipediaExtract extract={wikipediaExtract} />
          <div className="treepage__content-info-item">
            <CSVLink data={data} filename={csvFileName}>
              <WttButton
                aria-label="Download CSV"
                type="button"
                colorClass="wttbuttons__black"
              >
                <Download
                  color="gray"
                  fontSize="large"
                  aria-label="Download CSV"
                  sx={{ className: 'wttbuttons__icon', paddingRight: '0.5rem' }}
                />
                {name}
              </WttButton>
            </CSVLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export const WikipediaExtract = ({ extract }) => {
  if (!extract) return null;
  return (
    <div className="treepage__content-info-item">
      <label className="treepage__content-info-item-label" htmlFor={extract}>
        <h3>Summary</h3>
      </label>{' '}
      <p>{extract}</p>
    </div>
  );
};
