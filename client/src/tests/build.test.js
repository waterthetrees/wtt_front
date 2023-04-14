// TODO - add tests for the build script
// Currently this is just a placeholder file, we need to move the server to es6 modules and add tests

import // downloadImage,
// getWikiDataImages,
// getResponseJSON,
'../../../data/build';
import path from 'path';

// getWikiDataImages.test.js
import fs from 'fs';

import topTreesSanFrancisco from '../../../data/json/topTreesSanFrancisco.json';

// Mock the fs module
jest.mock('fs', () => ({
  writeFileSync: jest.fn(),
  readdirSync: jest.fn(() => []),
  rmSync: jest.fn(),
  mkdirSync: jest.fn(),
  existsSync: jest.fn(() => true),
}));

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    statusText: '',
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(8)),
  }),
);

describe('JSON files', () => {
  it('topTreesSanFrancisco.json exists', () => {
    const jsonFilePath = path.resolve(
      __dirname,
      '../../../data/json/topTreesSanFrancisco.json',
    );
    const fileExists = fs.existsSync(jsonFilePath);
    expect(fileExists).toBeTruthy();
  });

  it('topTreesSanFrancisco.json is a valid JSON', () => {
    expect(() =>
      JSON.parse(JSON.stringify(topTreesSanFrancisco)),
    ).not.toThrow();
  });
});

// describe('downloadImage', () => {
//   // const imageURL =
//   //   'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Acacia_melanoxylon.jpg/600px-Acacia_melanoxylon.jpg';
//   // const title = 'Acacia_melanoxylon';

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it('downloads and saves the image with the correct file name', async () => {
//     const expectedFileName = 'Sample-Image.jpg';
//     await downloadImage(imageURL, title);

//     expect(fetch).toHaveBeenCalledWith(imageURL);
//     expect(fs.writeFileSync).toHaveBeenCalledWith(
//       `./client/src/assets/images/data/${expectedFileName}`,
//       expect.any(Buffer),
//     );
//   });

//   it('downloads and saves the image with the correct file name', async () => {
//     const expectedFileName = 'Sample-Image.jpg';
//     await downloadImage(imageURL, title);

//     expect(fetch).toHaveBeenCalledWith(imageURL);
//     expect(fs.writeFileSync).toHaveBeenCalledWith(
//       `./client/src/assets/images/data/${expectedFileName}`,
//       expect.any(Buffer),
//     );
//   });

//   it('throws an error when the image download fails', async () => {
//     const errorMessage = 'Image download failed';
//     fetch.mockImplementationOnce(() =>
//       Promise.resolve({ ok: false, statusText: errorMessage }),
//     );

//     await expect(downloadImage(imageURL, title)).rejects.toThrow(
//       `Failed to download image: ${errorMessage}`,
//     );
//   });
// });

// // Mock the getResponseJSON and downloadImage functions
// jest.mock('./yourModule', () => ({
//   ...jest.requireActual('./yourModule'),
//   getResponseJSON: jest.fn(),
//   downloadImage: jest.fn(),
// }));

// describe('getWikiDataImages', () => {
//   it('fetches wiki data and processes images correctly', async () => {
//     // Mock data
//     const requestURLs = ['url1', 'url2'];
//     const mockResponse1 = {
//       query: {
//         pages: {
//           1: {
//             title: 'Title1',
//             fullurl: 'fullurl1',
//             extract: 'extract1',
//             thumbnail: { source: 'source1' },
//           },
//         },
//       },
//     };
//     const mockResponse2 = {
//       query: {
//         pages: {
//           2: { title: 'Title2', fullurl: 'fullurl2', extract: 'extract2' },
//         },
//       },
//     };

//     // Mock implementations
//     getResponseJSON.mockImplementation(async (url) => {
//       if (url === 'url1') return mockResponse1;
//       if (url === 'url2') return mockResponse2;
//       return null;
//     });

//     downloadImage.mockImplementation(
//       async (source, title) => `${title}-downloaded.jpg`,
//     );

//     // Run the function
//     const result = await getWikiDataImages(requestURLs);

//     // Verify the results
//     expect(result).toEqual({
//       Title1: {
//         imageURL: 'source1',
//         fullurl: 'fullurl1',
//         extract: 'extract1',
//         title: 'Title1',
//         imageFileName: 'Title1-downloaded.jpg',
//       },
//       Title2: {
//         imageURL: undefined,
//         fullurl: 'fullurl2',
//         extract: 'extract2',
//         title: 'Title2',
//         count: 1,
//       },
//     });

//     // Verify the mocked functions were called
//     expect(getResponseJSON).toHaveBeenCalledTimes(2);
//     expect(downloadImage).toHaveBeenCalledTimes(1);
//   });
// });
