import React, { useState, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { convertSliderValuesToHealth, saveTimer } from './treedata_utilities';
import { addNewMarker } from './mapbox_utilities';

export default function TreeHealthSlider({
  currentTreeId, healthNum, health,
  mutateTreeData,
  lat, lng, map,
}) {
  // const componentName = 'TreeHealthSlider';
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [healthSaveAlert, setHealthSaveAlert] = useState('');
  const sliderRef = useRef(healthNum);

  const handleOnChange = () => {
    // const functionName = 'handleOnChange';
    if (!isAuthenticated) loginWithRedirect();
    const newHealth = convertSliderValuesToHealth(sliderRef.current.value);
    if (newHealth !== health) {
      setHealthSaveAlert('SAVING');
      const sendTreeData = {
        idTree: currentTreeId,
        health: newHealth,
      };
        // purely DOM marker so vectortiles don't need to rewrite until browser reload
      addNewMarker(newHealth, lng, lat, map);

      mutateTreeData.mutate(['tree', sendTreeData]);
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
          defaultValue={healthNum}
          onChange={handleOnChange}
        />
        <datalist id="healthSlider" aria-label="healthSlider">
          <option value="0" name="vacant" aria-label="vacant" />
          <option value="1" name="dead" aria-label="dead" />
          <option value="2" name="missing" aria-label="missing" />
          <option value="3" name="stump" aria-label="stump" />
          <option value="4" name="poor" aria-label="poor" />
          <option value="5" name="fair" aria-label="fair" />
          <option value="6" name="good" aria-label="good" />
        </datalist>
        <h3>
          {health && (
            <span id={health}>
              {sliderRef.current
                ? convertSliderValuesToHealth(sliderRef.current.value)
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
