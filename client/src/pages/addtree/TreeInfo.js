import React, {useState} from 'react';
import { Controller } from 'react-hook-form';

import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import MuiAutoComplete from './MuiAutoComplete';
import Widget from '../../components/Widget';
import ErrorMessageAll from '../error/ErrorPage';
import { topFoodTrees } from '../data';

export default function TreeInfo({ control, coordinates, errors }) {
  const [treeList, setTreeList] = useState([{ common: 'Vacant Site', scientific: 'Vacant Site', genus: 'Vacant Site'}, ...topFoodTrees]);
  console.log('TREES', treeList);

  return (
    <Widget title="Tree Info" classes="treeinfo">

      <MuiAutoComplete control={control} coordinates={coordinates} keyName="common" options={treeList} />
      {errors.common && <ErrorMessageAll errors={errors} name="common" />}

      <MuiAutoComplete control={control} coordinates={coordinates} keyName="scientific" options={treeList} />
      {errors.scientific && <ErrorMessageAll errors={errors} name="scientific" />}

      <MuiAutoComplete control={control} coordinates={coordinates} keyName="genus" options={treeList} />
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
