import { topTreesCaliforniaNative } from '@/data/dist/topTreesCaliforniaNative';
import { topTreesUSFood } from '@/data/dist/topTreesUSFood';
import { topTreesSanFrancisco } from '@/data/dist/topTreesSanFrancisco';

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
    label: 'Deciduous or Evergreen',
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
    thanks: 'Thanks to calscape.org for the California native tree data!',
  },
  {
    name: 'Food Trees',
    data: topTreesUSFood,
    columns: dataColumns.slice(0, 3),
    url: 'https://fallingfruit.org',
    thanks: 'Thanks to FallingFruit.org for the top US food tree data!',
  },
  {
    name: 'San Francisco Street Trees',
    data: topTreesSanFrancisco,
    columns: dataColumns.slice(0, 6),
    url: 'https://www.fuf.net/',
    thanks: 'Thanks to fuf.net for the top San Francisco street tree data!',
  },
];
