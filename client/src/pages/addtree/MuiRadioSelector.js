import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import makeStyles from '@mui/styles/makeStyles';
import {
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  FormHelperText,
  InputLabel,
  Radio,
} from '@mui/material';
import Widget from '../../components/Widget';

export default function MuiRadioSelector({
  register,
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

  return (
    <Widget title={label}>

      <FormControl className={classes.formControl}>
        <Controller
          as={(
            <RadioGroup
              {...register('treeType')}
              row
              id="demo-simple-select"
              value={value}
            >
              {options.map((t) =>
                <FormControlLabel key={t} id={t} value={t} control={<Radio />} label={t} />)}
            </RadioGroup>
          )}
          name="treeType"
          control={control}
        />
      </FormControl>
    </Widget>
  );
}
