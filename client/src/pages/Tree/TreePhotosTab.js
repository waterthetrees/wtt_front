import { Card, CardContent, CardMedia } from '@mui/material';
import React from 'react';
import './TreePhotosTab.scss';

const PlaceholderImage = 'https://via.placeholder.com/150x150';

export default function TreePhotosTab({ photoLibraries = [] }) {
  return (
    <div className="tree-photos-tab">
      {photoLibraries.map((library) => (
        <Card
          className='tree-photo-card'
          sx={{ margin: 'auto', width: '90%' }}
        >
          <CardMedia
            component='img'
            image={library.imgs ? library.imgs[0] : PlaceholderImage}
            sx={{
              display: 'inline-block',
            }}
          />
          <CardContent>
            <h4 className='photo-name'>{library.name}</h4>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}