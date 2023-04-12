import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import treeImages from '@/data/dist/treeImages.json';
import './TreeList.scss';
import { ImageLoad } from '@/pages/Tree/TreeImage';
import { dataSources } from '@/pages/Data/dataArrays';
// import DownloadIcon from '@mui/icons-material/Download';
import { ArrowBack, Download } from '@mui/icons-material';
// import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import { CSVLink } from 'react-csv';
import { WttButton } from '@/components/Button/Button';
import { Tag } from '@/components/Tag/Tag';

const capFirstLetterAndSpace = (word) =>
  word.at(0).toUpperCase() + word.slice(1).replace(/-/g, ' ');

export default function TreePage() {
  const { state } = useLocation();
  const { tree, selectedDataSourceIndex } = state;
  const { scientific } = tree;
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
              const cappedKey = capFirstLetterAndSpace(key);
              const cappedValue = capFirstLetterAndSpace(value);
              const tagVariant = value === 'deciduous' ? 'brown' : 'green';

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
          {wikipediaExtract && (
            <div className="treepage__content-info-item">
              <label
                className="treepage__content-info-item-label"
                htmlFor={wikipediaExtract}
              >
                <h3>Summary</h3>
              </label>{' '}
              <p>{wikipediaExtract}</p>
            </div>
          )}
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
