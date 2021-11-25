import React from 'react';
import { Controller } from 'react-hook-form';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import MuiAutoComplete from './MuiAutoComplete';
import Widget from '../../components/Widget';
import ErrorMessageAll from '../error/ErrorPage';
import { treeHealth } from '../../util/treeHealth';

// Create an array of DBH menu items: <1, 1 - 24, 30, 36, 42, 48, 56 inches.
const dbhItems = [
  <MenuItem key="<1 inch" value="<1 inch">less than 1"</MenuItem>
].concat(
  [...Array(25).keys()]
    .slice(1)
    .concat(30, 36, 42, 48, 56)
    .map(value => <MenuItem key={value} value={value}>{value}"</MenuItem>)
);

// Create an array of tree health items, reversed so that "good" comes first.
const healthItems = treeHealth.getNameValuePairs().reverse()
  .map(([name]) => <MenuItem key={name} value={name}>{name}</MenuItem>);

export default function TreeInfo({ treeList, register, control, errors }) {
  return (
    <Widget title="Tree Info" classes="treeinfo">

      <MuiAutoComplete control={control} keyName="common" optionValues={treeList} register={register} />
      {errors.common && <ErrorMessageAll errors={errors} name="common" />}

      <MuiAutoComplete control={control} keyName="scientific" optionValues={treeList} register={register} />
      {errors.scientific && <ErrorMessageAll errors={errors} name="scientific" />}

      <MuiAutoComplete control={control} keyName="genus" optionValues={treeList} register={register} />
      {errors.genus && <ErrorMessageAll errors={errors} name="genus" />}

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
      {errors.datePlanted && <ErrorMessageAll errors={errors} name="datePlanted" />}

      <FormControl
        variant="standard"
      >
        <InputLabel id="dbh">Diameter</InputLabel>
        <Controller
          as={<Select labelId="dbh">{dbhItems}</Select>}
          name="dbh"
          control={control}
          variant="standard"
          size="small"
        />
      </FormControl>
      {errors.dbh && <ErrorMessageAll errors={errors} name="dbh" />}

      <FormControl
        variant="standard"
      >
        <InputLabel id="health">Health</InputLabel>
        <Controller
          as={<Select labelId="health">{healthItems}</Select>}
          name="health"
          control={control}
          variant="standard"
          size="small"
        />
      </FormControl>
      {errors.health && <ErrorMessageAll errors={errors} name="health" />}

      <Controller
        as={TextField}
        name="notes"
        label="Notes"
        control={control}
        rules={{ required: false }}
        variant="standard"
        size="small"
      />
      {errors.notes && <ErrorMessageAll errors={errors} name="notes" />}

    </Widget>
  );
}
