import React from 'react';
import { render } from '@testing-library/react';
import { Tag } from '@/components/Tag/Tag';

describe('<Tag /> spec', () => {
  it('Renders the Tag component correctly', () => {
    const { container } = render(<Tag variant="green">Test Tag</Tag>);
    expect(container).toMatchSnapshot();
  });

  it('Renders children inside the Tag component', () => {
    const { getByText } = render(<Tag variant="green">Test Tag</Tag>);
    const tagElement = getByText('Test Tag');
    expect(tagElement).not.toBeNull();
  });

  it('Applies the correct variant class to the inner div', () => {
    const { getByText } = render(<Tag variant="brown">Test Tag</Tag>);
    const innerDiv = getByText('Test Tag');
    expect(innerDiv.className).toContain('tag__brown');
  });
});
