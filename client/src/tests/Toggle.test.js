import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { Toggle } from '@/components/Form';

describe('<Toggle /> spec', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Renders the Toggle component correctly', () => {
    const mockSetView = jest.fn();
    const view = 'column';
    const { container } = render(<Toggle view={view} setView={mockSetView} />);
    expect(container).toMatchSnapshot();
  });

  it('Changes the view on button click and updates local storage', () => {
    const mockSetView = jest.fn();
    const defaultView = 'column';
    const newView = 'quilt';
    const { getByLabelText } = render(
      <Toggle view={defaultView} setView={mockSetView} />,
    );
    const cardToggleButton = getByLabelText(newView);

    fireEvent.click(cardToggleButton);
    expect(mockSetView).toHaveBeenCalledWith(newView);
    expect(localStorage.getItem('view')).toEqual(newView);
  });

  it('Defaults to the view from props if local storage is not present', () => {
    const mockSetView = jest.fn();
    const defaultView = 'column';
    const { getByTestId } = render(
      <Toggle view={defaultView} setView={mockSetView} />,
    );
    const column = getByTestId('column-toggle-button');
    expect(column.getAttribute('aria-pressed')).toEqual('true');
  });
});
