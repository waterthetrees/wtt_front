import { AddAPhoto } from "@mui/icons-material";
import { Button, styled, TextField } from "@mui/material";
import { useState } from "react";
import "./TreeImageUpload.css";

const color = "#9d9d9d";
const font = "Montserrat";

const ImageUploadSection = styled('section')`
  margin: 1em 0;
`;

const Border = styled('section')`
  display: flex;
  flex-direction: column;
  place-items: center;
  justify-content: center;
  margin: auto;
  padding: 1em;
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

function uploadURL(url) {
  // TODO: waiting on API
  console.log(`uploaded url: ${url}`)
}

function ImageUploadArea() {
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

  const addImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadURL(e.dataTransfer.files[0].name);
    setDragActive(false);
  }

  return (
    <Border
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={addImage}
      className={dragActive ? "dragging" : "not-dragging"}
    >
        <Icon />
        <ActionText>
          Select Image to Upload
        </ActionText>
        <Text>or drag and drop here</Text>
    </Border>
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

const UploadButton = styled(Button)`
  border-radius: 8px;
  font-size: 12px;
  background-color: white;
  color: black;
  padding: .1em 1em;
  text-transform: none;
`;

function ImageUploadDialog() {
  const [value, setValue] = useState("");
  const handleClick = () => {
    uploadURL(value);
    setValue("");
  }
  const handleChange = (e) => {
    setValue(e.target.value);
  }
  return (
    <InputBorder>
      <TextField
        hiddenLabel
        InputProps={{ disableUnderline: true }}
        placeholder='Add a file URL'
        variant='standard'
        value={value}
        onChange={handleChange}
      />
      <UploadButton
        variant='contained'
        onClick={handleClick}
      >
        Upload
      </UploadButton>
    </InputBorder>
  );
}

function ImageUploadBar() {

}

export default function ImageUpload() {
  return (
    <ImageUploadSection>
      <h3>Uploading Images</h3>
      <p sx={{ fontSize: "12px" }}>
        Took a selfie with your tree and want
        to track the life of your tree from
        the day you started.
      </p>
      <ImageUploadArea />
      <p>Or upload from a URL</p>
      <ImageUploadDialog />
    </ImageUploadSection>
  )
}