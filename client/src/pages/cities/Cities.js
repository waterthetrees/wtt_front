import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useQuery } from 'react-query';
import { getData } from '../../api/queries';
import City from '../city/City';
import config from '../../config';

const CITYIMAGE = 'assets/images/map/mapface.png';
mapboxgl.accessToken = config.mapbox.key;

function getFeatures(citiesData) {
  const cities = citiesData.map((city) => ({
    type: 'Feature',

    geometry: {
      type: 'Point',
      coordinates: [city.lng, city.lat],
    },
    properties: {
      'image-name': `${city.city}image`,
      name: city.city,
      cityCountTrees: `${city.cityCountTrees} trees`,
      id: `${city.city}Id`,
    },
  }));
  return cities;
}

function Cities(props) {
  // const componentName = 'Cities';
  const {
    map,
  } = Object(props);

  // CITIES
  const cities = useQuery(['cities', { city: 'All', fetchPolicy: 'cache-first' }], getData);
  const citiesData = cities.data || null;
  // CITIES
  const [countryClicked, setCountry] = useState('United States');
  const [cityClicked, setCityClicked] = useState(null);
  useEffect(() => {
    if (!map) return;
    if (!citiesData) return;
    // console.log('citiesData', citiesData);
    map.on('load', () => {
      if (map.hasImage('cityImage')) return;
      const cityFeaturesArray = getFeatures(citiesData);
      const randNum = Math.floor(Math.random() * 100) + 1;
      const cityImage = `cityImage${randNum}`;
      map.loadImage(
        CITYIMAGE,
        (error, image) => {
          if (error) throw error;
          map.addImage(cityImage, image);
          map.addSource('cityFeatures', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: cityFeaturesArray,
            },
          });
          map.addLayer({
            id: 'cities',
            type: 'symbol',
            source: 'cityFeatures',
            // minzoom: 5,
            maxzoom: 11,
            layout: {
              visibility: 'visible',
              'icon-image': cityImage,
              'icon-size': 0.5,
              'icon-text-fit': 'none',
              'icon-allow-overlap': true,
              'text-allow-overlap': false,
              'text-field': [
                'format',
                ['get', 'name'],
                { 'font-scale': 1.5 },
                '\n',
                {},
                ['get', 'cityCountTrees'],
                {
                  'font-scale': 0.8,
                  'text-font': [
                    'literal',
                    ['DIN Offc Pro Italic', 'Arial Unicode MS Regular'],
                  ],
                },
              ],
            },
            paint: {
              'text-color': '#000000',
            },
          });
        },
        {
          stretchX: [
            [10, 25],
            [25, 55],
          ],
          stretchY: [[25, 55]],
          content: [25, 25, 115, 100],
          pixelRatio: 2,
        },
      );
    });

    map.on('click', 'cities', (e) => {
      e.preventDefault();
      const coordinates = e.features[0].geometry.coordinates.slice();
      const cityCurrent = e.features[0].properties.name;

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      map.setCenter(coordinates);
      map.flyTo({
        center: coordinates,
        zoom: [12],
      });
      map.setFeatureState({
        source: 'cityFeatures',
        id: cityCurrent,
      }, {
        hover: true,
      });

      setCityClicked(cityCurrent);
    });

    map.on('mouseenter', 'cities', () => {
      map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'cities', () => {
      map.getCanvas().style.cursor = '';
    });
  }, [map, citiesData]);

  map.on('zoom', (e) => {
    if (!cityClicked) setCityClicked('%');
    const zoomLevel = map.getZoom();
    // beginning of country, need to get country from city record
    if (zoomLevel <= 9) setCountry('United States');
  });

  return (
    <div className="TreeData">
      {map && cityClicked && (
        <City
          map={map}
          cityName={cityClicked}
        />
      )}
    </div>
  );
}

export default Cities;
