import React from 'react';
import { render } from '@testing-library/react';
import TreeList from '@/pages/TreeList/TreeList';
import { BrowserRouter as Router } from 'react-router-dom';

/**
 * These snapshots are designed to catch _any_ change to UI components, so they
 * are by definition very brittle. If the changes are related to your changes
 * and look expected, update these snapshots with `npm test -- -u`
 */

describe('<TreeList/> spec', () => {
  it('renders TreeList correctly', () => {
    // const { data } = dataSources[0];

    const treeList = render(
      <Router>
        <TreeList />
      </Router>,
    );
    expect(treeList).toMatchSnapshot();
  });
});
