import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import { toBeInTheDocument } from '@testing-library/jest-dom';
import TreeListCheckboxes from '@/pages/TreeList/TreeListCheckboxes';
import { dataSources } from '@/pages/TreeList/dataArrays';
import { BrowserRouter as Router } from 'react-router-dom';

/**
 * These snapshots are designed to catch _any_ change to UI components, so they
 * are by definition very brittle. If the changes are related to your changes
 * and look expected, update these snapshots with `npm test -- -u`
 */

const mockSetCheckboxes = jest.fn(() => {});
const mockSetSelectedDataSourceIndex = jest.fn(() => {});
const mockSetSearch = jest.fn(() => {});
const setFilteredData = jest.fn(() => {});
const mockCheckboxes = { small: false, evergreen: true, medium: true };

describe('<TreeListCheckboxes /> spec', () => {
  it('renders TreeListCheckboxes correctly', () => {
    const { data } = dataSources[0];

    const treeListCheckboxes = render(
      <Router>
        <TreeListCheckboxes
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
    expect(treeListCheckboxes).toMatchSnapshot();
  });

  it(' TreeListCheckboxes handles input changes correctly', () => {
    const { data } = dataSources[0];

    const { queryByTestId, getByLabelText } = render(
      <Router>
        <TreeListCheckboxes
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

    // expect(checkbox.checked).toEqual(false);
    // const checkbox = getByTestId('small');
    // expect(checkbox.checked).toEqual(false);
    // fireEvent.click(checkbox);

    // console.log('checkbox.checked', checkbox.checked, checkbox);
    // expect(checkbox.checked).toEqual(true);
    // screen.getByLabelText('small', { exact: false }); // ignore case
    // screen.getByLabelText('small', { exact: false }); // ignore case
    // screen.getByLabelText('small', { exact: false }); // ignore case
    // screen.getByLabelText('small', { exact: false }); // ignore case
    // screen.getByLabelText('small', { exact: false }); // ignore case
  });
});
