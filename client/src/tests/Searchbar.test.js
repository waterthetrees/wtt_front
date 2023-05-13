import Searchbar from '@/components/Search/SearchBar';
import { render } from '@testing-library/react';
import React from 'react';

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
    placeType: 'address',
  },
  {
    label: 'Milwaukee Ave',
    type: 'Results',
    address:
      '825 South Milwaukee Avenue, Wheeling, Illinois 60090, United States',
    id: 'address.7464624790403620',
    coords: [-87.910299, 42.144504],
    placeType: 'address',
  },
  {
    label: 'Milwaukee Ave',
    type: 'Recent',
    address: '825 Milwaukee Ave, Deerfield, Illinois 60015, United States',
    id: 'address.4356035406756260',
    coords: [-87.921434, 42.166602],
    placeType: 'address',
  },
];

describe('<Searchbar /> snapshot specs', () => {
  it('renders correctly', () => {
    const searchBar = render(<Searchbar options={mockOptions} />);
    expect(searchBar).toMatchSnapshot();
  });
});
