import React from 'react';
import { render } from '@testing-library/react';
import Header from '@/components/Header/Header';
import { BrowserRouter as Router } from 'react-router-dom';

/**
 * These snapshots are designed to catch _any_ change to UI components, so they
 * are by definition very brittle. If the changes are related to your changes
 * and look expected, update these snapshots with `npm test -- -u`
 */

describe('<Header /> spec', () => {
  it('renders Header correctly', () => {
    const header = render(
      <Router>
        <Header />
      </Router>,
    );
    expect(header).toMatchSnapshot();
  });
});
