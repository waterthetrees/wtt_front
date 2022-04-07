import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

const events = [
  ['dragstart', 'onDragStart'],
  ['drag', 'onDrag'],
  ['dragend', 'onDragEnd'],
];

// MapboxMarkerPortal bridges Mapbox and React.  It manages adding/removing a marker to/from the
// map, and creates a container div into which React will render the child components.
export default function MapboxMarkerPortal({
  map, visible, coordinates, options = {}, className = '', children, ...eventHandlers
}) {
  const [container, setContainer] = useState(null);
  const [addedToMap, setAddedToMap] = useState(false);
  const markerRef = useRef(null);

  useEffect(() => {
    const div = document.createElement('div');
    const marker = new mapboxgl.Marker({
      element: div,
      ...options,
    });

    events.forEach(([mapboxName, reactName]) => {
      const handler = eventHandlers[reactName];

      // TODO: passing a different eventHandlers prop
      // after the first render will have no effect. same with options.
      // TODO: make this easier to read and follow,
      // I've spent the last 20 minutes hunting for what the handler is
      // I liked being able to find an onclick handler, but I can't find it
      // I think we are using this add marker twice so not worth the obfuscation
      if (typeof handler === 'function') {
        marker.on(mapboxName, (event) => handler(event));
      }
    });

    // Calling add() on an empty className will throw, so check it first.
    if (className) {
      div.classList.add(className);
    }

    setContainer(div);
    markerRef.current = marker;

    // Return a cleanup function that will remove the marker from the map when we're unmounted.
    return () => {
      if (map && markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
        setContainer(null);
      }
    };
  }, []);

  useEffect(() => {
    if (coordinates) {
      markerRef.current.setLngLat(coordinates);
    }

    if (visible) {
      // Adding a marker to the map with null coordinates will throw an exception in Mapbox, so we
      // have to wait until visible is true *and* there are coordinates before adding it.
      if (!addedToMap && coordinates) {
        markerRef.current.addTo(map);
        setAddedToMap(true);
      }
    } else if (addedToMap) {
      markerRef.current.remove();
      setAddedToMap(false);
    }
  }, [visible, coordinates]);

  return container
    // Render this component's children into a portal rooted on the container element.  The map
    // will track the marker's location, but React will manage and render its UI.
    ? ReactDOM.createPortal(
      children,
      container,
    )
    : null;
}
