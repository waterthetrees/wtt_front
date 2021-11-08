import mapboxgl from 'mapbox-gl';
import { getHealthColor } from './treeDataUtils';

export const addNewMarker = (newHealth, lng, lat, map) => {
  const newDot = document.createElement('div');
  newDot.className = 'dot';
  const healthColor = getHealthColor(newHealth);
  // newDot.style.borderColor = healthColor;
  newDot.style.backgroundColor = healthColor;
  new mapboxgl.Marker(newDot)
    .setLngLat([lng, lat])
    .addTo(map);
};
