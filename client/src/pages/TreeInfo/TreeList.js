import React from 'react';
import { Card } from '../../components/Cards/Card';
import { NavLink } from 'react-router-dom';
import treeImages from '@/data/dist/treeImages.json';
import { ImageLoad } from '@/pages/Tree/TreeImage';
import { Tag } from '@/components/Tag/Tag';
import { dataSources } from '@/pages/Data/dataArrays';
import './TreeInfo.scss';
const routeName = 'treeinfo';

const HEADING_TEXT = `We encourage you to plant medium and larger-sized trees, as they
provide greater benefits to the city than smaller trees. Young trees
require 1.5 inches of rain or 25 gallons of water per week for the
first three years to establish their roots.`;

export default function TreeList({ data, selectedDataSourceIndex }) {
  return (
    <div className="treeinfolist">
      <div className="treeinfolist__container">
        <div className="treeinfolist__header">
          <Card>
            <h3>{HEADING_TEXT}</h3>
            <div className="treecare">
              <a
                href={dataSources[selectedDataSourceIndex].treecare}
                target="_blank"
                className="treeinfolist__link"
                rel="noreferrer"
              >
                Tree Care Program
              </a>
            </div>
          </Card>
        </div>

        {data.map((tree, index) => {
          const nameFormatted = tree?.common?.toLowerCase().replace(/ /g, '-');
          const urlRoute = `/${routeName}/${nameFormatted}`;
          const {
            notes,
            scientific,
            common,
            icon,
            height,
            deciduousEvergreen,
          } = tree;
          const scientificName = scientific?.split(' ').join('-');
          const tagVariant =
            deciduousEvergreen === 'deciduous' ? 'brown' : 'green';

          return (
            <NavLink
              className="treeinfolist__link"
              to={{
                pathname: urlRoute,
              }}
              state={{ tree, selectedDataSourceIndex }}
              key={`${tree?.scientific}-${index}`}
            >
              <Card>
                <div className="treeinfolist__image">
                  {scientific &&
                    Object.prototype.hasOwnProperty.call(
                      treeImages,
                      scientific,
                    ) && (
                      <ImageLoad
                        src={`../../assets/images/data/${scientificName}.jpg`}
                        placeholder="placeholder.jpg"
                      />
                    )}
                </div>
                <h2>{common}</h2>
                <h4>{scientific}</h4>
                <div className="treeinfolist__item">{height}</div>
                {deciduousEvergreen && (
                  <Tag variant={tagVariant}>{deciduousEvergreen}</Tag>
                )}
              </Card>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
