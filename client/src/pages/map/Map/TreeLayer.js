import { useEffect } from 'react';

// For TreeLayers that don't specify a query, use a noop function that returns an empty object so
// that destructuring data below will get an undefined.
const noopQuery = () => ({});

export default function TreeLayer({
  id, layer, map, useQuery = noopQuery, on = {}
}) {
  const { data } = useQuery();

  useEffect(() => {
    if (!map) return;

    map.addLayer({
      id,
      ...layer,
    });

    // Add any event handlers for the layer.
    Object.keys(on).forEach((eventName) => {
      map.on(eventName, id, on[eventName]);
    });
  }, [map]);

  // Update the source layer when the data changes.
  useEffect(() => {
    if (data?.features?.length) {
      map.getSource(id).setData(data);
    }
  }, [map, data]);

  // The map renders this layer, so there are no DOM elements to return.
  return null;
}
