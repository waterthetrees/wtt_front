import React, { useState, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { useQuery, useMutation, queryCache } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';

import { getData, postData } from '../../api/queries';
import TreeData from '../treedata/TreeData';
import config from '../../config';

mapboxgl.accessToken = config.mapbox.key;

function City(props) {
  const componentName = 'City';
  const {
    map,
    cityId,
  } = Object(props);
  // console.log(componentName, 'map', map);
  console.log(componentName, 'cityId', cityId);

  // const { isAuthenticated, user } = useAuth0();
  // const [mutateUser] = useMutation(postData, {
  //   onSuccess: () => {
  //     queryCache.invalidateQueries('user');
  //   },
  // });

  // getData from DB
  const city = useQuery(['city', { city: cityId }], getData);
  console.log(componentName, 'city', city);
  const cityData = Object(city.data);
  const error = Object(city.error);

  const [coordinatesNewTree, setCoordinatesNewTree] = useState(null);
  const [currentTreeId, setCurrentTreeId] = useState(null);
  const [showTree, setShowTree] = useState(false);

  useEffect(() => {
  //   // if (isAuthenticated) mutateUser(['user', user]);
    if (!cityData) return;
    if (!map) return;

    map.addSource(cityId, {
      type: 'geojson',
      data: cityData,
      cluster: false,
      clusterMaxZoom: 12, // Max zoom to cluster points on
      clusterRadius: 25, // Radius of each cluster when clustering points (defaults to 50)
    });

    map.addLayer({
      id: cityId,
      source: cityId, // this should be the id of source
      type: 'circle',
      filter: ['!', ['has', 'point_count']],
      // filter: ['has', 'point_count'],
      paint: {
        'circle-radius': [
          'case',
          ['boolean',
            ['feature-state', 'hover'],
            false,
          ],
        ],
        'circle-radius': {
          property: 'health',
          base: 1.75,
          stops: [
            [12, 2],
            [18, 280],
          ],
        },

        // "circle-color": "green",
        'circle-color': [
          'match',
          ['get', 'health'],
          'good', 'green',
          'fair', 'orange',
          'poor', 'red',
          'dead', 'black',
          'missing', 'darkgray',
          'stump', 'brown',
          /* other */ '#ccc',
        ],
      },
    });

    // map.addLayer({
    //   id: `${cityId}-unclustered-point`,
    //   type: 'circle',
    //   source: cityId,
    //   filter: ['!', ['has', 'point_count']],
    //   paint: {
    //     'circle-color': '#009900',
    //     'circle-radius': 4,
    //     'circle-stroke-width': 0,
    //     'circle-stroke-color': '#009900',
    //   },
    // });

    //   map.addLayer({
    //     id: `${cityId}clusters`,
    //     type: 'circle',
    //     source: cityId,
    //     filter: ['has', 'point_count'],
    //     paint: {
    //       // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
    //       // with three steps to implement three types of circles:
    //       //   * Blue, 20px circles when point count is less than 100
    //       //   * Yellow, 30px circles when point count is between 100 and 750
    //       //   * Pink, 40px circles when point count is greater than or equal to 750
    //       'circle-color': [
    //         'step',
    //         ['get', 'point_count'],
    //         '#009900',
    //         100,
    //         '#004c00',
    //         750,
    //         '#002d00',
    //         1000,
    //         '#005b00',
    //       ],
    //       'circle-radius': [
    //         'step',
    //         ['get', 'point_count'],
    //         20,
    //         100,
    //         30,
    //         750,
    //         40,
    //       ],
    //     },
    //   });

    //   map.addLayer({
    //     id: `${cityId}-cluster-count`,
    //     type: 'symbol',
    //     source: cityId,
    //     filter: ['has', 'point_count'],
    //     layout: {
    //       'text-field': '{point_count_abbreviated}',
    //       // 'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    //       'text-size': 12,
    //     },
    //   });

    //   // inspect a cluster on click
    //   map.on('click', `${cityId}clusters`, (e) => {
    //     const features = map.queryRenderedFeatures(e.point, {
    //       layers: [`${cityId}clusters`],
    //     });
    //     const clusterId = features[0].properties.cluster_id;
    //     map.getSource(cityId).getClusterExpansionZoom(
    //       clusterId,
    //       (err, zoomLevel) => {
    //         if (err) return;

    //         map.easeTo({
    //           center: features[0].geometry.coordinates,
    //           zoom: zoomLevel,
    //         });
    //       },
    //     );
    //   });

    // if (cityClicked) {

    // }
    // if (cityId) {
    // const cityFilter = [
    //   'any', ['all',
    //     ['!=', 'name', cityId],
    //   ]];
    // map.setFilter(cityId, cityFilter);

    // map.on('mouseenter', `${cityId}-unclustered-point`, () => {
    //   map.getCanvas().style.cursor = 'pointer';
    // });
    // map.on('mouseleave', `${cityId}-unclustered-point`, () => {
    //   map.getCanvas().style.cursor = '';
    // });

    map.on('click', cityId, (e) => {
      map.getCanvas().style.cursor = 'pointer';
      setCurrentTreeId(e.features[0].properties.id);
      setShowTree(true);
    });
    console.log(map.getZoom());
    if (map.getZoom() > 11) {
      let hoveredStateId = null;

      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      map.on('mousemove', cityId, (e) => {
        map.getCanvas().style.cursor = 'pointer';
        // Set variables equal to the current feature's magnitude, location, and time

        // Check whether features exist
        if (e.features.length > 0) {
          const { common, scientific, health } = e.features[0].properties;
          const healthExists = (health) ? `<h4>Health: ${health}</h4>` : '';
          // Display the magnitude, location, and time in the sidebar

          const HTML = `<div><h1>${common}</h1><h4>${scientific || ''}</h4>${healthExists}</div>`;

          // If quakeID for the hovered feature is not null,
          // use removeFeatureState to reset to the default behavior
          if (hoveredStateId) {
            map.removeFeatureState({
              source: cityId,
              id: hoveredStateId,
            });
            popup.remove();
            hoveredStateId = null;
          }

          hoveredStateId = e.features[0].properties.id;

          // When the mouse moves over the earthquakes-viz layer, update the
          // feature state for the feature under the mouse
          map.setFeatureState({
            source: cityId,
            id: hoveredStateId,
          }, {
            hover: true,
          });
          const coordinates = e.features[0].geometry.coordinates.slice();
          //       while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          //         coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          //       }
          popup.setLngLat(coordinates).setHTML(HTML).addTo(map);
        }
      });

      map.on('mouseenter', cityId, () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', cityId, () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
      });
    }

  //   // // When the mouse leaves the state-fill layer, update the feature state of the
  //   // // previously hovered feature.
  //   // console.log('hoveredStateId', hoveredStateId);
  //   // map.on('mouseleave', cityId, () => {
  //   //   if (hoveredStateId) {
  //   //     map.setFeatureState(
  //   //       { source: cityId, id: hoveredStateId },
  //   //       { hover: false },
  //   //     );
  //   //   }
  //   //   hoveredStateId = null;
  //   //   // lastId = undefined;
  //   //   console.log('hoveredStateId', hoveredStateId);
  //   //   map.getCanvas().style.cursor = '';
  //   //   popup.remove();
  //   // });
  //   // }
  //   // });
  //   // return () => {};
  //   // if (zoom <= 11) {
  //   //   map.removeSource(cityId);
  //   //   map.removeLayer(cityId);
    // }
  }, [cityData]);
  // console.log('currentTreeId', currentTreeId);
  // USER PROFILE
  // --------------------------
  // if (error) return (<div>Failed to load trees</div>);
  return (
    <div className="TreeData">
      {currentTreeId && (
        <TreeData
          currentTreeId={currentTreeId}
          showTree={showTree}
          setShowTree={setShowTree}
        />
      )}
    </div>
  );
}

export default City;
