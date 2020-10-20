import * as React from 'react';
import { Controller } from 'react-hook-form';
import {
  TextField,
  Select,
  MenuItem,
} from '@material-ui/core';
import Widget from '../../components/Widget';

export default function TreeAddress({ control, coordinates }) {
  const { lng, lat } = Object(coordinates);
  console.log('lng, lat', lng, lat);
  return (
    <Widget title="Tree Location" classes="treelocation">

      <Controller
        as={TextField}
        name="address"
        control={control}
        rules={{ required: true, minLength: 1, maxLength: 100 }}
        label="Address"
        variant="standard"
        size="small"
      />
      <Controller
        as={TextField}
        name="city"
        control={control}
        rules={{ required: true, minLength: 1, maxLength: 100 }}
        label="City"
        variant="standard"
        size="small"
      />
      <Controller
        as={(
          <Select name="input" label="State">
            <MenuItem value="AK">Alaska</MenuItem>
            <MenuItem value="AL">Alabama</MenuItem>
            <MenuItem value="AR">Arkansas</MenuItem>
            <MenuItem value="AZ">Arizona</MenuItem>
            <MenuItem value="AA">Armed Forces Americas</MenuItem>
            <MenuItem value="AE">Armed Forces Europe</MenuItem>
            <MenuItem value="AP">Armed Forces Pacific</MenuItem>
            <MenuItem value="CA">California</MenuItem>
            <MenuItem value="CO">Colorado</MenuItem>
            <MenuItem value="CT">Connecticut</MenuItem>
            <MenuItem value="DC">District of Columbia</MenuItem>
            <MenuItem value="DE">Delaware</MenuItem>
            <MenuItem value="FL">Florida</MenuItem>
            <MenuItem value="GA">Georgia</MenuItem>
            <MenuItem value="HI">Hawaii</MenuItem>
            <MenuItem value="IA">Iowa</MenuItem>
            <MenuItem value="ID">Idaho</MenuItem>
            <MenuItem value="IL">Illinois</MenuItem>
            <MenuItem value="IN">Indiana</MenuItem>
            <MenuItem value="KS">Kansas</MenuItem>
            <MenuItem value="KY">Kentucky</MenuItem>
            <MenuItem value="LA">Louisiana</MenuItem>
            <MenuItem value="MA">Massachusetts</MenuItem>
            <MenuItem value="MD">Maryland</MenuItem>
            <MenuItem value="ME">Maine</MenuItem>
            <MenuItem value="MI">Michigan</MenuItem>
            <MenuItem value="MN">Minnesota</MenuItem>
            <MenuItem value="MO">Missouri</MenuItem>
            <MenuItem value="MS">Mississippi</MenuItem>
            <MenuItem value="MT">Montana</MenuItem>
            <MenuItem value="NC">North Carolina</MenuItem>
            <MenuItem value="ND">North Dakota</MenuItem>
            <MenuItem value="NE">Nebraska</MenuItem>
            <MenuItem value="NH">New Hampshire</MenuItem>
            <MenuItem value="NJ">New Jersey</MenuItem>
            <MenuItem value="NM">New Mexico</MenuItem>
            <MenuItem value="NV">Nevada</MenuItem>
            <MenuItem value="NY">New York</MenuItem>
            <MenuItem value="OH">Ohio</MenuItem>
            <MenuItem value="OK">Oklahoma</MenuItem>
            <MenuItem value="OR">Oregon</MenuItem>
            <MenuItem value="PA">Pennsylvania</MenuItem>
            <MenuItem value="PR">Puerto Rico</MenuItem>
            <MenuItem value="RI">Rhode Island</MenuItem>
            <MenuItem value="SC">South Carolina</MenuItem>
            <MenuItem value="SD">South Dakota</MenuItem>
            <MenuItem value="TN">Tennessee</MenuItem>
            <MenuItem value="TX">Texas</MenuItem>
            <MenuItem value="UT">Utah</MenuItem>
            <MenuItem value="VA">Virginia</MenuItem>
            <MenuItem value="VT">Vermont</MenuItem>
            <MenuItem value="WA">Washington</MenuItem>
            <MenuItem value="WI">Wisconsin</MenuItem>
            <MenuItem value="WV">West Virginia</MenuItem>
            <MenuItem value="WY">Wyoming</MenuItem>
          </Select>
        )}
        name="state"
        control={control}
        variant="standard"
        size="small"
      />

      <Controller
        as={TextField}
        name="zipcode"
        control={control}
        rules={{
          required: true, minLength: 5, maxLength: 10, pattern: /^\d{5}(?:[-\s]\d{4})?$/i,
        }}
        label="Zipcode"
        variant="standard"
        size="small"
      />

      <Controller
        as={TextField}
        name="lat"
        control={control}
        rules={{
          minLength: 5, maxLength: 10, pattern: /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/i,
        }}
        label="Latitude"
        variant="standard"
        size="small"
        defaultValue={lat}
      />

      <Controller
        as={TextField}
        name="lng"
        control={control}
        rules={{
          minLength: 5, maxLength: 10, pattern: /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/i,
        }}
        label="Longitude"
        variant="standard"
        size="small"
        defaultValue={lng}
      />

    </Widget>

  );
}
