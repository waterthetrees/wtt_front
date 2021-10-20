import mapboxgl from 'mapbox-gl';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { getData } from '../../api/queries';
import config from '../../config';
import Cities from '../cities/Cities';

const COUNTRYIMAGE = 'assets/images/map/mapface.png';
mapboxgl.accessToken = config.mapbox.key;

function getFeatures(countriesData) {
  const countries = countriesData.map((country) => ({
    type: 'Feature',

    geometry: {
      type: 'Point',
      // need coordinates for each country
      coordinates: [country.lng, country.lat],
    },
    properties: {
      'image-name': `${country.country}image`,
      name: country.country,
      countryCountTrees: `${country.countryCountTrees} trees`,
      id: `${country.country}Id`,
    },
  }));
  return countries;
}

function Countries(props) {
  const {
    map,
  } = Object(props);

  // COUNTRIES
  const countries = useQuery(['countries', { country: 'All', fetchPolicy: 'cache-first' }], getData);
  const countriesData = countries.data || null;
  const [countryClicked, setCountryClicked] = useState(null);
  useEffect(() => {
    if (!map) return;
    if (!countriesData) return;
    map.on('load', () => {
      if (map.hasImage('countryImage')) return;
      const countryFeaturesArray = getFeatures(countriesData);
      const randNum = Math.floor(Math.random() * 100) + 1;
      const countryImage = `countryImage${randNum}`;
      map.loadImage(
        COUNTRYIMAGE,
        (error, image) => {
          if (error) throw error;
          map.addImage(countryImage, image);
          map.addSource('countryFeatures', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: countryFeaturesArray,
            },
          });
          map.addLayer({
            id: 'countries',
            type: 'symbol',
            source: 'countryFeatures',
            // minzoom: 5,
            maxzoom: 11,
            layout: {
              visibility: 'none',
              'icon-image': countryImage,
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
                ['get', 'countryCountTrees'],
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

    map.on('click', 'countries', (e) => {
      e.preventDefault();
      const coordinates = e.features[0].geometry.coordinates.slice();
      const countryCurrent = e.features[0].properties.name;

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      map.setCenter(coordinates);
      map.flyTo({
        // default coordinates for on load map
        center: coordinates,
        zoom: [8],
      });
      map.setFeatureState({
        source: 'countryFeatures',
        id: countryCurrent,
      }, {
        hover: true,
      });

      setCountryClicked(countryCurrent);
    });

    map.on('mouseenter', 'countries', () => {
      map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'countries', () => {
      map.getCanvas().style.cursor = '';
    });
  }, [map, countriesData]);

  map.on('zoom', (e) => {
    if (!countryClicked) setCountryClicked('%');
    const zoomLevel = map.getZoom();
    // beginning of country, need to get country from city record
	  console.log('zoomeLevel',zoomLevel)
    if (zoomLevel < 8) {
      map.setLayoutProperty('countries', 'visibility', 'visible');
      // setCountry('United States');
    } else {
      map.setLayoutProperty('countries', 'visibility', 'none');
    }
  });

  return (
    <div>
      {map && (
        <Cities
          map={map}
        />
      )}
    </div>
  );
}

export default Countries;
