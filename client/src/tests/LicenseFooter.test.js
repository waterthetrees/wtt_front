import React from 'react';
import { render, screen } from '@testing-library/react';
import LicenseFooter, {
  CreativeCommonsLicense,
} from '@/pages/License/LicenseFooter';

describe('LicenseFooter', () => {
  it('renders CreativeCommonsLicense when no license and children are provided', () => {
    render(<LicenseFooter />);

    expect(screen.getByText('Data license:')).toBeInTheDocument();
    expect(
      screen.getByText(
        'CC BY-NC-SA (Attribution, Non-commercial, Share-alike).',
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /CC BY-NC-SA/i })).toHaveAttribute(
      'href',
      'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    );
  });

  it('renders the provided license when given a license prop', () => {
    render(<LicenseFooter license="MIT" />);

    expect(screen.getByText('Data License: MIT')).toBeInTheDocument();
  });

  it('renders the provided license when given a children prop', () => {
    render(<LicenseFooter>Apache 2.0</LicenseFooter>);

    expect(screen.getByText('Data License: Apache 2.0')).toBeInTheDocument();
  });

  it('gives priority to the license prop when both license and children are provided', () => {
    render(
      <LicenseFooter license="MIT">
        <span>Apache 2.0</span>
      </LicenseFooter>,
    );

    expect(screen.getByText('Data License: MIT')).toBeInTheDocument();
    expect(
      screen.queryByText('Data License: Apache 2.0'),
    ).not.toBeInTheDocument();
  });
});

describe('CreativeCommonsLicense', () => {
  it('renders CreativeCommonsLicense correctly', () => {
    render(<CreativeCommonsLicense />);

    expect(screen.getByText('Data license:')).toBeInTheDocument();
    expect(
      screen.getByText(
        'CC BY-NC-SA (Attribution, Non-commercial, Share-alike).',
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /CC BY-NC-SA/i })).toHaveAttribute(
      'href',
      'https://creativecommons.org/licenses/by-nc-sa/4.0/',
    );
  });
});
