import React from 'react';
import { render } from '@testing-library/react';
import TreePage from '@/pages/TreeList/TreePage';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from 'react-router-dom';

/**
 * These snapshots are designed to catch _any_ change to UI components, so they
 * are by definition very brittle. If the changes are related to your changes
 * and look expected, update these snapshots with `npm test -- -u`
 */

const mockState = {
  selectedDataSourceIndex: 0,
  tree: {
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
  },
};

describe('<TreePage /> spec', () => {
  it('renders TreePage correctly', () => {
    const nameFormatted = mockState?.tree?.common
      ?.toLowerCase()
      .replace(/ /g, '-');
    const urlRoute = `/tree/${nameFormatted}`;
    const tree = mockState.tree;
    const selectedDataSourceIndex = mockState.selectedDataSourceIndex;
    const index = 0;

    const treePage = render(
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <NavLink
                to={{
                  pathname: urlRoute,
                }}
                replace
                state={{ tree, selectedDataSourceIndex }}
                key={`${tree?.scientific}-${index}`}
              />
            }
          />
          <Route path="/tree/:common" element={<TreePage />} />
        </Routes>
      </Router>,
    );
    console.log('treePage', treePage);
    expect(treePage).toMatchSnapshot();
  });
});
