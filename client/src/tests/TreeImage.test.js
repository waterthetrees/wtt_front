import { act, render, screen } from '@testing-library/react';
import React from 'react';

import { ImageLoad, setFormatImagePath } from '@/pages/Tree/TreeImage';

describe('ImageLoad', () => {
  const src = 'https://example.com/image.jpg';
  const placeholder = 'https://example.com/placeholder.jpg';
  const alt = 'Example image';

  it('Renders the ImageLoad component correctly', () => {
    const { container } = render(
      <ImageLoad src={src} placeholder={placeholder} alt={alt} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('loads the actual image and updates the src', async () => {
    const img = new Image();
    const loadEvent = new Event('load');

    // Mock Image constructor to simulate image loading
    jest.spyOn(global, 'Image').mockImplementation(() => {
      img.src = src;
      setTimeout(() => img.dispatchEvent(loadEvent), 50);
      return img;
    });

    render(<ImageLoad src={src} placeholder={placeholder} alt={alt} />);

    await act(async () => new Promise((resolve) => setTimeout(resolve, 60)));

    const renderedImg = screen.getByRole('img', { name: alt });
    expect(renderedImg.getAttribute('src')).toEqual(src);

    // Cleanup
    global.Image.mockRestore();
  });

  test('image element has the correct alt attribute value', () => {
    const { getByRole } = render(
      <ImageLoad src={src} placeholder={placeholder} alt={alt} />,
    );
    const img = getByRole('img');
    expect(img).toHaveAttribute('alt', alt);
  });

  test('image element has the loading attribute set to "lazy"', () => {
    const { getByRole } = render(
      <ImageLoad src={src} placeholder={placeholder} alt={alt} />,
    );
    const img = getByRole('img');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  test('image element has the correct transition style', () => {
    const { getByRole } = render(
      <ImageLoad src={src} placeholder={placeholder} alt={alt} />,
    );
    const img = getByRole('img');
    expect(img).toHaveStyle('transition: opacity .30s linear');
  });
});

describe('setFormatImagePath', () => {
  it('returns the correct image path when the scientific name is provided and exists in treeImages', () => {
    const scientificName = 'Quercus alba';
    const expectedImagePath = '../../assets/images/data/Quercus-alba.jpg';
    const result = setFormatImagePath(scientificName);

    expect(result).toBe(expectedImagePath);
  });

  it('returns null when the scientific name is not provided', () => {
    const result = setFormatImagePath(null);
    expect(result).toBe(null);
  });

  it('returns null when the scientific name does not exist in treeImages', () => {
    const scientificName = 'Nonexistent scientific name';
    const result = setFormatImagePath(scientificName);
    expect(result).toBe(null);
  });
});
