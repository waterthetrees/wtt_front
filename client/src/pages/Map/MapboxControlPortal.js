import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

// MapboxControlPortal bridges Mapbox and React.  It manages adding/removing a control to/from the
// map, and creates a container div into which React will render the child components.
export default function MapboxControlPortal({ map, position, children }) {
  const [container, setContainer] = useState(null);
  // Use a ref to store an instance of the IControl interface from Mapbox:
  // https://docs.mapbox.com/mapbox-gl-js/api/markers/#icontrol  It needs to implement onAdd/Remove
  // methods that create or remove the parent that will contain the control's elements.  The
  // instance is passed to map.addControl() below once the map is available.
  const instanceRef = useRef({
    onAdd() {
      const div = document.createElement('div');

      div.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
      setContainer(div);

      return div;
    },

    onRemove() {
      // Since this method was created when the component was first mounted, use a state setter
      // function to get the current value of the container, then remove it if necessary.  If we
      // just referenced container directly, it would be null, which was its value when this method
      // was first instantiated.
      setContainer((container) => {
        if (container) {
          container.parentNode.removeChild(container);
        }

        // Set the container to null now that the control's container has been removed.
        return null;
      });
    },
  });

  useEffect(() => {
    if (map && !container) {
      map.addControl(instanceRef.current, position);
    }

    // Return a cleanup function that will remove the control from the map when we're unmounted.
    return () => {
      if (map && container) {
        map.remove(container);
      }
    };
  }, [map]);

  return container
    // Render this component's children into a portal rooted on the container element.  The map
    // will be aware of the control container and insert it in the appropriate control group, but
    // React will manage the control's state and contents.
    ? ReactDOM.createPortal(
      children,
      container,
    )
    : null;
}
