import '@testing-library/jest-dom/extend-expect';
import {
  fireEvent,
  getAllByLabelText,
  render,
  screen,
} from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Card } from '@/components/Card/Card';
import SubHeader from '@/components/SubHeader/SubHeader';
import { Tag } from '@/components/Tag/Tag';
import { ImageLoad } from '@/pages/Tree/TreeImage';
import TreeList from '@/pages/TreeList/TreeList';
import { dataSources } from '@/pages/TreeList/dataArrays';

/**
 * These snapshots are designed to catch _any_ change to UI components, so they
 * are by definition very brittle. If the changes are related to your changes
 * and look expected, update these snapshots with `npm test -- -u`
 */

describe('<TreeList/> spec', () => {
  beforeEach(() => {
    render(
      <Router>
        <TreeList />
      </Router>,
    );
  });

  it('renders TreeList correctly and creates snapshot', () => {
    const treeList = render(
      <Router>
        <TreeList />
      </Router>,
    );
    expect(treeList).toMatchSnapshot();
  });

  test('renders TreeList component', () => {
    expect(screen.getByText(/license/i)).toBeInTheDocument();
  });

  test('switches between card and list views', () => {
    const viewSwitcher = screen.getByLabelText('card');
    fireEvent.click(viewSwitcher);
    expect(screen.getByLabelText('list')).toBeInTheDocument();

    fireEvent.click(viewSwitcher);
    expect(screen.getByLabelText('card')).toBeInTheDocument();
  });

  test('filters data based on search input', () => {
    const mockProps = {
      search: 'Apple Glue',
      onChange: jest.fn(),
      placeholder: 'Search trees',
    };
    const input = screen.getByPlaceholderText(mockProps.placeholder);
    fireEvent.change(input, { target: { value: mockProps.search } });
    // console.log('searchInput', searchInput);
    // expect(screen.getByText('no results')).toBeInTheDocument();
    // const input = getByPlaceholderText('Search trees');
    expect(input.value).toBe(mockProps.search);
  });

  // test('passes the required props to TreeListHeader', () => {
  //   const setFilteredData = jest.fn();
  //   const setSelectedDataSourceIndex = jest.fn();
  //   const setView = jest.fn();
  //   const setSearch = jest.fn();
  //   const setShowMore = jest.fn();

  //   const selectedDataSourceIndex = 0;
  //   const data = [];
  //   const view = 'list';
  //   const search = '';
  //   const showMore = true;

  //   const { getAllByTestId } = render(
  //     <SubHeader
  //       setFilteredData={setFilteredData}
  //       setSelectedDataSourceIndex={setSelectedDataSourceIndex}
  //       selectedDataSourceIndex={selectedDataSourceIndex}
  //       data={data}
  //       view={view}
  //       setView={setView}
  //       search={search}
  //       setSearch={setSearch}
  //       showMore={showMore}
  //       setShowMore={setShowMore}
  //     />,
  //   );

  //   const treeListHeader = getAllByLabelText('subheader');
  //   expect(treeListHeader).toHaveAttribute('data-select', JSON.stringify(data));
  //   expect(treeListHeader).toHaveAttribute('view', view);
  //   expect(treeListHeader).toHaveAttribute('searchbar', search);
  //   expect(treeListHeader).toHaveAttribute(
  //     'showmore',
  //     JSON.stringify(showMore),
  //   );
  // });

  // test('toggle showMore prop when Button triggers setShowMore', () => {
  //   const setShowMore = jest.fn();

  //   const showMore = false;

  //   const { getByTestId } = render(
  //     <SubHeader showMore={showMore} setShowMore={setShowMore} />,
  //   );

  //   const treeListHeader = getByTestId('ArrowDropDownIcon');
  //   fireEvent.click(treeListHeader);
  //   expect(setShowMore).toHaveBeenCalledTimes(1);
  // });

  // Add more tests as needed.
});
