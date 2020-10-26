import * as React from 'react';
import { Controller } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
} from '@material-ui/core';
import Widget from '../../components/Widget';
import ErrorMessageAll from '../error/ErrorPage';

export default function TreePlanter({ control, errors }) {
  const { user } = useAuth0();
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
      {errors.datePlanted && <ErrorMessageAll errors={errors} name={"datePlanted"}/>}


      <Controller
        as={TextField}
        name="organization"
        label="Organization"
        control={control}
        rules={{ required: true, minLength: 1, maxLength: 100 }}
        variant="standard"
        size="small"
      />
      {errors.organization && <ErrorMessageAll errors={errors} name={"organization"}/>}


      {/*<Controller
        as={TextField}
        name="volunteer"
        label="Planted By"
        control={control}
        rules={{ required: true, minLength: 1, maxLength: 100 }}
        variant="standard"
        size="small"
      />
      {errors.volunteer && <ErrorMessageAll errors={errors} name={"volunteer"}/>*/}
}
      {user && (
        <span>
          <InputLabel id="volunteer">Volunteer</InputLabel>
          <h4>{user}</h4>
        </span>
      )}

      <Controller
        as={TextField}
        name="ref"
        label="Reference Number"
        control={control}
        rules={{ required: true, minLength: 1, maxLength: 100 }}
        variant="standard"
        size="small"
      />
      {errors.ref && <ErrorMessageAll errors={errors} name={"ref"}/>}


    </Widget>
  );
}
