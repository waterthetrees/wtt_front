import { useEffect } from 'react';

// For TreeLayers that don't specify a query, use a noop function that returns an empty object so
// that destructuring data below will get an undefined.
const noopQuery = () => ({});

export default function TreeLayer({
  id,
  layer,
  map,
  useQuery = noopQuery,
  on = {},
}) {
  // useCitiesQuery and useTreemapQuery are getting passed in here, abstracting the queries from react-query.
  // TODO Prefer just using the actual queries with switch from id here
  // to make the code faster to read and less props
  const { data } = useQuery();

  useEffect(() => {
    if (!map) return;
    if (!map.getLayer(id)) {
      map.addLayer({
        id,
        ...layer,
      });

      // Add any event handlers for the layer.
      // TODO: this is obfuscated not super easy to follow.
      // Make more clear what the events are
      // and what's using useQuery.
      Object.keys(on).forEach((eventName) => {
        map.on(eventName, id, on[eventName]);
      });
    }
  }, [map, data]);

  // Update the source layer when the data changes.
  useEffect(() => {
    if (data?.features?.length && id) {
      map.getSource(id).setData(data);
    }
  }, [map, data]);

  // The map renders this layer, so there are no DOM elements to return.
  return null;
}
