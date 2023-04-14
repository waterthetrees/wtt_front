import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { ImageLoad, fixScientificForImage } from '@/pages/Tree/TreeImage';

describe('ImageLoad', () => {
  const src = 'http://example.com/image.jpg';
  const placeholder = 'http://example.com/placeholder.jpg';
  const alt = 'Sample image';

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
});

describe('fixScientificForImage', () => {
  it('returns the correct image path when the scientific name is provided and exists in treeImages', () => {
    const scientificName = 'Quercus alba';
    const expectedImagePath = '../../assets/images/data/Quercus-alba.jpg';
    const result = fixScientificForImage(scientificName);

    expect(result).toBe(expectedImagePath);
  });

  it('returns null when the scientific name is not provided', () => {
    const result = fixScientificForImage(null);
    expect(result).toBe(null);
  });

  it('returns null when the scientific name does not exist in treeImages', () => {
    const scientificName = 'Nonexistent scientific name';
    const result = fixScientificForImage(scientificName);
    expect(result).toBe(null);
  });
});
