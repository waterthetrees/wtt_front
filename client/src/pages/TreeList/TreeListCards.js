import React from 'react';
import { Card } from '../../components/Card/Card';
import { NavLink } from 'react-router-dom';
import { ImageLoad, fixScientificForImage } from '@/pages/Tree/TreeImage';
import { Tag } from '@/components/Tag/Tag';
import { dataSources } from '@/pages/Data/dataArrays';
import './TreeList.scss';
const routeName = 'tree';

const HEADING_TEXT = `We encourage you to plant medium and larger-sized trees, as they
provide greater benefits to the city than smaller trees. Young trees
require 1.5 inches of rain or 25 gallons of water per week for the
first three years to establish their roots.`;

export default function TreeListCards({ data, selectedDataSourceIndex }) {
  return (
    <div className="treelistcards">
      <div className="treelistcards__container">
        <div className="treelistcards__header">
          <Card>
            <h3>{HEADING_TEXT}</h3>
            <div className="treecare">
              <a
                href={dataSources[selectedDataSourceIndex].treecare}
                target="_blank"
                className="treelistcards__link"
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
          const { scientific, common, height, deciduousEvergreen } = tree;
          const treeImagePath = fixScientificForImage(scientific);
          const tagVariant =
            deciduousEvergreen === 'deciduous' ? 'brown' : 'green';

          return (
            <NavLink
              className="treelistcards__link"
              to={{
                pathname: urlRoute,
              }}
              state={{ tree, selectedDataSourceIndex }}
              key={`${tree?.scientific}-${index}`}
            >
              <Card>
                <div className="treelistcards__image">
                  <ImageLoad
                    src={treeImagePath}
                    placeholder="placeholder.jpg"
                  />
                </div>
                <h2>{common}</h2>
                <h4>{scientific}</h4>
                <div className="treelistcards__item">{height}</div>
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
