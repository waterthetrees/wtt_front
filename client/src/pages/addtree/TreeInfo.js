import * as React from 'react';
import { Controller } from 'react-hook-form';
import {
  TextField,
  Select,
  MenuItem,
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MuiAutoComplete from './MuiAutoComplete';
import Widget from '../../components/Widget';

export default function TreeInfo({ control, coordinates }) {
  return (
    <Widget title="Tree Info" classes="treeinfo">

      <MuiAutoComplete control={control} coordinates={coordinates} keyName="common" />
      <MuiAutoComplete control={control} coordinates={coordinates} keyName="scientific" />
      <MuiAutoComplete control={control} coordinates={coordinates} keyName="genus" />

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

      <Controller
        as={(
          <Select>
            <MenuItem value={1}>One</MenuItem>
            <MenuItem value={2}>Two</MenuItem>
            <MenuItem value={3}>Three</MenuItem>
          </Select>
        )}
        name="age"
        control={control}
        variant="standard"
        size="small"
      />

    </Widget>

  );
}
