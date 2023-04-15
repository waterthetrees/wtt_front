class MapboxCameraManager {
  constructor(initialMap) {
    this.map = initialMap;
  }

  setMapCenter({ lat, lng, regionType }) {
    this.map.flyTo({
      center: [lng, lat],
      zoom: 15,
    });
  }
}

export default MapboxCameraManager;
