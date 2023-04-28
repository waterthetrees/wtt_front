import { ArrowBack, Download } from '@mui/icons-material';
import React from 'react';
import { CSVLink } from 'react-csv';
import { Link, useLocation } from 'react-router-dom';

import { WttButton } from '@/components/Button/Button';
import { Tag } from '@/components/Tag/Tag';
import treeImages from '@/data/dist/treeImages.json';
import { ImageLoad } from '@/pages/Tree/TreeImage';

import { dataSources } from './dataArrays';

import './TreeList.scss';

export const formatWord = (word) => {
  if (!word) return '';
  if (!word.includes(' ')) return word.at(0).toUpperCase() + word.slice(1);
  let wordFormatted = word.toLowerCase();
  wordFormatted = wordFormatted.at(0).toUpperCase() + wordFormatted.slice(1);
  return wordFormatted.replace(/-/g, ' ');
};

export const getTagVariant = (value) =>
  value === 'deciduous' ? 'brown' : 'green';

export default function TreePage() {
  const { state } = useLocation();
  const { tree, selectedDataSourceIndex } = state;
  const { scientific } = tree;
  const formattedScientific = formatWord(scientific);
  const dataSelected = dataSources[selectedDataSourceIndex];
  const { data, name } = dataSelected;
  const csvFileName = `${name.replaceAll(' ', '-')}.csv`;
  const wikipediaExtract =
    treeImages[formattedScientific]?.content ||
    treeImages[formattedScientific]?.extract ||
    '';
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
              const cappedKey = formatWord(key);
              const cappedValue = formatWord(value);
              const tagVariant = getTagVariant(value);

              switch (key) {
                case 'common':
                  return (
                    <div className="treepage__content-info-header" key={key}>
                      <h1>{cappedValue}</h1>
                    </div>
                  );
                case 'scientific':
                  return (
                    <div className="treepage__content-info-header" key={key}>
                      <h3>{cappedValue}</h3>
                    </div>
                  );
                case 'genus':
                  return (
                    <div className="treepage__content-info-header" key={key}>
                      <h4>{cappedValue}</h4>
                    </div>
                  );
                case 'deciduousEvergreen':
                  return (
                    <Tag variant={tagVariant} key={key}>
                      {cappedValue}
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
