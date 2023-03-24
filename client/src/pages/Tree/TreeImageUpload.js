import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Button, styled } from "@mui/material";
import useAuthUtils from '@/components/Auth/useAuthUtils';
import { AddPhotoAlternate } from "@mui/icons-material";
import ImageUploading from "react-images-uploading";

const TreeImageUploadButton = styled(Button)`
  font-size: 1.5rem;
  margin: .5em 0 .5em;
`;

export default function TreeImageUpload() {
  const { user = {}, isAuthenticated } = useAuth0();
  const { loginToCurrentPage } = useAuthUtils();
  const [images, setImages] = useState([]);
  const imageLimit = 5;

  const handleClick = () => {
    if (isAuthenticated) {
      uploadImage();
    } else {
      loginToCurrentPage();
    }
  };

  return (
    <div>
        <TreeImageUploadButton
          color="secondary"
          size="large"
          variant="contained"
          startIcon={<AddPhotoAlternate />}
          onClick={handleClick}
          fullWidth
          disableElevation
        >
          Upload Image
        </TreeImageUploadButton>
    </div>
  )
}
