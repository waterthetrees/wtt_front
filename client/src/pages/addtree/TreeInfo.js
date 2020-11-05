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
      {errors.common && <ErrorMessageAll errors={errors} name="common" />}

      <MuiAutoComplete control={control} coordinates={coordinates} keyName="scientific" />
      {errors.scientific && <ErrorMessageAll errors={errors} name="scientific" />}

      <MuiAutoComplete control={control} coordinates={coordinates} keyName="genus" />
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

      <FormControl>
        <InputLabel id="dbh">DBH</InputLabel>
        <Controller
          as={(
            <Select>
              <MenuItem value="<1 inch">less than 1 inch</MenuItem>
              <MenuItem value="1">1 Inch</MenuItem>
              <MenuItem value="2">2 inch</MenuItem>
              <MenuItem value="3">3 inch</MenuItem>
              <MenuItem value="4">4 inch</MenuItem>
              <MenuItem value="5">5 inch</MenuItem>
              <MenuItem value="6">6 inch</MenuItem>
              <MenuItem value="7">7 inch</MenuItem>
              <MenuItem value="8">8 inch</MenuItem>
              <MenuItem value="9">9 inch</MenuItem>
              <MenuItem value="10">10 inch</MenuItem>
              <MenuItem value="11">11 inch</MenuItem>
              <MenuItem value="1">12 inch</MenuItem>
              <MenuItem value="13">13 inch</MenuItem>
              <MenuItem value="14">14 inch</MenuItem>
              <MenuItem value="15">15 inch</MenuItem>
              <MenuItem value="16">16 inch</MenuItem>
              <MenuItem value="17">17 inch</MenuItem>
              <MenuItem value="18">18 inch</MenuItem>
              <MenuItem value="19">19 inch</MenuItem>
              <MenuItem value="20">20 inch</MenuItem>
              <MenuItem value="21">21 inch</MenuItem>
              <MenuItem value="22">22 inch</MenuItem>
              <MenuItem value="23">23 inch</MenuItem>
              <MenuItem value="24">24 inch</MenuItem>
              <MenuItem value="30">30 inch</MenuItem>
              <MenuItem value="36">36 inch</MenuItem>
              <MenuItem value="42">42 inch</MenuItem>
              <MenuItem value="48">48 inch</MenuItem>
              <MenuItem value="56">56 inch</MenuItem>
            </Select>
          )}
          name="dbh"
          control={control}
          variant="standard"
          size="small"
        />
      </FormControl>
      {errors.dbh && <ErrorMessageAll errors={errors} name="dbh" />}

      <FormControl>
        <InputLabel id="age">Age</InputLabel>
        <Controller
          as={(
            <Select>
              <MenuItem value="1">1 Year</MenuItem>
              <MenuItem value="2">2 Years</MenuItem>
              <MenuItem value="3">3 Years</MenuItem>
              <MenuItem value="4">4 Years</MenuItem>
              <MenuItem value="5">5 Years</MenuItem>
              <MenuItem value="6">6 Years</MenuItem>
              <MenuItem value="7">7 Year</MenuItem>
              <MenuItem value="8">8 Years</MenuItem>
              <MenuItem value="9">9 Years</MenuItem>
              <MenuItem value="10">10 Years</MenuItem>
              <MenuItem value="15-20">15-20 Years</MenuItem>
              <MenuItem value="20-30">20-30 Years</MenuItem>
              <MenuItem value="30-40">30-40 Years</MenuItem>
              <MenuItem value="40-50">40-50 Years</MenuItem>
              <MenuItem value="50-60">50-60 Years</MenuItem>
              <MenuItem value="60-69">60-69 Years</MenuItem>
              <MenuItem value="70-79">70-79 Years</MenuItem>
              <MenuItem value="80-89">80-89 Years</MenuItem>
              <MenuItem value="90-99">90-99 Years</MenuItem>
              <MenuItem value="100">100 Years</MenuItem>
              <MenuItem value="110">110 Years</MenuItem>
              <MenuItem value="120">120 Years</MenuItem>
              <MenuItem value="130">130 Years</MenuItem>
              <MenuItem value="140">140 Years</MenuItem>
              <MenuItem value="150">150 Years</MenuItem>
              <MenuItem value="160">160 Years</MenuItem>
              <MenuItem value="170">170 Years</MenuItem>
              <MenuItem value="180">180 Years</MenuItem>
              <MenuItem value="200">200 Years</MenuItem>
              <MenuItem value="300">300 Years</MenuItem>
              <MenuItem value="400">400 Years</MenuItem>
              <MenuItem value="500">500 Years</MenuItem>
              <MenuItem value="600">600 Years</MenuItem>
              <MenuItem value="700">700 Years</MenuItem>
              <MenuItem value="900">900 Years</MenuItem>
              <MenuItem value="1000">1000 Years</MenuItem>
              <MenuItem value="1500">1500 Years</MenuItem>
              <MenuItem value="2000">2000 Years</MenuItem>
              <MenuItem value="2500">2500 Years</MenuItem>
              <MenuItem value="3000">3000 Years</MenuItem>
            </Select>
          )}
          name="age"
          control={control}
          variant="standard"
          size="small"
        />
      </FormControl>
      {errors.age && <ErrorMessageAll errors={errors} name="age" />}

      <FormControl>
        <InputLabel id="health">Health</InputLabel>
        <Controller
          as={(
            <Select>
              <MenuItem value="missing">missing</MenuItem>
              <MenuItem value="stump">stump</MenuItem>
              <MenuItem value="poor">poor</MenuItem>
              <MenuItem value="fair">fair</MenuItem>
              <MenuItem value="good">good</MenuItem>
            </Select>
          )}
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

const TreeCharacteristicsData = {
  age: [
    '0-1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '15-20',
    '20-30',
    '30-40',
    '40-50',
    '50-60',
    '60-69',
    '70-79',
    '80-89',
    '90-99',
    '100',
    '120',
    '130',
    '150',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
  ],
  width: [
    '<1 inch',
    '2 inch',
    '3 inch',
    '4 inch',
    '5 inch',
    '6 inch',
    '7 inch',
    '8 inch',
    '9 inch',
  ],
};
