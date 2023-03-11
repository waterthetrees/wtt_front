import React from 'react';
import { render } from '@testing-library/react';
import { BlackButton } from '@/components/Button/Button';

/**
 * These snapshots are designed to catch _any_ change to UI components, so they
 * are by definition very brittle. If the changes are related to your changes
 * and look expected, update these snapshots with `npm test -- -u`
 */

const mockOnClick = jest.fn(() => {});

describe('<BlackButton /> spec', () => {
  it('renders BlackButton correctly', () => {
    const blackButton = render(
      <BlackButton
        type={'button'}
        onClick={mockOnClick}
        aria-label="Import City/Source CSV"
      >
        Test Button
      </BlackButton>,
    );
    expect(blackButton).toMatchSnapshot();
  });
});
