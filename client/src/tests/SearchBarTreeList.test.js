import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SearchBar, searchArray } from '@/components/SearchBar/SearchBar';

/**
 * These snapshots are designed to catch _any_ change to UI components, so they
 * are by definition very brittle. If the changes are related to your changes
 * and look expected, update these snapshots with `npm test -- -u`
 */

const mockProps = {
  style: {
    div: {
      width: 'max-content',
      borderRadius: '4px',
      fontSize: 'large',
    },
    input: { borderRadius: '4px', width: '100%' },
  },
  search: 'Apple',
  onChange: jest.fn(),
  placeholder: 'Search trees',
};

describe('<Searchbar /> snapshot specs', () => {
  it('renders correctly', () => {
    const searchBar = render(<SearchBar {...mockProps} />);
    expect(searchBar).toMatchSnapshot();
  });

  test('renders correctly', () => {
    const { getByPlaceholderText } = render(<SearchBar {...mockProps} />);
    expect(getByPlaceholderText('Search trees')).toBeInTheDocument();
  });

  test('handles onChange event', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar placeholder="Search here" onChange={handleChange} />,
    );
    const input = getByPlaceholderText('Search here');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('input value is updated correctly', () => {
    const { getByPlaceholderText } = render(<SearchBar {...mockProps} />);
    const input = getByPlaceholderText('Search trees');
    expect(input.value).toBe('Apple');
  });
});

describe('searchArray', () => {
  const data = [
    { commonName: 'Golden Apple', dbh: 5 },
    { commonName: 'Pear', dbh: 20 },
    { commonName: 'Red Maple', dbh: 7 },
  ];

  test('filters array based on search term', () => {
    const searchTerm = 'Golden Apple';
    const filteredData = searchArray(data, searchTerm);
    expect(filteredData).toHaveLength(1);
    expect(filteredData[0].commonName).toBe('Golden Apple');
  });

  test('returns an empty array if no match found', () => {
    const searchTerm = 'Black Walnut';
    const filteredData = searchArray(data, searchTerm);
    expect(filteredData).toHaveLength(0);
  });
});
