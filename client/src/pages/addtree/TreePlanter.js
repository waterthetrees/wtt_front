import React from 'react';
import { Controller } from 'react-hook-form';
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import Widget from '../../components/Widget';
import ErrorMessageAll from '../error/ErrorPage';

export default function TreePlanter({ control, errors }) {
  return (
    <Widget title="Tree Planter" classes="treeplanter">
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
      {errors.owner && <ErrorMessageAll errors={errors} name="owner" />}

      <Controller
        as={TextField}
        name="who"
        label="Organization"
        control={control}
        rules={{ required: false, minLength: 1, maxLength: 100 }}
        variant="standard"
        size="small"
      />
      {errors.who && <ErrorMessageAll errors={errors} name="who" />}

      <Controller
        as={TextField}
        name="volunteer"
        label="Volunteer Name"
        control={control}
        rules={{ required: true }}
        variant="standard"
        size="small"
        disabled
      />

      <Controller
        as={TextField}
        name="email"
        label="Volunteer Email"
        control={control}
        rules={{ required: true }}
        variant="standard"
        size="small"
        disabled
      />

      <Controller
        as={TextField}
        name="idReference"
        label="Reference Number"
        control={control}
        rules={{ required: true, minLength: 1, maxLength: 100 }}
        variant="standard"
        size="small"
      />
      {errors.idReference && <ErrorMessageAll errors={errors} name="idReference" />}

    </Widget>
  );
}
