import React, { useRef } from 'react';
import { AddAPhoto } from "@mui/icons-material";
import { Button, IconButton, LinearProgress, styled, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import "./TreeImageUpload.css";

const color = "#9d9d9d";
const font = "Montserrat";

const ImageUploadSection = styled('section')`
  margin: 1em 0;
`;

const Border = styled(IconButton)`
  display: flex;
  flex-direction: column;
  place-items: center;
  justify-content: center;
  margin: auto;
  padding: 1em;
  width: 100%;
  border-radius: 8px;
  border: 2px dashed ${color};
  text-align: center;
  font-family: Montserrat;
`;

const ActionText = styled('h2')`
  color: ${color};
  font-family: ${font};
  font-size: 16px;
  font-style: medium;
  margin: 5px;
`;

const Icon = styled(AddAPhoto)`
  color: #7d7d7d;
  width: 32px;
  height: 32px;
  margin: 5px 0 1px;
`;

const Text = styled('p')`
  color: ${color};
  font-size: 12px;
  font-family: ${font};
  margin: 1px;
`;

const HiddenInput = styled('input')`
  display: none;
`;

function ImageUploadArea({ uploadURL, fileDialog }) {
  const [dragActive, setDragActive] = useState(false);
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const fileSelected = () => {
    uploadURL(inputRef.current.files[0].name);
  };

  const addImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadURL(e.dataTransfer.files[0].name);
    setDragActive(false);
  }

  return (
    <>
      <Border
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={addImage}
        onClick={handleClick}
        className={dragActive ? "dragging" : "not-dragging"}
      >
          <Icon />
          <ActionText>
            Select Image to Upload
          </ActionText>
          <Text>or drag and drop here</Text>
      </Border>
      <HiddenInput type="file" ref={inputRef} onChange={fileSelected} />
    </>
  );
}

const InputBorder = styled('section')`
  display: flex;
  font-family: Montserrat;
  align-items: center;
  background-color: #ededed;
  border-radius: 8px;
  justify-content: center;
  padding: 4px 2px;
`;

const DialogButton = styled(Button)`
  border-radius: 8px;
  font-size: 12px;
  background-color: #ffffff;
  color: black;
  padding: .1em 1em;
  text-transform: none;

  &:hover {
    background-color: #ececec;
  }
`;

const ErrorText = styled('p')`
  color: red;
  font-size: 12px;
  font-family: ${font};
  margin: 1px;
`;

function ImageUploadDialog({ uploadURL }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleClick = () => {
    if (!value) {
      setError(true);
      return;
    }

    uploadURL(value);
    setValue("");
    setError(false);
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  return (
    <>
      <InputBorder>
        <TextField
          hiddenLabel
          InputProps={{ disableUnderline: true }}
          placeholder='Add a file URL'
          variant='standard'
          value={value}
          onChange={handleChange}
        />
        <DialogButton
          variant='contained'
          onClick={handleClick}
        >
          Upload
        </DialogButton>
      </InputBorder>
      {error && <ErrorText>Invalid URL</ErrorText>}
    </>
  );
}

const UploadBar = styled("div")`
  margin: 1em 0;
  display: grid;
  grid-template-columns: 1fr 5fr 2fr;
  align-items: center;
  grid-gap: 1em;
`;

const Percent = styled("p")`
  margin: auto;
`;

function ImageUploadBar({ pollUpload, uploadDone, cancelUpload }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => { 
    pollUpload((newProgess) => setProgress(newProgess), uploadDone);
  }, []);

  return (
    <UploadBar>
      <Percent>{progress}%</Percent>
      <LinearProgress
        variant="determinate"
        color="success"
        value={progress}
      />
      <DialogButton
        variant="contained"
        onClick={cancelUpload}
      >
        Cancel
      </DialogButton>
    </UploadBar>
  );
}

export default function ImageUpload({
  apiUploadURL,
  apiUploadDone,
  apiPollUpload,
  apiCancelUpload,
  apiFileDialog,
  isMobile
}) {
  const [isUploading, setIsUploading] = useState(false);

  function uploadURL(url) {
    apiUploadURL(url)
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
    <ImageUploadSection>
      <h3>Uploading Images</h3>
      <p sx={{ fontSize: "12px" }}>
        Took a selfie with your tree and want
        to track the life of your tree from
        the day you started.
      </p>
      <ImageUploadArea
        uploadURL={uploadURL}
        fileDialog={apiFileDialog}
      />
      {!isMobile &&
        <>
          <p>Or upload from a URL</p>
          <ImageUploadDialog uploadURL={uploadURL} />
        </>
      }
      {isUploading &&
        <ImageUploadBar
          uploadDone={uploadDone}
          cancelUpload={cancelUpload}
          pollUpload={apiPollUpload}
        />
      }
    </ImageUploadSection>
  )
}