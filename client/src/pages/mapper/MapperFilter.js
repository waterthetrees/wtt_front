import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function MapperFilter({ common, onmap }) {
  const [value, setValue] = React.useState('all');
  const handleChange = (event) => {
    setValue(event.target.value);
    console.log('event.target.value', event.target.value);
  };

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
        <FormControlLabel value="all" control={<Radio />} label="all" />
        <FormControlLabel value="health" control={<Radio />} label="health" />
        <FormControlLabel value="age" control={<Radio />} label="age" />
      </RadioGroup>
    </FormControl>
  );
}
