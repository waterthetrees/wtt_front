import React from 'react';
import { render } from '@testing-library/react';

import * as stories from '../pages/Tree/Tree.stories';
import { composeStories } from '@storybook/react';
const { TreeWithPanelDrawer, TreeWithScrollableDialog } =
  composeStories(stories);

/**
 * These snapshots are designed to catch _any_ change to UI components, so they
 * are by definition very brittle. If the changes are related to your changes
 * and look expected, update these snapshots with `npm test -- -u`
 */

describe('<Tree /> spec', () => {
  it('renders with PanelDrawer correctly', () => {
    const tree = render(<TreeWithPanelDrawer />);
    expect(tree).toMatchSnapshot();
  });

  it('renders with ScrollableDialog correctly', () => {
    const tree = render(<TreeWithScrollableDialog />);
    expect(tree).toMatchSnapshot();
  });
});
