import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { Tag } from '@/components/Tag/Tag';
import { ImageLoad, setFormatImagePath } from '@/pages/Tree/TreeImage';
import { formatScientificName, toTitleCase } from '@/util/stringUtils';

import { Card } from '../../components/Card/Card';
import { dataSources } from './dataArrays';

import './TreeList.scss';

const HEADING_TEXT = `We encourage you to plant medium and larger-sized trees, as they
provide greater benefits to the city than smaller trees. Young trees
require 1.5 inches of rain or 25 gallons of water per week for the
first three years to establish their roots. `;

export function getDormancyTagColor(dormancy) {
  switch (dormancy) {
    case 'evergreen':
      return 'green';
    case 'deciduous':
      return 'brown';
    case 'winter-deciduous':
      return 'blue';
    case 'summer-deciduous':
    case 'summer-semi-deciduous':
      return 'brown';
    default:
      return 'black';
  }
}

export const createTreePageRoute = (tree, routeName = 'tree') => {
  const nameFormatted = tree?.scientific?.toLowerCase().replace(/ /g, '-');
  return `/${routeName}/${nameFormatted}`;
};

export default function TreeListCards({ data, selectedDataSourceIndex }) {
  const { treecare, target } = dataSources[selectedDataSourceIndex];
  return (
    <div className="treelistcards">
      <div className="treelistcards__header">
        <h5 className="treelistcards__info">
          {HEADING_TEXT}
          <Link
            to={treecare}
            target={target}
            rel={'noopener noreferrer'}
            className="treelistcards__link"
          >
            Learn more about tree care.
          </Link>
        </h5>
      </div>
      <div className="treelistcards__container">
        {data.map((tree, index) => {
          const { scientific, common, height, deciduousEvergreen } = tree;
          const treeImagePath = setFormatImagePath(scientific);

          return (
            <NavLink
              className="treelistcards__link"
              to={{
                pathname: createTreePageRoute(tree),
              }}
              state={{ tree, selectedDataSourceIndex }}
              key={`${scientific}-${index}`}
            >
              <Card>
                {treeImagePath && (
                  <div className="treelistcards__image">
                    <ImageLoad src={treeImagePath} alt={scientific} />
                  </div>
                )}
                <div className="treelistcards__info">
                  <h2>{toTitleCase(common)}</h2>
                  <h4 className="scientific">
                    {formatScientificName(scientific)}
                  </h4>
                  <div className="treelistcards__item">{height}</div>
                  <Dormancy deciduousEvergreen={deciduousEvergreen} />
                </div>
              </Card>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export function Dormancy({ deciduousEvergreen }) {
  if (
    !deciduousEvergreen ||
    deciduousEvergreen === null ||
    typeof deciduousEvergreen !== 'string'
  ) {
    return null;
  }
  const dormancyLower = deciduousEvergreen?.replace(/ /g, '-').toLowerCase();
  // If more than one dormancy, split into array, otherwise create array with one item
  const dormancyArray = dormancyLower?.includes(',')
    ? dormancyLower?.split(',')
    : [dormancyLower];

  return dormancyArray.map((dormancy) => {
    const tagVariant = getDormancyTagColor(dormancy);
    return (
      <Tag key={tagVariant} variant={tagVariant}>
        {dormancy}
      </Tag>
    );
  });
}
