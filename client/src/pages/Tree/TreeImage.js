import React, { useEffect, useState } from 'react';
import treeImages from '@/data/dist/treeImages.json';

export const ImageLoad = React.memo(({ src, placeholder, alt = '' }) => {
  const [loading, setLoading] = useState(true);
  const [currentSrc, updateSrc] = useState(placeholder);

  useEffect(() => {
    if (src !== currentSrc) updateSrc();
    // start loading original image
    const imageToLoad = new Image();
    imageToLoad.src = src;
    imageToLoad.onload = () => {
      // When image is loaded replace the src and set loading to false
      setLoading(false);
      updateSrc(src);
    };
  }, [src]);

  return (
    <img
      src={currentSrc}
      style={{
        opacity: loading ? 0.1 : 1,
        transition: 'opacity .30s linear',
        width: '100%',
      }}
      placeholder={placeholder}
      alt={alt}
      loading="lazy"
    />
  );
});
ImageLoad.displayName = 'ImageLoad';

export const fixScientificForImage = (scientific) => {
  if (!scientific || !treeImages[scientific]) return null;

  // replace spaces with hyphens for image path using rejex
  const scientificNospaces = scientific.replace(/\s/g, '-');

  const imagePath =
    `../../assets/images/data/${scientificNospaces}.jpg` ||
    treeImages[scientific]?.imageURL;
  return imagePath;
};
