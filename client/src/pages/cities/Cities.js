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
      count: `${city.count} trees`,
      id: `${city.city}Id`,
    },
  }));
  return cities;
}

function Cities(props) {
  const componentName = 'Cities';
  const {
    map,
  } = Object(props);

  // CITIES
  const cities = useQuery(['cities', { city: 'All', fetchPolicy: 'cache-first' }], getData);
  const citiesData = cities.data || null;
  // CITIES

  const [cityClicked, setCityClicked] = useState(null);
  useEffect(() => {
    if (!map) return;
    if (!citiesData) return;
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
            minzoom: 5,
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
                ['get', 'count'],
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
        // The two (blue) columns of pixels that can be stretched horizontally:
        //   - the pixels between x: 25 and x: 55 can be stretched
        //   - the pixels between x: 85 and x: 115 can be stretched.
          stretchX: [
          // [25, 55],
          // [85, 115],
          // [45, 55],
          // [25, 115],
            [10, 25],
            [25, 55],
          ],
          // The one (red) row of pixels that can be stretched vertically:
          //   - the pixels between y: 25 and y: 100 can be stretched
          // stretchY: [[25, 100]],
          stretchY: [[25, 55]],
          // stretchY: [[45, 55]],
          // This part of the image that can contain text ([x1, y1, x2, y2]):
          content: [25, 25, 115, 100],
          // This is a high-dpi image:
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

      // if (citiesList.length) {
      //   if (!citiesList.includes(cityCurrent)) citiesList.push(cityCurrent);
      //   const citiesFilter = ['in', 'name', ['literal', [...citiesList]]];
      //   map.setFilter('cities', citiesFilter);
      // } else {
      //   if (!citiesList.includes(cityCurrent)) citiesList.push(cityCurrent);
      //   const citiesFilter = ['!=', 'name', cityCurrent];
      //   map.setFilter('cities', citiesFilter);
      // }

      setCityClicked(cityCurrent);
    });

    map.on('mouseenter', 'cities', () => {
      map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'cities', () => {
      map.getCanvas().style.cursor = '';
    });
  }, [map, citiesData]);

  return (
    <div className="TreeData">
      {map && cityClicked && (
        <City
          map={map}
          zoom={12}
          cityName={cityClicked}
        />
      )}
    </div>
  );
}

export default Cities;
