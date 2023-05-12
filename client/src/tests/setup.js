/**
 * This setup file is automatically run before all jest tests
 * If you don't want to use these mocks on a specific test, use jest.unmock
 * Ex: jest.unmock('@/api/queries');
 */
import '@testing-library/jest-dom';

// FIXME: Add in mock data for other types of queries
jest.mock('@/api/queries', () => {
  const allAutoMocked = jest.createMockFromModule('@/api/queries');
  return {
    ...allAutoMocked,
    useTreeQuery: jest.fn(() => ({
      data: {
        id: '4709504126357728',
        common: 'CAMPHOR TREE',
        scientific: 'Cinnamomum camphora',
        genus: 'Cinnamomum ',
        address: '1816 ELM ST',
        city: 'Alameda',
        state: 'CA',
        zip: '94501',
        country: 'United States',
        neighborhood: 'Northside East',
        lng: -122.2427791,
        lat: 37.77022562,
        dbh: '13-18',
        height: '30-45',
        health: 'good',
        notes: null,
        planted: null,
        who: 'City of Alameda Public Works Dept',
        email: 'pw@alamedaca.gov',
        owner: 'Public',
        created: '2020-11-24T11:30:00.000Z',
        modified: '2022-07-01T00:00:00.000Z',
        idReference: '9056372',
        sourceId: 'Front',
        waterFreq: 14,
        datePlanted: null,
        locationTreeCount: '1',
        plantingOpt1: 'Acer rubrum October Glory',
        plantingOpt2: 'Tilia tomentosa',
        plantingOpt3: 'SILVER LINDEN',
        healthNum: 6,
      },
    })),
    useTreeHistoryQuery: jest.fn(() => ({
      data: [
        {
          id: '4914702656194240',
          watered: 'yes',
          mulched: null,
          weeded: null,
          staked: null,
          braced: null,
          pruned: null,
          liked: null,
          adopted: null,
          comment: 'Test',
          volunteer: 'park.mason',
          idTreehistory: 3955,
          dateVisit: '2023-01-29T22:48:43.000Z',
        },
      ],
    })),
    useSourceQuery: jest.fn(() => ({
      data: [
        {
          idSourceName: 'rochester',
          isoAlpha3: 'USA',
          country: 'United States of America',
          state: 'NY',
          city: 'Rochester',
          email: null,
          contact: null,
          phone: null,
          info: 'http://hub.arcgis.com/datasets/RochesterNY::trees-open-data',
          download:
            'https://opendata.arcgis.com/datasets/4c209944e2984b4a908a14b0cbe48075_0.zip',
          notes: null,
          filename: null,
          format: 'zip',
          longitude: null,
          latitude: null,
          license: null,
          broken: true,
        },
        {
          idSourceName: 'richardson',
          isoAlpha3: 'USA',
          country: 'United States of America',
          state: 'TX',
          city: 'Richardson',
          email: null,
          contact: null,
          phone: null,
          info: 'http://hub.arcgis.com/datasets/richardson::trees',
          download:
            'https://opendata.arcgis.com/datasets/cd10a9e85354488dbdb697ce97ccb064_0.csv',
          notes: null,
          filename: null,
          format: null,
          longitude: null,
          latitude: null,
          license: null,
          broken: false,
        },
      ],
    })),
  };
});
