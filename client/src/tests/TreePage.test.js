import { render, screen } from '@testing-library/react';
import React, { createContext, useContext } from 'react';
import {
  NavLink,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from 'react-router-dom';

import TreePage, {
  WikipediaExtract,
  formatWord,
  getTagVariant,
} from '@/pages/TreeList/TreePage';
import { dataSources } from '@/pages/TreeList/dataArrays';

const LocationContext = createContext();

export const useLocationMock = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationMock must be used within a LocationMock');
  }
  return context;
};

export const LocationMock = ({ children, value }) => {
  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useLocation: jest.fn(),
  };
});

/**
 * These snapshots are designed to catch _any_ change to UI components, so they
 * are by definition very brittle. If the changes are related to your changes
 * and look expected, update these snapshots with `npm test -- -u`
 */

const mockTree = {
  QRCode: '//calscape.org/qrcodes/Populus-fremontii(192)',
  availabilityInNurseries: 'Commonly Available',
  common: 'Fremont Cottonwood',
  commonUses: 'Bird Gardens,Butterfly Gardens',
  deciduousEvergreen: 'DECIDUOUS',
  drainage: 'Fast,Medium,Slow',
  easeOfCare: 'Very Easy',
  floweringSeason: 'Spring,Winter',
  flowers: 'White,Cream',
  genus: 'Populus',
  growthRate: 'Fast',
  height: '39.4 - 114.8 ft(12 - 35 m)',
  maxSummerIrrigation: 'Keep moist',
  plantType: 'Tree',
  popularityRanking: '19',
  scientific: 'Populus fremontii',
  soil: 'Accepts either sandy or clay soil as long as there is sufficient water',
  sun: 'Full Sun',
  url: '//calscape.org/Populus-fremontii-()',
  waterRequirement: 'Moderate - High',
  width: '35 ft (10.7 m)',
};

const mockLocationState = {
  tree: mockTree,
  selectedDataSourceIndex: 0,
};

const mockDataSources = dataSources[mockLocationState.selectedDataSourceIndex];

const mockPageName = mockTree.common.toLowerCase().replace(/ /g, '-');
const mockPathName = `/tree/${mockPageName}`;

describe('<TreePage /> spec', () => {
  const tree = mockLocationState.tree;
  const selectedDataSourceIndex = mockLocationState.selectedDataSourceIndex;

  beforeEach(() => {
    useLocation.mockReturnValue({ state: mockLocationState });
    const treePage = render(
      <Router>
        <TreePage />
      </Router>,
      {
        // Override the useLocation hook
        wrapper: ({ children }) => (
          <LocationMock value={{ state: mockLocationState }}>
            {children}
          </LocationMock>
        ),
      },
    );
  });

  test('renders common name', () => {
    expect(screen.getByText(mockTree.common)).toBeInTheDocument();
  });

  test('renders scientific name', () => {
    expect(screen.getByText(mockTree.scientific)).toBeInTheDocument();
  });

  test('renders deciduous/evergreen tag', () => {
    expect(screen.getByText(mockTree.deciduousEvergreen)).toBeInTheDocument();
  });

  test('renders CSV download button with correct data source name', () => {
    expect(screen.getByLabelText('Download CSV')).toBeInTheDocument();
    expect(screen.getByText(mockDataSources.name)).toBeInTheDocument();
  });
});

describe('WikipediaExtract', () => {
  test('renders WikipediaExtract component', () => {
    render(<WikipediaExtract extract="Wikipedia Extract" />, {
      // Override the useLocation hook
      wrapper: ({ children }) => (
        <LocationMock value={{ state: mockLocationState }}>
          {children}
        </LocationMock>
      ),
    });
    expect(screen.getByText('Wikipedia Extract')).toBeInTheDocument();
  });
});

describe('getTagVariant', () => {
  test('returns tag variant', () => {
    expect(getTagVariant('deciduous')).toBe('brown');
  });

  test('returns tag variant', () => {
    expect(getTagVariant('evergreen')).toBe('green');
  });
});

// describe('formatWord', () => {
//   test('returns empty string for undefined input', () => {
//     expect(formatWord(undefined)).toBe('');
//   });

//   test('returns input string with capped first letter if no spaces', () => {
//     expect(formatWord('example')).toBe('Example');
//   });

//   test('capitalizes first letter and replaces spaces with hypens', () => {
//     expect(formatWord('example word')).toBe('Example word');
//   });
// });
