import MapboxManager from '@/pages/Map/MapboxManager';
import { REGION_TYPES } from '@/util/constants';

describe('Test mapboxManager', () => {
  const mapMock = {
    flyTo: jest.fn(() => {}),
    getCenter: jest.fn(() => 9),
  };
  const mapboxManager = new MapboxManager(mapMock);
  const mapboxManagerWithoutMap = new MapboxManager();
  const coords = [37.75034979203168, -122.41554467258297];

  afterEach(() => {
    mapboxManagerWithoutMap.setMap(null);
  });

  it('calls mapboxManager setCenter happy path', async () => {
    await mapboxManager.setCenter({ coords, regionType: REGION_TYPES.PLACE });
    expect(mapMock.flyTo).toBeCalledWith({
      center: coords,
      zoom: 12,
    });

    await mapboxManager.setCenter({ coords, regionType: REGION_TYPES.LATLONG });
    expect(mapMock.flyTo).toBeCalledWith({
      center: coords,
      zoom: 17,
    });

    await mapboxManager.setCenter({
      coords,
      regionType: [REGION_TYPES.LATLONG, REGION_TYPES.LOCALITY],
    });
    expect(mapMock.flyTo).toBeCalledWith({
      center: coords,
      zoom: 17,
    });

    const setCenterPromise = mapboxManagerWithoutMap.setCenter({
      coords,
      regionType: REGION_TYPES.COUNTRY,
    });
    mapboxManagerWithoutMap.setMap(mapMock);
    await setCenterPromise;
    expect(mapMock.flyTo).toBeCalledWith({
      center: coords,
      zoom: 4.5,
    });
  });

  // Unknown region types all default to same result as not passing region type at all
  it('calls mapboxManager setCenter with unknown region type', async () => {
    await mapboxManager.setCenter({ coords });
    expect(mapMock.flyTo).toBeCalledWith({
      center: coords,
    });

    await mapboxManager.setCenter({ coords, regionType: REGION_TYPES.CITY });
    expect(mapMock.flyTo).toBeCalledWith({
      center: coords,
    });
  });

  // More test cases should eventually fall into this category
  it('calls mapboxManager setCenter and throws error', async () => {
    try {
      await mapboxManager.setCenter();
    } catch (e) {
      expect(e).toBeInstanceOf(TypeError);
    }

    try {
      await mapboxManager.setCenter(coords, REGION_TYPES.PLACE);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }

    try {
      await mapboxManager.setCenter({ regionType: REGION_TYPES.PLACE });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });

  it('calls mapboxManager getCenter happy path', () => {
    const center = mapboxManager.getCenter();
    expect(center).toBe(9);
  });

  it('calls mapboxManager getCenter and quietly fails', () => {
    const center = mapboxManagerWithoutMap.getCenter();
    expect(center).toBe(undefined);
  });
});
