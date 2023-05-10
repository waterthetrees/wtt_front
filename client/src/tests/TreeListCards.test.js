import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import TreeListCards from '@/pages/TreeList/TreeListCards';
import { dataSources } from '@/pages/TreeList/dataArrays';

/**
 * These snapshots are designed to catch _any_ change to UI components, so they
 * are by definition very brittle. If the changes are related to your changes
 * and look expected, update these snapshots with `npm test -- -u`
 */

describe('<TreeListCards /> spec', () => {
  it('renders TreeListCards correctly', () => {
    const { data } = dataSources[0];
    const filteredData = data.slice(0, 2);

    const treeListCards = render(
      <Router>
        <TreeListCards data={filteredData} selectedDataSourceIndex={0} />
      </Router>,
    );
    expect(treeListCards).toMatchSnapshot();
  });
});
