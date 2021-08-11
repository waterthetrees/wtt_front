import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function MapperFilter({ listItems, onChange }) {

  // 1. TODO we need state from the radio click to filter up to Mapper,
  // then down to cities -> City -> City -> makeLayerTile OR makeFunctionTile
  //  a. custom hook
  //  b. useReducer

  // 2. TODO - dont close the filter drawer when someone clicks the filter
  // up to the drawer

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Filter Trees</FormLabel>
      <RadioGroup aria-label="filtertrees" name="filtertrees" value={value} onChange={handleChange}>
        {listItems.map((l) => {
          <FormControlLabel value={l} control={<Radio />} label={l} />
        })}
      </RadioGroup>
    </FormControl>
  );
}
