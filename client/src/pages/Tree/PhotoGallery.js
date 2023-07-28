import React from 'react';
import { CardMedia, IconButton } from "@mui/material";
import "./PhotoGallery.scss";
import { ImageUploadArea } from './TreeImageUpload';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function PhotoGallery({
  imgs = [],
  columns = 1,
  handleUpload,
  handleRemove
}) {
  return (
    <div
      className="photo-gallery"
      style={{
        "--columns": `${columns}`,
        margin: "1em 0"
      }}
    >
      <>
        {imgs.map((img, idx) =>
          <div key={idx} className="photo-card">
            <IconButton
              className='photo-delete-icon'
              onClick={() => handleRemove(idx)}
            >
              <HighlightOffIcon />
            </IconButton>
            <CardMedia
                className='photo'
                component='img'
                loading='lazy'
                image={img}
                sx={{ 
                  display: 'inline-block',
                  margin: "-1em 0 0 0"
                }}
            />
          </div>
        )}
        <ImageUploadArea
          uploadURL={handleUpload}
          handleError={() => {}} // No-op.
        />
      </>
    </div>
  );
}