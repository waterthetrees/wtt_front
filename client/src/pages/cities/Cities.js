import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useQuery, useMutation, queryCache } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';

import { getData, postData } from '../../api/queries';
import City from './City';
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
  // console.log('cities', cities);
  return cities;
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function Cities(props) {
  const componentName = 'Cities';
  const {
    map,
    citiesData,
    citiesList,
  } = Object(props);
  console.log(componentName, 'citiesList', citiesList);
  // const cities = useQuery(['cities', { city: 'All' }], getData);
  // const { data, error } = cities || {};
  // const citiesData = data || null;
  // console.log('citiesData', citiesData);

  // const [coordinatesNewTree, setCoordinatesNewTree] = useState(null);
  // const [currentTreeId, setCurrentTreeId] = useState(null);
  // const [showTree, setShowTree] = useState(false);
  const [cityClicked, setCityClicked] = useState(null);
  //
  useEffect(() => {
  //   // if (isAuthenticated) mutateUser(['user', user]);
    // if (!citiesData) return;
    // if (!map) return;

    map.on('load', () => {
      if (map.hasImage('cityImage')) return;
      const cities = getFeatures(citiesData);
      const randNum = Math.floor(Math.random() * 100) + 1;
      const cityImage = `cityImage${randNum}`;
      map.loadImage(
        CITYIMAGE,
        (error, image) => {
          console.log('image', image);
          if (error) throw error;
          map.addImage(cityImage, image);
          map.addSource('cityFeatures', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: cities,
            },
          });
          map.addLayer({
            id: 'cities',
            type: 'symbol',
            source: 'cityFeatures',
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
      console.log('clicked', cityCurrent);

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      map.setCenter(coordinates);
      map.flyTo({
        center: coordinates,
        zoom: [12],
      });
      // map.setFeatureState({
      //   source: 'cityFeatures',
      //   id: cityCurrent,
      // }, {
      //   hover: true,
      // });

      if (citiesList.length) {
        if (!citiesList.includes(cityCurrent)) citiesList.push(cityCurrent);
        const citiesFilter = ['in', 'name', ['literal', [...citiesList]]];
        map.setFilter('cities', citiesFilter);
      } else {
        if (!citiesList.includes(cityCurrent)) citiesList.push(cityCurrent);
        const citiesFilter = ['!=', 'name', cityCurrent];
        map.setFilter('cities', citiesFilter);
      }

      setCityClicked(cityCurrent);
    });

    map.on('mouseenter', 'cities', () => {
      map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'cities', () => {
      map.getCanvas().style.cursor = '';
    });
  }, [map]);
  // if (error) return (<div>Failed to load trees</div>);
  return (
    <div className="TreeData">
      {cityClicked && (
        <City
          map={map}
          zoom={12}
          cityId={cityClicked}
        />
      )}
    </div>
  );
}

export default Cities;
