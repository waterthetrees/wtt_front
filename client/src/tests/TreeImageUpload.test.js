import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TreeImageUpload from '../pages/Tree/TreeImageUpload';

const mockApiUploadURL = jest.fn();
const mockApiUploadDone = jest.fn();
const mockApiCancelUpload = jest.fn();
// A mock API for polling upload.
const mockApiPollUpload = jest.fn((progressHook, uploadDone) => {
  let progress = 0;
  let intervalId = setInterval(
    () => {
      progress = progress + 10; 
      progressHook(progress);
      if (progress >= 100) {
        clearInterval(intervalId);
        intervalId = null;
        uploadDone();
      }
    },
    100
  );
});

const ImageUpload = ({ isMobile }) =>
  <TreeImageUpload
    apiUploadURL={mockApiUploadURL}
    apiUploadDone={mockApiUploadDone}
    apiCancelUpload={mockApiCancelUpload}
    apiPollUpload={mockApiPollUpload}
    isMobile={isMobile}
  />;

describe("TreeImageUpload", () => {
  it("renders correctly on desktop", () => {
    const { container } = render(<ImageUpload />);
    expect(container).toMatchSnapshot();
  });

  it("renders correctly on mobile", () => {
    const { container } = render(<ImageUpload isMobile={true} />);
    expect(container).toMatchSnapshot();
  });

  it("can upload from dialog", async () => {
    const user = userEvent.setup();
    const { getByRole, queryByRole } = render(<ImageUpload />);
    const dialogTextField = getByRole("textbox");
    const dialogButton = getByRole("button", { name: "Upload" });

    // Click on the upload button.
    await user.click(dialogTextField);
    await user.keyboard("fakefile.jpg");
    await user.click(dialogButton);
    expect(mockApiUploadURL).toHaveBeenCalled();

    await waitFor(() => {
      // I don't test for the upload bar,
      // but I assume if the cancel button
      // is there then so is it.
      const cancelButton = getByRole("button", { name: "Cancel" });
      expect(cancelButton).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(mockApiUploadDone).toHaveBeenCalled();
      const cancelButton = queryByRole("button", { name: "Cancel" });
      expect(cancelButton).not.toBeInTheDocument();
    });

    // Or press enter.
    await user.click(dialogTextField);
    await user.keyboard("fakefile.jpg{Enter}");
    expect(mockApiUploadURL).toHaveBeenCalled();
  });

  it("can cancel upload", async () => {
    const user = userEvent.setup();
    const { getByRole, queryByRole } = render(<ImageUpload />);
    const dialogTextField = getByRole("textbox");
    const dialogButton = getByRole("button", { name: "Upload" });
    await user.click(dialogTextField);
    await user.keyboard("fakefile.jpg");
    await user.click(dialogButton);
    expect(mockApiUploadURL).toHaveBeenCalled();
    await waitFor(() => {
      const cancelButton = getByRole("button", { name: "Cancel" });
      expect(cancelButton).toBeInTheDocument();
      user.click(cancelButton);
    });
    await waitFor(() => {
      expect(mockApiCancelUpload).toHaveBeenCalled();
      const cancelButton = queryByRole("button", { name: "Cancel" });
      expect(cancelButton).not.toBeInTheDocument();
    });
  });

  it("will not upload if not a valid URL", async () => {
    const user = userEvent.setup();
    const { getByRole, getByText } = render(<ImageUpload />);
    const dialogButton = getByRole("button", { name: "Upload" });
    await user.click(dialogButton);
    await waitFor(() =>
      expect(getByText(/Only jpg/)).toBeInTheDocument()
    );
    await user.keyboard("fakefile.png");
    await user.click(dialogButton);
    await waitFor(() =>
      expect(getByText(/Only jpg/)).toBeInTheDocument()
    );
  });

  it("can upload from drag and drop", async () => {
    const { getByRole } = render(<ImageUpload />);
    const dropzone = getByRole("button", { name: /Select Image to Upload/ });
    fireEvent.drop(dropzone, { dataTransfer: { files: [ { name: "badfile.png" }] } });
    expect(mockApiUploadURL).not.toHaveBeenCalled();
    fireEvent.drop(dropzone, { dataTransfer: { files: [ { name: "goodfile.jpg" }] } });
    expect(mockApiUploadURL).toHaveBeenCalled();
  });

  it("can upload by bringing up file dialog", async () => {
    const user = userEvent.setup();
    const badFile = new File([""], "fakefile.png", { type: "image/png" });
    const goodFile = new File([""], "fakefile.jpg", { type: "image/jpeg" });
    const { getByTestId } = render(<ImageUpload />);
    const input = getByTestId("file-input");
    
    await user.upload(input, badFile);
    expect(input.files).toHaveLength(0);

    await user.upload(input, goodFile);
    expect(input.files).toHaveLength(1);
  });
});