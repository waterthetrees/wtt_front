import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Toggle } from '@/components/Form';

describe('<Toggle /> spec', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Renders the Toggle component correctly', () => {
    const mockSetView = jest.fn();
    const { container } = render(<Toggle view="list" setView={mockSetView} />);
    expect(container).toMatchSnapshot();
  });

  it('Changes the view on button click and updates local storage', () => {
    const mockSetView = jest.fn();
    const { getByLabelText } = render(
      <Toggle view="list" setView={mockSetView} />,
    );
    const cardToggleButton = getByLabelText('card');

    fireEvent.click(cardToggleButton);
    expect(mockSetView).toHaveBeenCalledWith('card');
    expect(localStorage.getItem('view')).toEqual('card');
  });

  it('Defaults to the view from props if local storage is not present', () => {
    const mockSetView = jest.fn();
    const { getByTestId } = render(
      <Toggle view="list" setView={mockSetView} />,
    );
    const listToggleButton = getByTestId('list-toggle-button');
    expect(listToggleButton.getAttribute('aria-pressed')).toEqual('true');
  });
});
