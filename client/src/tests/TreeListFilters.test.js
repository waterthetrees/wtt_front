import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// import { toBeInTheDocument } from '@testing-library/jest-dom';
import TreeListFilters from '@/pages/TreeList/TreeListFilters';
import { dataSources } from '@/pages/TreeList/dataArrays';

/**
 * These snapshots are designed to catch _any_ change to UI components, so they
 * are by definition very brittle. If the changes are related to your changes
 * and look expected, update these snapshots with `npm test -- -u`
 */

// Mock localStorage for testing
const localStorageMock = (function () {
  let store = {};
  return {
    getItem: function (key) {
      return store[key] || null;
    },
    setItem: function (key, value) {
      store[key] = value.toString();
    },
    clear: function () {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const mockSetCheckboxes = jest.fn(() => {});
const mockSetSelectedDataSourceIndex = jest.fn(() => {});
const mockSetSearch = jest.fn(() => {});
const setFilteredData = jest.fn(() => {});
const mockCheckboxes = { small: false, evergreen: true, medium: true };

describe('<TreeListFilters /> spec', () => {
  afterEach(() => {
    localStorage.clear();
  });

  const defaultProps = {
    setFilteredData: jest.fn(),
    data: [],
    search: '',
    setCheckboxes: jest.fn(),
    checkboxes: {},
  };

  it('renders TreeListFilters correctly', () => {
    const { data } = dataSources[0];

    const treeListFilters = render(
      <Router>
        <TreeListFilters
          checkboxes={mockCheckboxes}
          setCheckboxes={mockSetCheckboxes}
          search={'Apple'}
          setSearch={mockSetSearch}
          selectedDataSourceIndex={0}
          setSelectedDataSourceIndex={mockSetSelectedDataSourceIndex}
          setFilteredData={setFilteredData}
          data={data}
        />
      </Router>,
    );
    expect(treeListFilters).toMatchSnapshot();
  });

  it(' TreeListFilters handles input changes correctly', () => {
    const { data } = dataSources[0];

    const { queryByTestId, getByLabelText } = render(
      <Router>
        <TreeListFilters
          checkboxes={mockCheckboxes}
          setCheckboxes={mockSetCheckboxes}
          search={'Apple'}
          setSearch={mockSetSearch}
          selectedDataSourceIndex={0}
          setSelectedDataSourceIndex={mockSetSelectedDataSourceIndex}
          setFilteredData={setFilteredData}
          data={data}
        />
      </Router>,
    );
    expect(queryByTestId('test')).not.toBeInTheDocument();

    const checkbox = getByLabelText('small');
    expect(checkbox).toBeInTheDocument();
  });

  test('renders filter groups and options', () => {
    const { getByText } = render(<TreeListFilters {...defaultProps} />);

    expect(getByText('Height')).toBeInTheDocument();
    expect(getByText('small')).toBeInTheDocument();
    expect(getByText('medium')).toBeInTheDocument();
    expect(getByText('large')).toBeInTheDocument();
    expect(getByText('Dormancy')).toBeInTheDocument();
    expect(getByText('evergreen')).toBeInTheDocument();
    expect(getByText('deciduous')).toBeInTheDocument();
  });

  test('handles checkbox changes', () => {
    const { getByLabelText } = render(<TreeListFilters {...defaultProps} />);
    const smallCheckbox = getByLabelText('small');

    fireEvent.click(smallCheckbox);

    const localStore = localStorage.getItem('checkboxes');
    expect(defaultProps.setCheckboxes).toHaveBeenCalled();
    expect(localStore).toBeTruthy();
    expect(defaultProps.setFilteredData).toHaveBeenCalled();
  });
});
