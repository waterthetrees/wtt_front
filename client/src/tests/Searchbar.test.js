import React from 'react';
import { render } from '@testing-library/react';
import Searchbar from '@/components/Search/SearchBar';

/**
 * These snapshots are designed to catch _any_ change to UI components, so they
 * are by definition very brittle. If the changes are related to your changes
 * and look expected, update these snapshots with `npm test -- -u`
 */

const mockOptions = [
  {
    label: 'Milwaukee Ave',
    type: 'Results',
    address:
      '825 South Milwaukee Avenue, Wheeling, Illinois 60090, United States',
    id: 'address.7464624790403620',
    coords: [-87.910299, 42.144504],
  },
  {
    label: 'Milwaukee Ave',
    type: 'Results',
    address:
      '825 South Milwaukee Avenue, Wheeling, Illinois 60090, United States',
    id: 'address.7464624790403620',
    coords: [-87.910299, 42.144504],
  },
  {
    label: 'Milwaukee Ave',
    type: 'Recent',
    address: '825 Milwaukee Ave, Deerfield, Illinois 60015, United States',
    id: 'address.4356035406756260',
    coords: [-87.921434, 42.166602],
  },
];

describe('<Searchbar /> snapshot specs', () => {
  it('renders with PanelDrawer correctly', () => {
    const searchBar = render(<Searchbar options={mockOptions} />);
    expect(searchBar).toMatchSnapshot();
  });
});
