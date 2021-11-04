import React, { useEffect, useState } from 'react';
import { useCitiesQuery } from '../../api/queries';
import City from '../city/City';

const CITYIMAGE = 'assets/images/map/mapface.png';

function getFeatures(citiesData) {
  return citiesData.map((city) => ({
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
}

function Cities(props) {
  const {
    map,
  } = Object(props);

  // CITIES
  const { data: citiesData } = useCitiesQuery();
  const [cityClicked, setCityClicked] = useState(null);

  useEffect(() => {
    if (!map || !citiesData) return;

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
      const coordinates = e.features[0].geometry.coordinates.slice();
      const cityCurrent = e.features[0].properties.name;

      e.preventDefault();

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

    map.on('zoom', () => {
      const zoomLevel = map.getZoom();

      if (!cityClicked) setCityClicked('%');

      // beginning of country, need to get country from city record
      if (zoomLevel <= 7) {
        map.setLayoutProperty('cities', 'visibility', 'none');
      } else {
        map.setLayoutProperty('cities', 'visibility', 'visible');
      }
    });
  }, [map, citiesData]);

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
