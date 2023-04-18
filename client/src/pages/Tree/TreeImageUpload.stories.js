import TreeImageUpload from "./TreeImageUpload";

export default {
  title: "TreeImageUpload",
  component: TreeImageUpload,
}

// A mock API for polling upload.
async function pollUpload(progressHook, uploadDone) {
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
    300
  );
}

export const Default = {
  args: {
    apiUploadURL: (url) => { console.log(`uploaded url: ${url}`)},
    apiUploadDone: () => { console.log("upload done"); }, 
    apiCancelUpload: () => { console.log("upload cancelled"); }, 
    apiPollUpload: pollUpload,
    isMobile: false
  },
}