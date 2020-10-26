import * as React from 'react';
import { Controller } from 'react-hook-form';

import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MuiAutoComplete from './MuiAutoComplete';
import Widget from '../../components/Widget';
import ErrorMessageAll from '../error/ErrorPage';

export default function TreeInfo({ control, coordinates, errors }) {

  return (
    <Widget title="Tree Info" classes="treeinfo">

      <MuiAutoComplete control={control} coordinates={coordinates} keyName="common" />
      {errors.common && <ErrorMessageAll errors={errors} name={'common'}/>}

      <MuiAutoComplete control={control} coordinates={coordinates} keyName="scientific" />
      {errors.scientific && <ErrorMessageAll errors={errors} name={'scientific'}/>}

      <MuiAutoComplete control={control} coordinates={coordinates} keyName="genus" />
      {errors.genus && <ErrorMessageAll errors={errors} name={'genus'}/>}
    
      <Controller
        as={TextField}
        type="date"
        name="datePlanted"
        control={control}
        rules={{ required: true, minLength: 1, maxLength: 100 }}
        label="Date Planted"
        variant="standard"
        size="small"
      />
      {errors.datePlanted && <ErrorMessageAll errors={errors} name={"datePlanted"}/>}

      <FormControl>
      <InputLabel id="width">Diameter</InputLabel>
      <Controller
        as={(
          <Select>
            <MenuItem value={1}>One Inch</MenuItem>
            <MenuItem value={2}>Two Inches</MenuItem>
            <MenuItem value={3}>Three Inches</MenuItem>
          </Select>
        )}
        name="width"
        control={control}
        variant="standard"
        size="small"
      />
      </FormControl>
      {errors.width && <ErrorMessageAll errors={errors} name={"width"}/>}

      <FormControl>
        <InputLabel id="age">Age</InputLabel>
      <Controller
        as={(
          <Select>
            <MenuItem value={1}>1 Year</MenuItem>
            <MenuItem value={2}>2 Years</MenuItem>
            <MenuItem value={3}>3 Years</MenuItem>
            <MenuItem value={4}>4 Years</MenuItem>
            <MenuItem value={5}>5 Years</MenuItem>
            <MenuItem value={6}>6 Years</MenuItem>
           
          </Select>
        )}
        name="age"
        control={control}
        variant="standard"
        size="small"
      />
      </FormControl>
      {errors.age && <ErrorMessageAll errors={errors} name={"age"}/>}

    </Widget>

  );
}
