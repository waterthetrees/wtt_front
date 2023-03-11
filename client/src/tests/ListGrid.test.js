import React from 'react';
import { render } from '@testing-library/react';
import { ListGrid } from '@/components/ListGrid/ListGrid';

/**
 * These snapshots are designed to catch _any_ change to UI components, so they
 * are by definition very brittle. If the changes are related to your changes
 * and look expected, update these snapshots with `npm test -- -u`
 */

const mockSetOpenEdit = jest.fn(() => {});
const mockSetList = jest.fn(() => {});
const mockHandleNewEditSource = jest.fn(() => {});

function createColumnHeaders(source) {
  if (!source) return [];
  return [
    {
      columnHeader: 'idSourceName',
      label: '',
    },
    {
      columnHeader: 'broken',
      label: 'Up',
    },
    {
      columnHeader: 'city',
      label: 'Location',
    },
    {
      columnHeader: 'isoAlpha3',
      label: 'Country',
    },
    {
      columnHeader: 'state',
      label: 'State',
    },

    {
      columnHeader: 'email',
      label: 'Email',
    },
    {
      columnHeader: 'contact',
      label: 'Contact',
    },
    {
      columnHeader: 'phone',
      label: 'Phone',
    },

    {
      columnHeader: 'notes',
      label: 'Notes',
    },
  ];
}

const mockSources = [
  {
    idSourceName: 'rochester',
    isoAlpha3: 'USA',
    country: 'United States of America',
    state: 'NY',
    city: 'Rochester',
    email: null,
    contact: null,
    phone: null,
    info: 'http://hub.arcgis.com/datasets/RochesterNY::trees-open-data',
    download:
      'https://opendata.arcgis.com/datasets/4c209944e2984b4a908a14b0cbe48075_0.zip',
    notes: null,
    filename: null,
    format: 'zip',
    longitude: null,
    latitude: null,
    license: null,
    broken: true,
  },
  {
    idSourceName: 'richardson',
    isoAlpha3: 'USA',
    country: 'United States of America',
    state: 'TX',
    city: 'Richardson',
    email: null,
    contact: null,
    phone: null,
    info: 'http://hub.arcgis.com/datasets/richardson::trees',
    download:
      'https://opendata.arcgis.com/datasets/cd10a9e85354488dbdb697ce97ccb064_0.csv',
    notes: null,
    filename: null,
    format: null,
    longitude: null,
    latitude: null,
    license: null,
    broken: false,
  },
];

describe('<Source /> spec', () => {
  it('renders ListGrid correctly', () => {
    const columns = createColumnHeaders(mockSources);
    const sourceForm = render(
      <ListGrid
        data={mockSources}
        columns={columns}
        defaultSortIndex={0}
        handleNewEditSource={mockHandleNewEditSource}
        listType="source"
        setOpenEdit={mockSetOpenEdit}
        setList={mockSetList}
        openEdit={false}
      />,
    );
    expect(sourceForm).toMatchSnapshot();
  });
});
