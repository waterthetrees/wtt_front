import { topTreesCaliforniaNative } from '@/data/dist/topTreesCaliforniaNative';
import { topTreesSanFrancisco } from '@/data/dist/topTreesSanFrancisco';
import { topTreesUSFood } from '@/data/dist/topTreesUSFood';

const dataColumns = [
  {
    columnHeader: 'common',
    label: 'Common',
  },
  {
    columnHeader: 'scientific',
    label: 'Scientific',
  },
  {
    columnHeader: 'height',
    label: 'Height',
  },
  {
    columnHeader: 'deciduousEvergreen',
    label: 'Dormancy',
  },
  {
    columnHeader: 'notes',
    label: 'Notes',
  },
];

// TODO rename this to treelists so it doesn't get confused with sources
export const dataSources = [
  {
    name: 'Native California Trees',
    data: topTreesCaliforniaNative,
    columns: dataColumns.slice(0, 4),
    url: 'https://calscape.org/loc-California/cat-Trees/ord-popular?srchcr=sc60ef7918b1949',
    thanks: '©calscape.org',
    treecare: '/treecare',
    target: '_self',
  },
  {
    name: 'Food Trees',
    data: topTreesUSFood,
    columns: dataColumns.slice(0, 2),
    url: 'https://fallingfruit.org',
    thanks: '©FallingFruit.org',
    treecare: '/treecare',
    target: '_self',
  },
  {
    name: 'San Francisco Street Trees',
    data: topTreesSanFrancisco,
    columns: dataColumns.slice(0, 5),
    url: 'https://www.fuf.net/',
    thanks: '©fuf.net',
    treecare: 'https://www.friendsoftheurbanforest.org/tree-care',
    target: '_blank',
  },
];
