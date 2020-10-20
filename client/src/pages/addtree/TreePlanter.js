import * as React from 'react';
import { Controller } from 'react-hook-form';
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
} from '@material-ui/core';
import Widget from '../../components/Widget';

export default function TreePlanter({ control }) {
  return (
    <Widget title="Tree Planter" classes="treeplanter">
      <Controller
        name="owner2"
        control={control}
        render={(props) => (
          <Switch
            onChange={(e) => props.onChange(e.target.checked)}
            checked={props.value}
          />
        )}
      />

      <Controller
        as={(
          <RadioGroup aria-label="owner">
            <FormControlLabel
              value="public"
              control={<Radio />}
              label="Public Land"
            />
            <FormControlLabel value="private" control={<Radio />} label="Private Land" />
          </RadioGroup>
        )}
        name="owner"
        label="Owner"
        control={control}
        size="small"
      />

      <Controller
        as={TextField}
        name="organization"
        label="Organization"
        control={control}
        rules={{ required: true, minLength: 1, maxLength: 100 }}
        variant="standard"
        size="small"
      />

      <Controller
        as={TextField}
        name="volunteer"
        label="Planted By"
        control={control}
        rules={{ required: true, minLength: 1, maxLength: 100 }}
        variant="standard"
        size="small"
      />

      <Controller
        as={TextField}
        name="ref"
        label="Reference Number"
        control={control}
        rules={{ required: true, minLength: 1, maxLength: 100 }}
        variant="standard"
        size="small"
      />

    </Widget>
  );
}
