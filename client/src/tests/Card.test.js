import React from 'react';
import { render } from '@testing-library/react';
import { Card } from '@/components/Card/Card';

/**
 * These snapshots are designed to catch _any_ change to UI components, so they
 * are by definition very brittle. If the changes are related to your changes
 * and look expected, update these snapshots with `npm test -- -u`
 */

describe('<Card /> spec', () => {
  it('renders Card correctly', () => {
    // const card = render(<Card />);
    // console.log('card', card);
    // // expect(card).toMatchSnapshot();
  });
});
