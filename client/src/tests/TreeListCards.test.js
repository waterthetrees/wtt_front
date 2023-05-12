import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import TreeListCards, {
  Dormancy,
  getDormancyTagColor,
} from '@/pages/TreeList/TreeListCards';
import { dataSources } from '@/pages/TreeList/dataArrays';

/**
 * These snapshots are designed to catch _any_ change to UI components, so they
 * are by definition very brittle. If the changes are related to your changes
 * and look expected, update these snapshots with `npm test -- -u`
 */
const mockData = [
  {
    scientific: 'Quercus robur',
    common: 'English Oak',
    height: '20-30 feet',
    deciduousEvergreen: 'deciduous',
  },
  {
    scientific: 'Picea abies',
    common: 'Norway Spruce',
    height: '40-60 feet',
    deciduousEvergreen: 'evergreen',
  },
];

const mockDataSources = [
  {
    treecare: 'https://vimeo.com/416031708#t=5m35s',
  },
];

describe('TreeListCards component', () => {
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

  test('renders cards correctly', () => {
    render(
      <Router>
        <TreeListCards
          data={mockData}
          selectedDataSourceIndex={0}
          dataSources={mockDataSources}
        />
      </Router>,
    );

    // Check header card
    expect(screen.getByText(/we encourage you to plant/i)).toBeInTheDocument();
    expect(screen.getByText(/tree care program/i)).toHaveAttribute(
      'href',
      'https://vimeo.com/416031708#t=5m35s',
    );

    // Check tree cards
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3); // 2 tree cards + 1 Tree Care Program link
    expect(links[1]).toHaveAttribute('href', '/tree/quercus-robur');
    expect(links[2]).toHaveAttribute('href', '/tree/picea-abies');

    expect(screen.getByText('English Oak')).toBeInTheDocument();
    expect(screen.getByText('Norway Spruce')).toBeInTheDocument();
    expect(screen.getByText('20-30 feet')).toBeInTheDocument();
    expect(screen.getByText('40-60 feet')).toBeInTheDocument();
    expect(screen.getByText(/deciduous/i)).toBeInTheDocument();
    expect(screen.getByText(/evergreen/i)).toBeInTheDocument();
  });

  test('handles missing tree data gracefully', () => {
    const incompleteData = [
      {
        scientific: 'Quercus robur',
      },
    ];

    render(
      <Router>
        <TreeListCards
          data={incompleteData}
          selectedDataSourceIndex={0}
          dataSources={mockDataSources}
        />
      </Router>,
    );

    expect(screen.getByText(/we encourage you to plant/i)).toBeInTheDocument();
    expect(screen.getByText(/tree care program/i)).toHaveAttribute(
      'href',
      'https://vimeo.com/416031708#t=5m35s',
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2); // 1 tree card + 1 Tree Care Program link
    expect(links[1]).toHaveAttribute('href', '/tree/quercus-robur');
  });
});

describe('Dormancy component', () => {
  test('renders nothing if no valid string is provided', () => {
    render(<Dormancy deciduousEvergreen={null} />);
    expect(screen.queryByRole('tag')).not.toBeInTheDocument();

    render(<Dormancy deciduousEvergreen={123} />);
    expect(screen.queryByRole('tag')).not.toBeInTheDocument();

    render(<Dormancy />);
    expect(screen.queryByRole('tag')).not.toBeInTheDocument();
  });

  test('renders single dormancy tag', () => {
    render(<Dormancy deciduousEvergreen="Evergreen" />);
    const tag = screen.getByText('evergreen');
    expect(tag).toBeInTheDocument();
  });

  test('renders multiple dormancy tags', () => {
    render(<Dormancy deciduousEvergreen="Deciduous,Winter Deciduous" />);
    const deciduousTag = screen.getByText('deciduous');
    const evergreenTag = screen.getByText('winter-deciduous');
    expect(deciduousTag).toBeInTheDocument();
    expect(evergreenTag).toBeInTheDocument();
  });
});

describe('getDormancyTagColor', () => {
  it('returns green for evergreen', () => {
    expect(getDormancyTagColor('evergreen')).toBe('green');
  });

  it('returns brown for deciduous', () => {
    expect(getDormancyTagColor('deciduous')).toBe('brown');
  });

  it('returns blue for winter-deciduous', () => {
    expect(getDormancyTagColor('winter-deciduous')).toBe('blue');
  });

  it('returns brown for summer-deciduous', () => {
    expect(getDormancyTagColor('summer-deciduous')).toBe('brown');
  });

  it('returns brown for summer-semi-deciduous', () => {
    expect(getDormancyTagColor('summer-semi-deciduous')).toBe('brown');
  });

  it('returns black for unknown dormancy', () => {
    expect(getDormancyTagColor('unknown')).toBe('black');
  });

  it('returns black for no dormancy provided', () => {
    expect(getDormancyTagColor()).toBe('black');
  });
});
