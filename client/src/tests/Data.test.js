import React from 'react';
import { render } from '@testing-library/react';
import DataHeader from '@/pages/Data/DataHeader';

/**
 * These snapshots are designed to catch _any_ change to UI components, so they
 * are by definition very brittle. If the changes are related to your changes
 * and look expected, update these snapshots with `npm test -- -u`
 */

const mockSetSelectedDataSourceIndex = jest.fn(() => {});
const mockSetSearch = jest.fn(() => {});

describe('<Data/> spec', () => {
  it('renders Data Header correctly', () => {
    const dataHeader = render(
      <DataHeader
        search={'Apple'}
        setSearch={mockSetSearch}
        selectedDataSourceIndex={0}
        setSelectedDataSourceIndex={mockSetSelectedDataSourceIndex}
      />,
    );
    expect(dataHeader).toMatchSnapshot();
  });
});
