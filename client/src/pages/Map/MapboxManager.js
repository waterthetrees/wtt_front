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
  setCenter({ coords, regionType }) {
    if (!this.map || !coords) {
      return;
    }

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

  addMarkerRefToMap(markerRef) {
    if (!this.map) {
      return;
    }
    markerRef.current.addTo(this.map);
  }
}

export default MapboxManager;
