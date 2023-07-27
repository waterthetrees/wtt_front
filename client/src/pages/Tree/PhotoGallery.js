import React from 'react';
import { CardMedia } from "@mui/material";
import "./PhotoGallery.scss";

export default function PhotoGallery({ imgs = [], columns }) {
  return (
    <div className="photo-gallery" style={{ "--columns": `${columns}` }}>
      {imgs.map(img =>
        <div className="photo-card">
          <CardMedia
              className='photo'
              component='img'
              loading='lazy'
              image={img}
              sx={{ display: 'inline-block', }}
          />
        </div>
      )}
    </div>
  );
}