import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ButtonShowHide } from '@/components/Button';

/**
 * These snapshots are designed to catch _any_ change to UI components, so they
 * are by definition very brittle. If the changes are related to your changes
 * and look expected, update these snapshots with `npm test -- -u`
 */

const mockOnClick = jest.fn(() => {});
const mockSetShowMore = jest.fn(() => {});
// getAttribute: () => '3', setAttribute: jest.fn()

describe('<ButtonShowHide /> spec', () => {
  it('Renders ButtonShowHide correctly', () => {
    const buttonShowHide = render(
      <ButtonShowHide
        type={'button'}
        onClick={mockOnClick}
        aria-label="Import City/Source CSV"
        colorClass="ButtonShowHides__black"
      />,
    );
    expect(buttonShowHide).toMatchSnapshot();
  });

  it('Handles down arrow (show) button click', () => {
    const { getByAltText } = render(
      <ButtonShowHide showMore={false} setShowMore={mockSetShowMore} />,
    );
    const downArrowBtn = getByAltText('show');
    fireEvent.click(downArrowBtn);
    expect(mockSetShowMore).toHaveBeenCalledWith(true);
  });

  it('Handles up arrow (hide) button click', () => {
    const { getByAltText } = render(
      <ButtonShowHide showMore={true} setShowMore={mockSetShowMore} />,
    );
    const upArrowBtn = getByAltText('hide');
    fireEvent.click(upArrowBtn);
    expect(mockSetShowMore).toHaveBeenCalledWith(false);
  });

  it('Uses the correct image for down arrow (show) button', () => {
    const showImagePath = 'assets/images/trees/arrow-show.svg';
    const { getByAltText } = render(
      <ButtonShowHide showMore={false} setShowMore={mockSetShowMore} />,
    );
    const downArrowImg = getByAltText('show');
    expect(downArrowImg.getAttribute('src')).toEqual(showImagePath);
  });

  it('Uses the correct image for up arrow (hide) button', () => {
    const hideImagePath = 'assets/images/trees/arrow-hide.svg';
    const { getByAltText } = render(
      <ButtonShowHide showMore={true} setShowMore={mockSetShowMore} />,
    );
    const upArrowImg = getByAltText('hide');
    expect(upArrowImg.getAttribute('src')).toEqual(hideImagePath);
  });
});
