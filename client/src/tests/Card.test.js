import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card } from '@/components/Card/Card';

describe('<Card /> spec', () => {
  it('Renders the Card component correctly', () => {
    const { container } = render(<Card />);
    expect(container).toMatchSnapshot();
  });

  it('Renders children inside the Card component', () => {
    const { getByText } = render(
      <Card>
        <h1>Test Title</h1>
        <p>Test content</p>
      </Card>,
    );
    const titleElement = getByText('Test Title');
    const contentElement = getByText('Test content');

    expect(titleElement).not.toBeNull();
    expect(contentElement).not.toBeNull();
  });

  it('Applies the "card" class to the Card component', () => {
    const { getByTestId } = render(<Card data-testid="card" />);
    const card = getByTestId('card');
    expect(card.className).toContain('card');
  });
});
