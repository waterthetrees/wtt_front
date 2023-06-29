import { Card, CardContent, CardMedia, Skeleton } from '@mui/material';
import React, { Suspense } from 'react';
import './TreePhotosTab.scss';

const PlaceholderImage = 'https://via.placeholder.com/150x150';

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