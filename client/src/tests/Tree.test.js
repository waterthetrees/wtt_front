import React from 'react';
import { render } from '@testing-library/react';
import PanelDrawer from '../components/PanelDrawer/PanelDrawer';
import ScrollableDialog from '../components/ScrollableDialog/ScrollableDialog';
import Tree from '../pages/Tree/Tree';

const drawerWidth = 350;
const mockTreeData = {};
const mockTreeId = 420;
const mockSetCurrentTreeId = jest.fn(() => {});

describe('<Tree /> spec', () => {
  it('renders with PanelDrawer correctly', () => {
    const treeDetailsContainer = PanelDrawer;
    const tree = render(
      <Tree
        TreeDetailsContainer={treeDetailsContainer}
        drawerWidth={drawerWidth}
        currentTreeData={mockTreeData}
        currentTreeId={mockTreeId}
        setCurrentTreeId={mockSetCurrentTreeId}
        isTreeQueryError={false}
      />,
    );
    expect(tree).toMatchSnapshot();
  });

  it('renders with ScrollableDialog correctly', () => {
    const treeDetailsContainer = ScrollableDialog;
    const tree = render(
      <Tree
        TreeDetailsContainer={treeDetailsContainer}
        drawerWidth={drawerWidth}
        currentTreeData={mockTreeData}
        currentTreeId={mockTreeId}
        setCurrentTreeId={mockSetCurrentTreeId}
        isTreeQueryError={false}
      />,
    );
    expect(tree).toMatchSnapshot();
  });
});
