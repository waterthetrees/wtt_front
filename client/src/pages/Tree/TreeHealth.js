import React, { useEffect, useState } from 'react';
import { Box, styled } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useDebouncedCallback } from 'use-debounce';
import { useCreateOrUpdateTree } from '@/api/queries';
import useAuthUtils from '@/components/Auth/useAuthUtils';
import { treeHealthUtil } from '@/util/treeHealthUtil';
import Section from '@/components/Section/Section';

const HealthDatalist = () => (
  <datalist id="healthSlider" aria-label="healthSlider">
    {treeHealthUtil.getNameValuePairs().map(([name, value]) => (
      <option key={name} value={value} name={name} aria-label={name} />
    ))}
  </datalist>
);

// Generate a list of colors and step percentages that we'll inject into the styled slider below.
const healthSliderGradientSteps = (() => {
  const healthPairs = treeHealthUtil.getNameValuePairs();
  const count = healthPairs.length;
  const step = 100 / count;
  // To create a gradient with no blending, the same color has to be specified twice, with the same
  // end percentage as the next color.  So if there were 10 colors, this array would look like:
  // ['gray 0%, gray 10%', 'black 10%, black 20%', 'green 20%, green 30%', ...]
  const colors = healthPairs.map(([name, value]) => {
    const color = treeHealthUtil.getColorByName(name, 'fill');

    return `${color} ${value * step}%, ${color} ${(value + 1) * step}%`;
  });

  return colors.join(', ');
})();
// Separate the thumb styles in their own string so we can use them for both the webkit and moz
// thumb pseudo-elements.  (Using both of those selectors in the same rule doesn't seem to work.)
const healthSliderThumbStyle = `
  appearance: none;
  width: 28px;
  height: 28px;
  border: 5px solid #666;
  background: #ddd;
  cursor: pointer;
`;

const HealthInputSlider = styled('input')`
  width: 100%;
  height: 20px;
  border-radius: 1px;
  margin: 1em 0 .5em 0;
  background-image: linear-gradient(to right, ${healthSliderGradientSteps});
  background-color: #008c00; /* For browsers that do not support gradients */
  border: 1px solid #ddd;
  outline: none;
  cursor: pointer;
  opacity: 0.7;
  appearance: none;
  transition: opacity 0.2s;

  &::-webkit-slider-thumb {
    ${healthSliderThumbStyle}
  }

  &::-moz-range-thumb {
    ${healthSliderThumbStyle}
  }
`;

export default function TreeHealth({ currentTreeData: { id, healthNum } }) {
  // Default the value to a normalized healthNum value, since many trees have bad healthNum data in
  // the vector tiles.
  const [value, setValue] = useState(treeHealthUtil.getNormalizedValue(healthNum));
  const { isAuthenticated } = useAuth0();
  const { loginToCurrentPage } = useAuthUtils();
  const createOrUpdateTree = useCreateOrUpdateTree();

  const saveHealth = useDebouncedCallback((newValue) => {
    createOrUpdateTree({ id, health: treeHealthUtil.getNameByValue(newValue) });
  }, 750, { leading: true, trailing: true });

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
      const newValue = event.target.value;

      // Set the local numeric health value in state immediately, but wait 750ms before sending the
      // change to the backend, in case the user is in the middle of dragging the slider.
      setValue(newValue);
      saveHealth(newValue);
    }
  };

  // If there's a debounced call to save the current health, flush it so it's posted to the
  // backend in case the component is being unmounted.
  const handleOnBlur = () => saveHealth.flush();

  return (
    <Section title="Health">
      <HealthInputSlider
        type="range"
        id="healthSlider"
        list="healthSlider"
        min="0"
        max="6"
        step="1"
        value={value}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
      />
      <HealthDatalist />
      <Box sx={{ textAlign: 'center' }}>
        <h4>{treeHealthUtil.getNameByValue(value)}</h4>
      </Box>
    </Section>
  );
}
