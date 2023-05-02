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
    columnHeader: 'genus',
    label: 'Genus',
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

export const dataSources = [
  {
    name: 'Native California Trees',
    data: topTreesCaliforniaNative,
    columns: dataColumns.slice(0, 5),
    url: 'https://calscape.org/loc-California/cat-Trees/ord-popular?srchcr=sc60ef7918b1949',
    thanks: '©calscape.org',
    treecare: 'https://vimeo.com/416031708#t=5m35s',
  },
  {
    name: 'Food Trees',
    data: topTreesUSFood,
    columns: dataColumns.slice(0, 3),
    url: 'https://fallingfruit.org',
    thanks: '©FallingFruit.org',
    treecare: 'https://vimeo.com/416031708#t=5m35s',
  },
  {
    name: 'San Francisco Street Trees',
    data: topTreesSanFrancisco,
    columns: dataColumns.slice(0, 6),
    url: 'https://www.fuf.net/',
    thanks: '©fuf.net',
    treecare: 'https://www.friendsoftheurbanforest.org/tree-care',
  },
];
