import { render, screen } from '@testing-library/react';
import React, { createContext, useContext } from 'react';
import {
  NavLink,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from 'react-router-dom';

import TreePage from '@/pages/TreeList/TreePage';
import { dataSources } from '@/pages/TreeList/dataArrays';

import { capFirstLetterAndSpace } from '../pages/TreeList/TreePage';

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
  deciduousEvergreen: 'Winter Deciduous',
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
    render(
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
    const commonExists = screen.getByText(mockTree.common);
    console.log('commonExists', commonExists);
    expect(commonExists).toBeInTheDocument();
  });

  test('renders scientific name', () => {
    expect(screen.getByText(mockTree.scientific)).toBeInTheDocument();
  });

  test('renders genus', () => {
    expect(screen.getByText(mockTree.genus)).toBeInTheDocument();
  });

  test('renders deciduous/evergreen tag', () => {
    expect(screen.getByText(mockTree.deciduousEvergreen)).toBeInTheDocument();
  });

  test('renders CSV download button with correct data source name', () => {
    expect(screen.getByLabelText('Download CSV')).toBeInTheDocument();
    expect(screen.getByText(mockDataSources.name)).toBeInTheDocument();
  });

  test('renders tag with correct variant based on deciduous or evergreen value', () => {
    const deciduousTag = screen.getByText('deciduous');
    const evergreenTag = screen.getByText('evergreen');

    expect(deciduousTag).toHaveClass('tag__brown');
    expect(evergreenTag).toHaveClass('tag__green');
    // const innerDiv = getByText('Test Tag');
    // expect(innerDiv.className).toContain('tag__brown');
  });

  test('renders wikipediaExtract if available', () => {
    // const mockTreeImages = {
    //   'Test Scientific Name': {
    //     content: 'Test wikipediaExtract content',
    //   },
    // };

    // jest.mock('@/data/dist/treeImages.json', () => mockTreeImages);

    // render(
    //   <Router>
    //     <TreePage />
    //   </Router>,
    // );

    // expect(screen.getByText('Summary')).toBeInTheDocument();
    expect(
      screen.getByText('Test wikipediaExtract content'),
    ).toBeInTheDocument();
  });
});

describe('capFirstLetterAndSpace', () => {
  test('returns empty string for undefined input', () => {
    expect(capFirstLetterAndSpace(undefined)).toBe('');
  });

  test('returns input string unchanged if no spaces', () => {
    expect(capFirstLetterAndSpace('example')).toBe('example');
  });

  test('capitalizes first letter and replaces spaces with hypens', () => {
    expect(capFirstLetterAndSpace('example word')).toBe('Example word');
  });
});
