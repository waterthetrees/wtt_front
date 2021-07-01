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
  };

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
