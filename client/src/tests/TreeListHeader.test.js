import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import TreeListHeader, {
  filterData,
  filterOptions,
  getActiveFilters,
} from '@/pages/TreeList/TreeListHeader';
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

const defaultProps = {
  setFilteredData: jest.fn(),
  setSelectedDataSourceIndex: jest.fn(),
  selectedDataSourceIndex: 0,
  data: [],
  view: 'list',
  setView: jest.fn(),
  search: '',
  setSearch: jest.fn(),
  showMore: true,
  setShowMore: jest.fn(),
};

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

  test('renders the TreeListHeader component', () => {
    render(<TreeListHeader {...defaultProps} />);
    expect(screen.getByPlaceholderText('Search trees')).toBeInTheDocument();
  });

  test('should change data source when selected', () => {
    render(<TreeListHeader {...defaultProps} />);
    const selectElement = screen.getByText('Native California Trees');
    fireEvent.mouseDown(selectElement);
    const menuItem = screen.getByText('Food Trees');
    fireEvent.click(menuItem);
    expect(defaultProps.setSelectedDataSourceIndex).toHaveBeenCalledWith(1);
  });

  test('should update search value when input changes', () => {
    render(<TreeListHeader {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText('Search trees');
    fireEvent.change(searchInput, { target: { value: 'oak' } });
    expect(defaultProps.setSearch).toHaveBeenCalledWith('oak');
  });

  test('should toggle view when clicked', () => {
    render(<TreeListHeader {...defaultProps} />);
    const toggleButton = screen.getByTestId('list-toggle-button');
    fireEvent.click(toggleButton);
    expect(defaultProps.setView).toHaveBeenCalled();
  });

  // test('should show or hide additional filters when show more button is clicked', () => {
  //   render(<TreeListHeader {...defaultProps} showMore={false} />);
  //   const showMoreButton = screen.getByTestId('button-showhide');
  //   fireEvent.click(showMoreButton);
  //   expect(defaultProps.setShowMore).toHaveBeenCalledWith(true);
  // });

  test('getActiveFilters should return active filters from checkboxes', () => {
    const checkboxes = {
      small: true,
      medium: false,
      large: true,
      evergreen: false,
      deciduous: true,
    };
    const expectedOutput = {
      height: ['small', 'large'],
      deciduousEvergreen: ['deciduous'],
    };
    expect(getActiveFilters(checkboxes)).toEqual(expectedOutput);
  });

  test('filterData should return filtered array based on checkboxes and subset of data', () => {
    // searching only subset of data here as it gets narrowed down by search
    const array = [
      { height: 'small', deciduousEvergreen: 'evergreen' },
      { height: 'medium', deciduousEvergreen: 'evergreen' },
    ];
    const checkboxes = {
      small: true,
      large: true,
      evergreen: true,
    };
    const expectedOutput = [
      { height: 'small', deciduousEvergreen: 'evergreen' },
    ];
    expect(filterData(array, checkboxes)).toEqual(expectedOutput);
  });

  test('filterOptions should return an array of checked options', () => {
    const checkboxes = {
      small: true,
      medium: false,
      large: true,
      evergreen: false,
      deciduous: true,
    };
    const options = ['evergreen', 'deciduous'];
    const expectedOutput = ['deciduous'];
    expect(filterOptions(checkboxes, options)).toEqual(expectedOutput);
  });

  // test('renders data source menu items', () => {
  //   render(<TreeListHeader {...defaultProps} />);
  //   const selectElement = screen.getByRole('button');
  //   fireEvent.mouseDown(selectElement);
  //   dataSources.forEach(({ name }) => {
  //     expect(screen.getByText(name)).toBeInTheDocument();
  //   });
  // });

  test('should render Toggle component when showMore is true', () => {
    render(<TreeListHeader {...defaultProps} />);
    const toggleComponent = screen.getByTestId('list-toggle-button');
    expect(toggleComponent).toBeInTheDocument();
  });
});
