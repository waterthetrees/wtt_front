import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false,
});

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
  name, useQuery = () => ({}), layer, map, setCurrentTreeId, setShowTree
}) {
  const { data } = useQuery();

  useEffect(() => {
    if (!map) return;

    map.addLayer({
      id: name,
      ...layer
    });

    map.on('click', name, ({ features: [{ properties: { id, id_tree } }] }) => {
      map.getCanvas().style.cursor = 'pointer';
      setCurrentTreeId(id || id_tree);
    });

    map.on('mousemove', name, ({ features: [feature], lngLat: { lng } }) => {
      // The treemap call returns an id, while public.treedata has id_tree
      const id = feature?.properties?.id || feature?.properties?.id_tree;

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
      map.getSource(name).setData(data);
    }
  }, [map, data]);

  return null;
}
