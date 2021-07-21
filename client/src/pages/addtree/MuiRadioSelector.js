import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
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
import Widget from '../../components/Widget';

export default function MuiRadioSelector({
  label,
  options,
  control,
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
    <Widget title={label}>

      <FormControl className={classes.formControl}>
        <Controller
          as={(
            <RadioGroup
              row
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              onChange={handleChange}
            >
              {options.map((t) =>
                <FormControlLabel id={t} value={t} control={<Radio />} label={t} />)}
            </RadioGroup>
          )}
          name="treeType"
          control={control}
        />
      </FormControl>
    </Widget>
  );
}
