import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';
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
    expect(input.value).toBe(mockProps.search);
  });
});
