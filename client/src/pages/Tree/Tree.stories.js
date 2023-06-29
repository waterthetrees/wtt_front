import React from 'react';
import Tree from './Tree';
import TreeChipList from './TreeChipList';
import PanelDrawer from '@/components/PanelDrawer/PanelDrawer';
import ScrollableDialog from '@/components/ScrollableDialog/ScrollableDialog';

const drawerWidth = 350;
const mockTreeData = {
  ref: '22101',
  address: '881 Jamestown Ave',
  dbh: '6',
  family: 'Eucalyptus sideroxylon',
  variety: 'Eucalyptus sideroxylon :: Red Ironbark',
  species: 'Eucalyptus sideroxylon',
  genus: 'Trachycarpus fortunei',
  common: 'Windmill Palm',
  scientific: 'Trachycarpus fortunei',
  owner: 'Private',
  id: '4984644562906934',
  sourceId: 'Sidewalk: Property side : Yard',
  city: 'San Francisco',
  iso_alpha_2: 'US',
  iso_alpha_3: 'USA',
  numeric_country_code: '840',
  country: 'United States',
  download:
    'https://data.sfgov.org/api/views/tkzw-k3nq/rows.csv?accessType=DOWNLOAD',
  info: 'https://data.sfgov.org/City-Infrastructure/Street-Tree-List/tkzw-k3nq',
  lat: 37.717466057201726,
  lng: -122.39179253152456,
  count: 1,
  state: 'California',
  zip: '58',
  neighborhood: '1',
  height: null,
  health: null,
  notes: null,
  planted: null,
  who: 'DPW Maintained ',
  email: 'urbanforestry@sfdpw.org',
  created: '2021-04-19T09:00:00.000Z',
  modified: '2022-07-01T00:00:00.000Z',
  idReference: '197998',
  waterFreq: 14,
  datePlanted: null,
  locationTreeCount: '1',
  plantingOpt1: null,
  plantingOpt2: null,
  plantingOpt3: null,
  healthNum: 6,
};
const mockTreeId = 420;
const mockSetCurrentTreeId = () => {};

export default {
  title: 'Tree',
  component: Tree,
};

export const TreeWithPanelDrawer = {
  args: {
    TreeDetailsContainer: PanelDrawer,
    drawerWidth: drawerWidth,
    currentTreeData: mockTreeData,
    currentTreeId: mockTreeId,
    setCurrentTreeId: mockSetCurrentTreeId,
    isTreeQueryError: false,
  },
};

export const TreeWithScrollableDialog = {
  args: {
    TreeDetailsContainer: ScrollableDialog,
    drawerWidth: drawerWidth,
    currentTreeData: mockTreeData,
    currentTreeId: mockTreeId,
    setCurrentTreeId: mockSetCurrentTreeId,
    isTreeQueryError: false,
  },
};

export const Chip = {
  name: 'Chip',
  render: () => <TreeChipList />,
}