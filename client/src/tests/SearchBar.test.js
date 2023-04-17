import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SearchBar, searchArray } from '@/components/SearchBar/SearchBar';

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
  const handleChange = jest.fn();

  it('renders correctly', () => {
    const searchBar = render(
      <SearchBar
        options={mockOptions}
        placeholder="Search here"
        onChange={handleChange}
      />,
    );
    expect(searchBar).toMatchSnapshot();
  });

  test('renders correctly', () => {
    const { getByPlaceholderText } = render(
      <SearchBar placeholder="Search here" onChange={handleChange} />,
    );
    expect(getByPlaceholderText('Search here')).toBeInTheDocument();
  });

  test('handles onChange event', () => {
    const { getByPlaceholderText } = render(
      <SearchBar placeholder="Search here" onChange={handleChange} />,
    );
    const input = getByPlaceholderText('Search here');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('input value is updated correctly', () => {
    const { getByPlaceholderText } = render(
      <SearchBar
        search="test value"
        placeholder="Search here"
        onChange={handleChange}
      />,
    );
    const input = getByPlaceholderText('Search here');
    expect(input.value).toBe('test value');
  });
});

describe('searchArray', () => {
  test('filters array based on search term', () => {
    const data = [
      { name: 'John', age: 25 },
      { name: 'Jane', age: 30 },
      { name: 'Doe', age: 35 },
    ];

    const searchTerm = 'Doe';
    const filteredData = searchArray(data, searchTerm);
    expect(filteredData).toHaveLength(1);
    expect(filteredData[0].name).toBe('Doe');
  });

  test('returns an empty array if no match found', () => {
    const data = [
      { name: 'John', age: 25 },
      { name: 'Jane', age: 30 },
      { name: 'Doe', age: 35 },
    ];

    const searchTerm = 'Smith';
    const filteredData = searchArray(data, searchTerm);
    expect(filteredData).toHaveLength(0);
  });
});
