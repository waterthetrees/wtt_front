import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useTreeDataMutation } from '@/api/queries';
import useAuthUtils from '@/components/Auth/useAuthUtils';
import { treeHealth } from '@/util/treeHealth';
import Section from '../Section';
import { useDebounce, useDebouncedCallback } from 'use-debounce';

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
  const [value, setValue] = useState(healthNum);
  const [health, setHealth] = useState(treeHealth.getNameByValue(value));
  const { isAuthenticated } = useAuth0();
  const { loginToCurrentPage } = useAuthUtils();
  const mutateTreeData = useTreeDataMutation();

  const saveHealth = useDebouncedCallback(() => mutateTreeData.mutate({ id, health }), 750);

  const handleOnChange = (event) => {
    if (!isAuthenticated) {
      loginToCurrentPage();
    } else {
      const newValue = event.target.value;
      const newHealth = treeHealth.getNameByValue(newValue);

      setHealth(newHealth);
      setValue(newValue);
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
        <h4>{health}</h4>
      </Box>
    </Section>
  );
}
