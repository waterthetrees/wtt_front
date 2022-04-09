import React, { useState, useRef } from 'react';
import { Box, styled } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useTreeDataMutation, useCreateTreeDataMutation } from '@/api/queries';
import useAuthUtils from '@/components/Auth/useAuthUtils';
import { treeHealthUtil } from '@/util/treeHealthUtil';
import Section from '@/components/Section/Section';

const HealthInputSlider = styled('input')`
  -webkit-appearance: none;
  height: 20px;
  width: 100%;
  border-radius: 1px;
  margin: 0;
  background-color: #008c00; /* For browsers that do not support gradients */
  border: 1px solid #ddd;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;

  & .slider:hover {
    opacity: 1;
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 28px;
    height: 28px;
    border: 5px solid #666;
    background: #ddd;
    cursor: pointer;
  }
`;
const HealthDatalist = () => (
  <datalist id="healthSlider" aria-label="healthSlider">
    {treeHealthUtil.getNameValuePairs().map(([name, value]) => (
      <option key={name} value={value} name={name} aria-label={name} />
    ))}
  </datalist>
);

// Generate a style object with a linear gradient of solid colors for the health slider.
const healthSliderStyle = (() => {
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

  return {
    margin: '1em 0 .5em 0',
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    cursor: 'pointer',
  };
})();

export default function TreeHealth({ currentTreeData, isTreeQueryError }) {
  // Default the value to a normalized healthNum value, since many trees have bad healthNum data in
  // the vector tiles.
  const {
    healthNum, health, id,
  } = currentTreeData;
  const [healthSaveAlert, setHealthSaveAlert] = useState('');
  const sliderRef = useRef(treeHealthUtil.getNormalizedValue(healthNum));
  const { isAuthenticated } = useAuth0();
  const { loginToCurrentPage } = useAuthUtils();
  const mutateTreeData = useTreeDataMutation();
  const mutateCreateTreeData = useCreateTreeDataMutation();

  const handleOnChange = () => {
    const currentHealthValue = parseInt(sliderRef.current.value, 10);
    const newHealth = treeHealthUtil.getNameByValue(currentHealthValue);
    if (!isAuthenticated) {
      loginToCurrentPage();
    } else {
      if (isTreeQueryError && currentHealthValue !== healthNum) {
        setHealthSaveAlert('saving...');
        mutateCreateTreeData.mutate({
          ...currentTreeData,
          url: currentTreeData.download,
          health: newHealth,
          scientific: currentTreeData.scientific
          || currentTreeData.species,
          city: currentTreeData.city,
        });
        setTimeout(() => setHealthSaveAlert(''), 500);
      }

      if (currentHealthValue !== healthNum && !isTreeQueryError) {
        setHealthSaveAlert('saving...');
        mutateTreeData.mutate({ id, health: newHealth });

        setTimeout(() => setHealthSaveAlert(''), 500);
      }
    }
  };

  return (
    <Section title="Health">
      <HealthInputSlider
        ref={sliderRef}
        type="range"
        min="0"
        max="6"
        step="1"
        className="slider"
        list="healthSlider"
        id="healthSlider"
        value={treeHealthUtil.getNormalizedValue(healthNum)}
        style={healthSliderStyle}
        onChange={handleOnChange}
      />
      <HealthDatalist />
      <Box sx={{ textAlign: 'center' }}>
        <h4>
          <span>{health || 'good'}</span>
          {' '}
          {healthSaveAlert && (
            <span
              className="alert alert-success"
              role="alert"
            >
              {healthSaveAlert}
            </span>
          )}
        </h4>
      </Box>

    </Section>
  );
}
