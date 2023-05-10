import React, { useEffect, useState } from 'react';

import treeImages from '@/data/dist/treeImages.json';

export const ImageLoad = React.memo(
  ({ src, placeholder = 'placeholder.jpg', alt = '' }) => {
    const [loading, setLoading] = useState(true);
    const [currentSrc, updateSrc] = useState(placeholder);

    // useEffect(() => {
    //   if (src !== currentSrc) updateSrc();
    //   // start loading original image
    //   const imageToLoad = new Image();
    //   imageToLoad.src = src;
    //   imageToLoad.onload = () => {
    //     // When image is loaded replace the src and set loading to false
    //     setLoading(false);
    //     updateSrc(src);
    //   };
    // }, [src]);

    // useEffect(() => {
    //   if (src !== currentSrc) {
    //     updateSrc(placeholder); // Add this line
    //   }
    //   // start loading original image
    //   const imageToLoad = new Image();
    //   imageToLoad.src = src;
    //   imageToLoad.onload = () => {
    //     // When image is loaded replace the src and set loading to false
    //     setLoading(false);
    //     updateSrc(src);
    //   };
    // }, [src]);

    useEffect(() => {
      // if (src !== currentSrc) updateSrc();
      // start loading original image
      const imageToLoad = new Image();
      imageToLoad.src = src;
      imageToLoad.onload = () => {
        // When image is loaded replace the src and set loading to false
        setLoading(false);
        updateSrc(src);
      };

      // Cleanup function to reset currentSrc to placeholder when src changes
      return () => {
        updateSrc(placeholder);
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
  },
);
ImageLoad.displayName = 'ImageLoad';

// This function formats the scientific name to match the image file name
// If the image has been downloaded, it will use the local file
// If not, it will use the image URL from the treeImages.json file
export const setFormatImagePath = (scientific) => {
  if (!scientific || !treeImages[scientific]) return null;

  // replace spaces with hyphens for image path using regex
  const scientificNospaces = scientific
    .replace(/\s/g, '-')
    .replace(/'/g, '')
    .replace(/"/g, '');

  const imagePath = `../../assets/images/data/${scientificNospaces}.jpg`;
  // || treeImages[scientific]?.imageURL;
  return imagePath;
};
