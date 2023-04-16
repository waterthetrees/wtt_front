import { REGION_TYPES } from '../../util/constants';

class MapboxManager {
  constructor() {
    this.map = null;
  }

  setMap(map) {
    this.map = map;
  }

  // @param {LngLatLike} coords: See https://docs.mapbox.com/mapbox-gl-js/api/geography/#lnglatlike
  // (LngLat | {lng: number, lat: number} | {lon: number, lat: number} | [number, number])
  setCenterAndZoom({ coords, regionType }) {
    if (!this.map) {
      return;
    }

    switch (regionType) {
      case REGION_TYPES.ADDRESS:
      case REGION_TYPES.LATLONG:
        this.map.flyTo({
          center: coords,
          zoom: 15,
        });
        break;
      case REGION_TYPES.COUNTRY:
        this.map.flyTo({
          center: coords,
          zoom: 15,
        });
        break;
      default:
        this.map.flyTo({
          center: coords,
        });
    }
  }
}

export default MapboxManager;
