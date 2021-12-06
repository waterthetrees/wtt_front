/* eslint-disable react/jsx-one-expression-per-line */
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

// Create an array of DBH/height menu items: [.25,.5,.75,1,2,3,4] inches.
const treeSmallValues = [0.25, 0.50, 0.75];
const treeLargeValues = [...Array(452).keys()];
treeLargeValues.shift();
const treeCharacteristics = [...treeSmallValues, ...treeLargeValues];

const dbhItems = treeCharacteristics.map((value) => (
  <MenuItem key={value} value={value}>{value} {value === 1 ? 'inch' : 'inches'}</MenuItem>));
const heightItems = treeCharacteristics.map((value) => (
  <MenuItem key={value} value={value}>{value} {value === 1 ? 'foot' : 'feet'}</MenuItem>));

// Create an array of tree health items, reversed so that "good" comes first.
const healthItems = treeHealth.getNameValuePairs().reverse()
  .map(([name]) => <MenuItem key={name} value={name}>{name}</MenuItem>);

export default function TreeInfo({
  treeList, register, control, errors,
}) {
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
        <InputLabel id="height">Height in feet</InputLabel>
        <Controller
          as={<Select labelId="height">{heightItems}</Select>}
          name="height"
          control={control}
          variant="standard"
          size="small"
        />
      </FormControl>
      {errors.height && <ErrorMessageAll errors={errors} name="height" />}

      <FormControl
        variant="standard"
      >
        <InputLabel id="dbh">Diameter in Inches</InputLabel>
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
