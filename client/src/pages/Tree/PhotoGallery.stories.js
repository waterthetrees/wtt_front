import React from 'react';
import PhotoGallery from './PhotoGallery';
import PlaceholderImage from '@/assets/images/trees/placeholder.png';

export default {
  title: 'PhotoGallery',
  component: PhotoGallery,
};

export const PhotoOneImg = {
  name: 'PhotoOneImg',
  render: () => {
    return (
      <div style={{
        width: '200px',
        border: "1px solid black"
      }}>
        <PhotoGallery
          imgs={[PlaceholderImage]}
          columns={2}
        />
      </div>
    );
  }
};

export const PhotoMultipleImgs = {
  name: 'PhotoMultipleImgs',
  render: () => {
    return (
      <div style={{
        width: '400px',
        border: "1px solid black"
      }}>
        <PhotoGallery
          imgs={[
            PlaceholderImage,
            PlaceholderImage,
            PlaceholderImage
          ]}
          columns={2}
        />
      </div>
    );
  }
};