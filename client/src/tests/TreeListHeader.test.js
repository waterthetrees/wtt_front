import React from 'react';
import { render } from '@testing-library/react';
import TreeListHeader from '@/pages/TreeList/TreeListHeader';
import { dataSources } from '@/pages/TreeList/dataArrays';

/**
 * These snapshots are designed to catch _any_ change to UI components, so they
 * are by definition very brittle. If the changes are related to your changes
 * and look expected, update these snapshots with `npm test -- -u`
 */

const mockSetSelectedDataSourceIndex = jest.fn(() => {});
const mockSetView = jest.fn(() => {});
const mockSetSearch = jest.fn(() => {});
const mockSetShowMore = jest.fn(() => {});
const setFilteredData = jest.fn(() => {});

describe('<TreeListHeader/> spec', () => {
  it('renders TreeListHeader correctly', () => {
    const { data } = dataSources[0];
    const checkboxes = {};

    const treeListHeader = render(
      <TreeListHeader
        search={'Apple'}
        setSearch={mockSetSearch}
        selectedDataSourceIndex={0}
        setSelectedDataSourceIndex={mockSetSelectedDataSourceIndex}
        setFilteredData={setFilteredData}
        data={data}
        view={'card'}
        setView={mockSetView}
        showMore={true}
        setShowMore={mockSetShowMore}
      />,
    );
    expect(treeListHeader).toMatchSnapshot();
  });
});
