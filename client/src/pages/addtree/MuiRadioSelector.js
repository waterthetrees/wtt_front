import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  FormHelperText,
  InputLabel,
  Radio,
} from '@material-ui/core';

export default function MuiRadioSelector ({
  label,
  options,
  setValue,
  value,
  }) {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const classes = useStyles();

  const handleChange = (event) => setValue(event.target.value);

  return (
    <div className="data">
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <RadioGroup
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={handleChange}
        >
          {options.map((t) =>
            <FormControlLabel id={t} value={t} control={<Radio />} label={t} />)}
        </RadioGroup>
      </FormControl>
    </div>
  );
}
