export default function getCityCenters(cities) {
  if (cities.data && cities.data.length > 0) {
    const cities = [
      { cityName: 'Alameda', cityCenterCoordinates: [37.7708222, -122.2765277] },
      { cityName: 'Oakland', cityCenterCoordinates: [37.8047775, -122.2748819] },
      { cityName: 'San Francisco', cityCenterCoordinates: [-122.5131953, 37.8136669] },
    ];
    return cities;
  }
}
