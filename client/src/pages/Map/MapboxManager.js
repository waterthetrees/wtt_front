import { REGION_TYPES } from '../../util/constants';

class MapboxManager {
  // map is expected to be nullable. Mostly serves as a way to pass in a mock in tests
  constructor(map) {
    this.map = map;
    this.mapLoadPromise = new Promise((resolve) => {
      this.onMapLoad = resolve;
    });
  }

  setMap(map) {
    this.map = map;
    this.onMapLoad();
  }

  getCenter() {
    if (!this.map) {
      return;
    }

    return this.map.getCenter();
  }

  // @param {LngLatLike} coords: See https://docs.mapbox.com/mapbox-gl-js/api/geography/#lnglatlike
  // (LngLat | {lng: number, lat: number} | {lon: number, lat: number} | [number, number])
  async setCenter({ coords, regionType }) {
    if (!coords) {
      throw new Error('No coordinates specified in setCenter');
    }

    await this.await_map_loaded();

    // We currently just take the first element in place_type if array
    // FIXME: We should choose either the smallest or largest region type instead
    if (Array.isArray(regionType)) {
      regionType = regionType[0];
    }

    switch (regionType) {
      case REGION_TYPES.COUNTRY:
        this.map.flyTo({
          center: coords,
          zoom: 4.5,
        });
        break;
      case REGION_TYPES.REGION:
        this.map.flyTo({
          center: coords,
          zoom: 6,
        });
        break;
      case REGION_TYPES.PLACE:
      case REGION_TYPES.DISTRICT:
      case REGION_TYPES.POSTAL_CODE:
        this.map.flyTo({
          center: coords,
          zoom: 12,
        });
        break;
      case REGION_TYPES.NEIGHBORHOOD:
      case REGION_TYPES.LOCALITY:
        this.map.flyTo({
          center: coords,
          zoom: 14,
        });
        break;
      case REGION_TYPES.ADDRESS:
      case REGION_TYPES.LATLONG:
      case REGION_TYPES.POI:
        this.map.flyTo({
          center: coords,
          zoom: 17,
        });
        break;
      default:
        this.map.flyTo({
          center: coords,
        });
    }
  }

  async addMarkerRefToMap(markerRef) {
    await this.await_map_loaded();
    markerRef.current.addTo(this.map);
  }

  async await_map_loaded() {
    if (!this.map) {
      await this.mapLoadPromise;
    }

    if (!this.map) {
      throw new Error("Something went wrong. Couldn't load map.");
    }
  }
}

export default MapboxManager;
