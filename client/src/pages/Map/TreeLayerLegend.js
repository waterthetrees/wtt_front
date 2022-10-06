import React, { useEffect, useState } from 'react';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  styled,
} from '@mui/material';
import { Close, FormatListBulleted } from '@mui/icons-material';

const CloseButton = (props) => (
  <IconButton
    size="small"
    title="Close map legend"
    sx={{
      margin: '-.35em -.5em 0 0',
      // We have to override the `mapboxgl-ctrl-group button` style that would otherwise
      // apply to this button.
      display: 'inline-block !important',
    }}
    {...props}
  >
    <Close />
  </IconButton>
);

const Dot = styled('div')(
  ({ color, filled }) => `
  width: 1em;
  height: 1em;
  margin-right: .25em;
  background-color: ${filled ? color : 'transparent'};
  border: solid 2px ${color};
  border-radius: 50%;
  display: inline-block;
`,
);

const DotCheckbox = ({ name, color, checked, onChange }) => (
  <Checkbox
    name={name}
    checked={checked}
    icon={<Dot color={color} />}
    // We pass a 1 or 0 for filled instead of a boolean, as React will complain otherwise.  This
    // does cause a filled="1" attribute to be applied to the div, but it's the simplest solution.
    // https://github.com/emotion-js/emotion/issues/2193
    checkedIcon={<Dot color={color} filled={1} />}
    onChange={onChange}
    sx={{ py: 0.5, pr: 0.5 }}
  />
);

const LayerControl = ({ layer, label, color, checked, onChange }) => (
  <FormControlLabel
    control={
      <DotCheckbox
        name={layer}
        checked={checked}
        color={color}
        onChange={onChange}
      />
    }
    label={label}
    sx={{
      mx: 0,
      pl: 0,
      pr: 1,
      userSelect: 'none',
      '&:hover': {
        backgroundColor: '#eee',
      },
    }}
  />
);

export default function TreeLayerLegend({
  map,
  title,
  layers,
  expanded = false,
}) {
  const defaultVisibility = layers.reduce(
    (result, { id }) => ({ ...result, [id]: true }),
    {},
  );
  const [layerVisibility, setLayerVisibility] = useState(defaultVisibility);
  const [isMapLoaded, setIsMapLoaded] = useState(map.loaded());
  const [isExpanded, setIsExpanded] = useState(expanded);

  useEffect(() => {
    if (!isMapLoaded) {
      const handleMapLoaded = () => {
        setIsMapLoaded(true);

        // Annoyingly, the visibility property defaults to undefined if it's not set when the layer
        // is added, even though the layer is visible by default.  So once the map is loaded, go
        // through all the layers and change undefined to visible.
        // https://github.com/mapbox/mapbox-gl-js/issues/8733
        for (const { id } of layers) {
          if (map.getLayoutProperty(id, 'visibility') === undefined) {
            map.setLayoutProperty(id, 'visibility', 'visible');
          }
        }
      };

      map.once('load', handleMapLoaded);
    }
  }, [map, isMapLoaded]);

  useEffect(() => {
    for (const { id } of layers) {
      if (map.getLayer(id)) {
        const currentVisible =
          map.getLayoutProperty(id, 'visibility') === 'visible';
        const nextVisible = layerVisibility[id];

        if (currentVisible !== nextVisible) {
          map.setLayoutProperty(
            id,
            'visibility',
            nextVisible ? 'visible' : 'none',
          );
        }
      }
    }
  }, [layerVisibility]);

  const handleChange = (event) => {
    const { name } = event.target;
    const nextVisible = !layerVisibility[name];

    setLayerVisibility({ ...layerVisibility, [name]: nextVisible });
  };

  const handleExpandClick = () => setIsExpanded(!isExpanded);

  return isExpanded ? (
    <Box sx={{ p: 1 }}>
      <FormControl component="fieldset" variant="standard">
        <FormLabel component="legend" sx={{ mb: 0.25 }}>
          {title}
          <CloseButton onClick={handleExpandClick} />
        </FormLabel>
        <FormGroup>
          {layers.map(({ id, label, color }) => (
            <LayerControl
              key={id}
              layer={id}
              label={label}
              color={color}
              checked={layerVisibility[id]}
              onChange={handleChange}
            />
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  ) : (
    <button type="button" title="Show map legend" onClick={handleExpandClick}>
      <FormatListBulleted />
    </button>
  );
}
