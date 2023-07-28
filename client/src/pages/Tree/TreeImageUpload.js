import { AddAPhoto } from '@mui/icons-material';
import { Button, IconButton, LinearProgress, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import './TreeImageUpload.scss';

export function ImageUploadArea({ uploadURL, handleError }) {
  const [dragActive, setDragActive] = useState(false);
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const fileSelected = () => {
    const file = inputRef.current.files[0];
    // Only allow jpg files.
    if (!file.name.match(/\.jp(e?)g/)) {
      handleError('Only jpg files are allowed.');
      return;
    }
    uploadURL(file);
  };

  const addImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    // Only allow jpg files.
    if (!file.name.match(/\.jp(e?)g/)) {
      handleError('Only jpg files are allowed.');
      return;
    }
    uploadURL(file);
    setDragActive(false);
  };

  return (
    <div className='image-upload-area'>
      <IconButton
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={addImage}
        onClick={handleClick}
        className={`drop-area ${dragActive ? 'dragging' : 'not-dragging'}`}
      >
        <AddAPhoto className="photo-icon" />
        <p className="action-text">Select Image to Upload</p>
        <p className="text">or drag and drop here</p>
      </IconButton>
      <input
        style={{
          display: 'none',
          visibility: 'hidden'
        }}
        data-testid="file-input"
        type="file"
        ref={inputRef}
        onChange={fileSelected}
        accept="image/jpeg"
      />
    </div>
  );
}

function ImageUploadDialog({ uploadURL, handleError }) {
  const [value, setValue] = useState('');

  const submit = () => {
    // Only allow jpg files.
    if (!value.match(/\.jpg/)) {
      handleError('Only jpg files are allowed.');
      setValue('');
      return;
    }

    uploadURL(value);
    setValue('');
  };

  const handleEnter = (e) => {
    if (e.key && e.key === 'Enter') {
      submit();
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <React.Fragment>
      <section className="input-border" onKeyDown={handleEnter}>
        <TextField
          hiddenLabel
          InputProps={{ disableUnderline: true }}
          placeholder="Add a file URL"
          variant="standard"
          value={value}
          onChange={handleChange}
        />
        <Button variant="contained" onClick={submit} className="dialog-button">
          Upload
        </Button>
      </section>
    </React.Fragment>
  );
}

function ImageUploadBar({ pollUpload, uploadDone, cancelUpload }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    pollUpload((newProgess) => setProgress(newProgess), uploadDone);
  }, []);

  return (
    <div className="upload-bar">
      <p sx={{ margin: 'auto' }}>{progress}%</p>
      <LinearProgress variant="determinate" color="success" value={progress} />
      <Button
        variant="contained"
        onClick={cancelUpload}
        className="dialog-button"
      >
        Cancel
      </Button>
    </div>
  );
}

export default function ImageUpload({
  apiUploadURL,
  apiUploadDone,
  apiPollUpload,
  apiCancelUpload,
  apiFileDialog,
  isMobile,
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  function handleErr(msg) {
    setError(true);
    setErrMsg(msg);
  }

  function uploadURL(url) {
    setError(false);
    apiUploadURL(url);
    setIsUploading(true);
  }

  function uploadDone() {
    apiUploadDone();
    setIsUploading(false);
  }

  function cancelUpload() {
    apiCancelUpload();
    setIsUploading(false);
  }

  return (
    <section className='treeimageupload'>
      <h3>Uploading Images</h3>
      <p className='text'>
        Take a selfie with your tree and track the life of your tree
        from the day you started.
      </p>
      <ImageUploadArea
        uploadURL={uploadURL}
        fileDialog={apiFileDialog}
        handleError={handleErr}
      />
      {!isMobile && (
        <>
          <p>Or upload from a URL</p>
          <ImageUploadDialog uploadURL={uploadURL} handleError={handleErr} />
        </>
      )}
      {isUploading && (
        <ImageUploadBar
          uploadDone={uploadDone}
          cancelUpload={cancelUpload}
          pollUpload={apiPollUpload}
        />
      )}
      {error && <p className="error-text">{errMsg}</p>}
    </section>
  );
}
