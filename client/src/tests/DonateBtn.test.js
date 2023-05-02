import { render, screen } from '@testing-library/react';
import React from 'react';

import DonateBtn from '@/components/Button/DonateBtn/DonateBtn';

describe('DonateBtn', () => {
  test('renders the Donate button', () => {
    render(<DonateBtn />);
    const donateButton = screen.getByText('Donate');
    expect(donateButton).toBeInTheDocument();
  });

  test('has the correct URL', () => {
    render(<DonateBtn />);
    const donateLink = screen.getByRole('link', { name: /donate/i });
    expect(donateLink).toHaveAttribute(
      'href',
      'https://opencollective.com/waterthetrees/donate',
    );
  });

  test('opens the URL in a new tab', () => {
    render(<DonateBtn />);
    const donateLink = screen.getByRole('link', { name: /donate/i });
    expect(donateLink).toHaveAttribute('target', '_blank');
    expect(donateLink).toHaveAttribute('rel', 'noreferrer');
  });
});
