import React, { useState, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import mapboxgl from 'mapbox-gl';
import { useTreeDataMutation } from '../../api/queries';
import useAuthUtils from '../../components/Auth/useAuthUtils';
import { treeHealth } from '../../util/treeHealth';
import { saveTimer } from '../../util/constants';

function addTreeMarker(newHealth, lng, lat, map) {
  const newDot = document.createElement('div');

  // The dot's fill and stroke are picked up from the colors specified on the treemap layer.
  newDot.className = 'dot';

  new mapboxgl.Marker(newDot)
    .setLngLat([lng, lat])
    .addTo(map);
}

const HealthDatalist = () => (
  <datalist id="healthSlider" aria-label="healthSlider">
    { treeHealth.getNameValuePairs().map(([name, value]) => (
      <option key={name} value={value} name={name} aria-label={name} />
    ))}
  </datalist>
);

// Generate a style object with a linear gradient of solid colors for the health slider.
const healthSliderStyle = (() => {
  const healthPairs = treeHealth.getNameValuePairs();
  const count = healthPairs.length;
  const step = 100 / count;
  // To create a gradient with no blending, the same color has to be specified twice, with the same
  // end percentage as the next color.  So if there were 10 colors, this array would look like:
  // ['gray 0%, gray 10%', 'black 10%, black 20%', 'green 20%, green 30%', ...]
  const colors = healthPairs.map(([name, value]) => {
    const color = treeHealth.getColorByName(name, 'fill');

    return `${color} ${value * step}%, ${color} ${(value + 1) * step}%`;
  });

  return {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
  };
})();

export default function TreeHealthSlider({
  currentTreeId, healthNum, health, lat, lng, map,
}) {
  const { isAuthenticated } = useAuth0();
  const [healthSaveAlert, setHealthSaveAlert] = useState('');
  const mutateTreeData = useTreeDataMutation();
  const sliderRef = useRef(null);
  const { loginToCurrentPage } = useAuthUtils();

  const handleOnChange = () => {
    const newHealth = treeHealth.getNameByValue(sliderRef.current.value);

    if (!isAuthenticated) {
      loginToCurrentPage();

      return health;
    }

    if (newHealth !== health) {
      const sendTreeData = {
        id: currentTreeId,
        health: newHealth,
      };

      // Add DOM marker so vectortiles doesn't need to update until browser reload.
      addTreeMarker(newHealth, lng, lat, map);
      setHealthSaveAlert('SAVING');
      mutateTreeData.mutate(sendTreeData);
      setTimeout(() => setHealthSaveAlert(''), saveTimer);
    }

    return newHealth;
  };

  return (
    <div className="flex-grid border-top text-center">
      <div className="treehistory-list">
        <h4>Overall Health</h4>
      </div>
      <div className="tree__status">
        <input
          ref={sliderRef}
          type="range"
          min="0"
          max="6"
          step="1"
          className="slider"
          list="healthSlider"
          id="healthSlider"
          style={healthSliderStyle}
          defaultValue={healthNum}
          onChange={handleOnChange}
        />
        <HealthDatalist />
        <h3>
          {health && (
            <span id={health}>
              {sliderRef.current
                ? treeHealth.getNameByValue(sliderRef.current.value)
                : health}
            </span>
          )}
        </h3>
        {healthSaveAlert && (
          <div
            className="alert alert-success"
            role="alert"
          >
            {healthSaveAlert}
          </div>
        )}
      </div>
    </div>
  );
}
