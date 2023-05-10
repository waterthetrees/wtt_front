import useMediaQuery from '@mui/material/useMediaQuery';
import clsx from 'clsx';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { Tag } from '@/components/Tag/Tag';
import { ImageLoad, setFormatImagePath } from '@/pages/Tree/TreeImage';
import { formatScientificName, toTitleCase } from '@/util/stringUtils';

import { Card } from '../../components/Card/Card';
import { dataSources } from './dataArrays';

import './TreeList.scss';

const HEADING_TEXT = `We encourage you to plant medium and larger-sized trees, as they
provide greater benefits to the city than smaller trees. Young trees
require 1.5 inches of rain or 25 gallons of water per week for the
first three years to establish their roots.`;

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

const getColumnRows = (data, big, medium, small) => {
  let columnNumber = 4;
  if (big) {
    columnNumber = 4;
  }
  if (medium) {
    columnNumber = 3;
  }
  if (small) {
    columnNumber = 2;
  }
  const rowCounts = Math.ceil(data.length / columnNumber);
  const countRowColumns = clsx('treelistcards__container', {
    treelistcards__rowcolumns: {
      'column-count': columnNumber,
      height: rowCounts * 500,
    },
  });
  return countRowColumns;
};

export default function TreeListCards({ data, selectedDataSourceIndex }) {
  const big = useMediaQuery('(min-width: 769px)');
  const medium = useMediaQuery('(min-width: 601px)');
  const small = useMediaQuery('(min-width:481px)');
  const countRowColumns = getColumnRows(data, big, medium, small);

  return (
    <div className="treelistcards">
      <div className="treelistcards__header">
        <Card>
          <div className="treelistcards__info">
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
          </div>
        </Card>
      </div>
      <div className={countRowColumns}>
        {data.map((tree, index) => {
          const { scientific, common, height, deciduousEvergreen } = tree;
          const treeImagePath = setFormatImagePath(scientific);
          const dormancyLower = deciduousEvergreen
            ?.toLowerCase()
            .replace(/ /g, '-');
          const dormancyArray = dormancyLower.includes(',')
            ? dormancyLower?.split(',')
            : [dormancyLower];

          const formatCommon = toTitleCase(common);
          const formatScientific = formatScientificName(scientific);

          return (
            <NavLink
              className="treelistcards__link"
              to={{
                pathname: createTreePageRoute(tree),
              }}
              state={{ tree, selectedDataSourceIndex }}
              key={`${tree?.scientific}-${index}`}
            >
              <Card>
                {treeImagePath && (
                  <div className="treelistcards__image">
                    <ImageLoad
                      src={treeImagePath}
                      placeholder="placeholder.jpg"
                    />
                  </div>
                )}
                <div className="treelistcards__info">
                  <h2>{formatCommon}</h2>
                  <h4 className="scientific">{formatScientific}</h4>
                  <div className="treelistcards__item">{height}</div>
                  {deciduousEvergreen &&
                    dormancyArray.map((dormancy) => {
                      const tagVariant = getDormancyTagColor(dormancy);
                      return (
                        <Tag key={tagVariant} variant={tagVariant}>
                          {dormancy}
                        </Tag>
                      );
                    })}
                </div>
              </Card>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
