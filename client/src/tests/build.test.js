// TODO - add tests for the build script
// Currently this is just a placeholder file, we need to move the server to es6 modules and add tests

import path from 'path';
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
