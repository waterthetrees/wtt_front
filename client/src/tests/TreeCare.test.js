import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import TreeCare from '@/pages/TreeCare/TreeCare';
import { treecaredata } from '@/pages/TreeCare/treecaredata';

describe('TreeCare component', () => {
  beforeEach(() => {
    render(<TreeCare />);
  });

  test('renders the Tree Care header title', () => {
    const headerTitle = screen.getByText(/Tree Care/i);
    expect(headerTitle).toBeInTheDocument();
  });

  test('renders the correct number of Card components', () => {
    const cards = screen.getAllByTestId('card');
    expect(cards.length).toEqual(treecaredata.length);
  });

  test('renders the tree care notice', () => {
    const notice = screen.getByText(
      /Please log your maintenance on the tree info sidebar so we all can track the tree's health. Thank you!/i,
    );
    expect(notice).toBeInTheDocument();
  });

  test('renders the Vimeo video iframe', () => {
    const iframe = screen.getByTitle('Street Tree Care');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      'src',
      'https://player.vimeo.com/video/416031708?h=948fa392f3&byline=0&portrait=0',
    );
    expect(iframe).toHaveAttribute(
      'allow',
      'autoplay; fullscreen; picture-in-picture',
    );
    expect(iframe).toHaveAttribute('allowFullScreen', '');
  });
});
