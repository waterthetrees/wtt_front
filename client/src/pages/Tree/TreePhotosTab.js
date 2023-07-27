import { CardMedia } from '@mui/material';
import React from 'react';
import './TreePhotosTab.scss';
import PlaceholderImage from '@/assets/images/trees/placeholder.png';

export default function TreePhotosTab({ photoLibraries = [] }) {
  return (
    <div className="tree-photos-tab">
      {photoLibraries.map((library) => (
        <div className='tree-photo-card' >
          <h4 className='photo-name'>{library.name}</h4>
          <CardMedia
            className='photo'
            component='img'
            loading='lazy'
            image={library.imgs ? library.imgs[0] : PlaceholderImage}
            sx={{
              display: 'inline-block',
            }}
          />
        </div>
      ))}
    </div>
  )
}