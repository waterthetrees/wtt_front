import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useDebouncedCallback } from 'use-debounce';
import { useTreeDataMutation } from '@/api/queries';
import useAuthUtils from '@/components/Auth/useAuthUtils';
import { treeHealth } from '@/util/treeHealth';
import Section from '../Section';

const HealthDatalist = () => (
  <datalist id="healthSlider" aria-label="healthSlider">
    {treeHealth.getNameValuePairs().map(([name, value]) => (
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
    margin: '1em 0 .5em 0',
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    cursor: 'pointer',
  };
})();

export default function Health({ currentTreeData: { id, healthNum } }) {
  // Default the value to a normalized healthNum value, since many trees have bad healthNum data in
  // the vector tiles.
  const [value, setValue] = useState(treeHealth.getNormalizedValue(healthNum));
  const { isAuthenticated } = useAuth0();
  const { loginToCurrentPage } = useAuthUtils();
  const mutateTreeData = useTreeDataMutation();

  const saveHealth = useDebouncedCallback(() => {
    mutateTreeData.mutate({ id, health: treeHealth.getNameByValue(value) });
  }, 750);

  useEffect(() => {
    if (Number.isInteger(healthNum) && healthNum !== value) {
      // The healthNum prop is valid and different from our state, so update the value state to it.
      setValue(healthNum);
    }
  }, [healthNum]);

  const handleOnChange = (event) => {
    if (!isAuthenticated) {
      loginToCurrentPage();
    } else {
      // Set the local numeric health value in state immediately, but wait 750ms before sending the
      // change to the backend, in case the user is in the middle of dragging the slider.
      setValue(event.target.value);
      saveHealth();
    }
  };

  // If there's a debounced call to save the current health, flush it so it's posted to the
  // backend in case the component is being unmounted.
  const handleOnBlur = () => saveHealth.flush();

  return (
    <Section title="Health">
      <input
        type="range"
        min="0"
        max="6"
        step="1"
        className="slider"
        list="healthSlider"
        id="healthSlider"
        style={healthSliderStyle}
        value={value}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
      />
      <HealthDatalist />
      <Box sx={{ textAlign: 'center' }}>
        <h4>{treeHealth.getNameByValue(value)}</h4>
      </Box>
    </Section>
  );
}
