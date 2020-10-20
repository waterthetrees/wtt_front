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
      <span>
        <label>Private Land</label>
        {' '}
        <Controller
          name="public"
          control={control}
          label="Public Land"
          render={(props) => (
            <Switch
              onChange={(e) => props.onChange(e.target.checked)}
              checked={props.value}
              name="public"
              color="primary"
              label="Public Land"
              size="medium"
            />
          )}
        />
        {' '}
        <label>Public Land</label>
      </span>
      <span>
        <Controller
          as={(
            <RadioGroup aria-label="owner" name="position" row>
              <FormControlLabel
                value="private"
                control={<Radio color="secondary" value="private" />}
                label="Private Land"
              />
              <FormControlLabel
                value="public"
                control={<Radio color="primary" value="public" />}
                label="Public Land"
              />
            </RadioGroup>
          )}
          name="owner"
          control={control}
          size="medium"
        />
      </span>

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
