import React from 'react';
import { render } from '@testing-library/react';
import { WttButton } from '@/components/Button/Button';

/**
 * These snapshots are designed to catch _any_ change to UI components, so they
 * are by definition very brittle. If the changes are related to your changes
 * and look expected, update these snapshots with `npm test -- -u`
 */

const mockOnClick = jest.fn(() => {});

describe('<WttButton /> spec', () => {
  it('renders WttButton correctly', () => {
    const wttButton = render(
      <WttButton
        type={'button'}
        onClick={mockOnClick}
        aria-label="Import City/Source CSV"
        colorClass="wttbuttons__black"
      >
        Test Button
      </WttButton>,
    );
    expect(wttButton).toMatchSnapshot();
  });
});
