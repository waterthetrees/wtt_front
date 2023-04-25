import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import TreeList from '@/pages/TreeList/TreeList';

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
    const viewSwitcher = screen.getByLabelText('View Switcher');
    fireEvent.click(viewSwitcher);
    expect(screen.getByLabelText('List View')).toBeInTheDocument();

    fireEvent.click(viewSwitcher);
    expect(screen.getByLabelText('Card View')).toBeInTheDocument();
  });

  test('filters data based on search input', () => {
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'searchTerm' } });

    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  test('toggles Show More button', () => {
    const showMoreButton = screen.getByText('Show More');
    fireEvent.click(showMoreButton);

    expect(screen.getByText('Show Less')).toBeInTheDocument();
  });

  // Add more tests as needed.
});
