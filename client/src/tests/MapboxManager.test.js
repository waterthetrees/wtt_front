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

  it('calls mapboxManager setCenter happy path', () => {
    mapboxManager.setCenter({ coords, regionType: REGION_TYPES.PLACE });
    expect(mapMock.flyTo).toBeCalledWith({
      center: coords,
      zoom: 12,
    });
    mapboxManager.setCenter({ coords, regionType: REGION_TYPES.LATLONG });
    expect(mapMock.flyTo).toBeCalledWith({
      center: coords,
      zoom: 17,
    });

    mapboxManager.setCenter({
      coords,
      regionType: [REGION_TYPES.LATLONG, REGION_TYPES.LOCALITY],
    });
    expect(mapMock.flyTo).toBeCalledWith({
      center: coords,
      zoom: 17,
    });

    mapboxManagerWithoutMap.setCenter({
      coords,
      regionType: REGION_TYPES.COUNTRY,
    });
    mapboxManagerWithoutMap.setMap(mapMock);
    expect(mapMock.flyTo).toBeCalledWith({
      center: coords,
      zoom: 4.5,
    });
    mapboxManagerWithoutMap.setMap(null);
  });

  // Unknown region types all default to same result as not passing region type at all
  it('calls mapboxManager setCenter with unknown region type', () => {
    mapboxManager.setCenter({ coords });
    expect(mapMock.flyTo).toBeCalledWith({
      center: coords,
    });

    mapboxManager.setCenter({ coords, regionType: REGION_TYPES.CITY });
    expect(mapMock.flyTo).toBeCalledWith({
      center: coords,
    });
  });

  // More test cases should eventually fall into this category
  it('calls mapboxManager setCenter and throws error', () => {
    expect(() => mapboxManager.setCenter()).toThrowError(TypeError);

    expect(() =>
      mapboxManager.setCenter(coords, REGION_TYPES.PLACE),
    ).toThrowError(Error);

    expect(() =>
      mapboxManager.setCenter({ regionType: REGION_TYPES.PLACE }),
    ).toThrowError(Error);
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
