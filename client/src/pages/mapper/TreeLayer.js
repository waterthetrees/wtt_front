import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false,
});

// For TreeLayers that don't specify a query, use a noop function that returns an empty object so
// that destructuring data below will get an undefined.
const noopQuery = () => ({});

function createPopupHTML({ common, scientific }) {
  const commonString = common
    ? `<h4>${common}</h4>`
    : '';
  const scientificString = scientific && scientific !== common
    ? `<h5>${scientific}</h5>`
    : '';

  return `<div>${commonString}${scientificString}</div>`;
}

export default function TreeLayer({
  name, useQuery = noopQuery, layer, map, setCurrentTreeId,
}) {
  const { data } = useQuery();

  useEffect(() => {
    if (!map) return;

    map.addLayer({
      id: name,
      ...layer,
    });

    map.on('click', name, ({ features: [{ properties: { id } }] }) => {
      console.log('TreeLayer map on click id', id);
      map.getCanvas().style.cursor = 'pointer';
      setCurrentTreeId(id);
    });

    map.on('mousemove', name, ({ features: [feature], lngLat: { lng } }) => {
      // The treemap call returns an id, while public.treedata has id_tree
      const id = feature?.properties?.id;

      if (id) {
        const coordinates = feature.geometry.coordinates.slice();
        const html = createPopupHTML(feature.properties);

        // Ensure that if the map is zoomed out such that multiple copies of the feature are
        // visible, the popup appears over the copy being pointed to.
        while (Math.abs(lng - coordinates[0]) > 180) {
          coordinates[0] += lng > coordinates[0] ? 360 : -360;
        }

        popup.setLngLat(coordinates).setHTML(html).addTo(map);
        map.getCanvas().style.cursor = 'pointer';
      }
    });

    map.on('mouseleave', name, () => {
      map.getCanvas().style.cursor = '';
      popup.remove();
    });
  }, [map]);

  // Update the source layer when the data changes.
  useEffect(() => {
    if (data?.features?.length) {
      console.log(data.feature, name);
      map.getSource(name).setData(data);
    }
  }, [map, data]);

  // The map renders this layer, so there are no DOM elements to return.
  return null;
}
