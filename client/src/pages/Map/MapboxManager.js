import { REGION_TYPES } from '../../util/constants';

class MapboxManager {
  constructor() {
    this.map = null;
  }

  setMap(map) {
    this.map = map;
  }

  setCenterAndZoom({ lat, lng, regionType }) {
    if (!this.map) {
      return;
    }
    if (!regionType) {
      this.map.flyTo({
        center: [lng, lat],
      });
    }
    this.map.flyTo({
      center: [lng, lat],
      zoom: 15,
    });
  }
}

export default MapboxManager;
