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
import { testNatives } from '../data/testNatives';
import { topCaliforniaNativeTrees } from '../data/topCaliforniaNativeTrees';

function chooseData(treeList) {
  return {
    'California Natives': topCaliforniaNativeTrees,
    'Food Trees': testNatives,
  }[treeList];
}

export default function MuiRadioSelector (props) {
  const typeArray = ['California Natives', 'Food Trees'];
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
  const [value, setValue] = useState(typeArray[0]);

  const handleChange = (event) => setValue(event.target.value);

  return (
    <div className="data">
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Tree Type</InputLabel>
        <RadioGroup
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={handleChange}
        >
          {typeArray.map((t) =>
            <FormControlLabel id={t} value={t} control={<Radio />} label={t} />)}
        </RadioGroup>
      </FormControl>
    </div>
  );
}
