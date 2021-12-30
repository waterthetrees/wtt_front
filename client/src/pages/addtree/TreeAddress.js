import React from 'react';
import { MenuItem } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import {
  FormDecimalField,
  FormTextField,
  FormSelect,
  FormTreeGroup,
  FormRadio,
  FormRadioGroup,
} from '../../components/Form';
import { IDForTree } from '../../components/Tree/id';

// Add keys to each item in the map() call below.
const stateMenuItems = [
  <MenuItem value="AK">Alaska</MenuItem>,
  <MenuItem value="AL">Alabama</MenuItem>,
  <MenuItem value="AR">Arkansas</MenuItem>,
  <MenuItem value="AZ">Arizona</MenuItem>,
  <MenuItem value="AA">Armed Forces Americas</MenuItem>,
  <MenuItem value="AE">Armed Forces Europe</MenuItem>,
  <MenuItem value="AP">Armed Forces Pacific</MenuItem>,
  <MenuItem value="CA">California</MenuItem>,
  <MenuItem value="CO">Colorado</MenuItem>,
  <MenuItem value="CT">Connecticut</MenuItem>,
  <MenuItem value="DC">District of Columbia</MenuItem>,
  <MenuItem value="DE">Delaware</MenuItem>,
  <MenuItem value="FL">Florida</MenuItem>,
  <MenuItem value="GA">Georgia</MenuItem>,
  <MenuItem value="HI">Hawaii</MenuItem>,
  <MenuItem value="IA">Iowa</MenuItem>,
  <MenuItem value="ID">Idaho</MenuItem>,
  <MenuItem value="IL">Illinois</MenuItem>,
  <MenuItem value="IN">Indiana</MenuItem>,
  <MenuItem value="KS">Kansas</MenuItem>,
  <MenuItem value="KY">Kentucky</MenuItem>,
  <MenuItem value="LA">Louisiana</MenuItem>,
  <MenuItem value="MA">Massachusetts</MenuItem>,
  <MenuItem value="MD">Maryland</MenuItem>,
  <MenuItem value="ME">Maine</MenuItem>,
  <MenuItem value="MI">Michigan</MenuItem>,
  <MenuItem value="MN">Minnesota</MenuItem>,
  <MenuItem value="MO">Missouri</MenuItem>,
  <MenuItem value="MS">Mississippi</MenuItem>,
  <MenuItem value="MT">Montana</MenuItem>,
  <MenuItem value="NC">North Carolina</MenuItem>,
  <MenuItem value="ND">North Dakota</MenuItem>,
  <MenuItem value="NE">Nebraska</MenuItem>,
  <MenuItem value="NH">New Hampshire</MenuItem>,
  <MenuItem value="NJ">New Jersey</MenuItem>,
  <MenuItem value="NM">New Mexico</MenuItem>,
  <MenuItem value="NV">Nevada</MenuItem>,
  <MenuItem value="NY">New York</MenuItem>,
  <MenuItem value="OH">Ohio</MenuItem>,
  <MenuItem value="OK">Oklahoma</MenuItem>,
  <MenuItem value="OR">Oregon</MenuItem>,
  <MenuItem value="PA">Pennsylvania</MenuItem>,
  <MenuItem value="PR">Puerto Rico</MenuItem>,
  <MenuItem value="RI">Rhode Island</MenuItem>,
  <MenuItem value="SC">South Carolina</MenuItem>,
  <MenuItem value="SD">South Dakota</MenuItem>,
  <MenuItem value="TN">Tennessee</MenuItem>,
  <MenuItem value="TX">Texas</MenuItem>,
  <MenuItem value="UT">Utah</MenuItem>,
  <MenuItem value="VA">Virginia</MenuItem>,
  <MenuItem value="VT">Vermont</MenuItem>,
  <MenuItem value="WA">Washington</MenuItem>,
  <MenuItem value="WI">Wisconsin</MenuItem>,
  <MenuItem value="WV">West Virginia</MenuItem>,
  <MenuItem value="WY">Wyoming</MenuItem>,
].map((element) => React.cloneElement(element, { key: element.props.value }));

export default function TreeAddress() {
  const { watch, setValue } = useFormContext();
  const hashWatcher = watch(['common', 'scientific', 'city', 'lng', 'lat']);
  let geohash;
  if (hashWatcher.filter(Boolean).length === 5) {
    geohash = IDForTree(hashWatcher);
    console.log(geohash);
  }

  return (
    <FormTreeGroup title="Location">
      <div>{geohash && <p>{geohash}</p>}</div>
      <FormTextField
        name="address"
        label="Address"
        rules={{ minLength: 1, maxLength: 100 }}
      />

      <FormTextField
        name="city"
        label="City"
        rules={{ minLength: 1, maxLength: 100 }}
      />

      <FormSelect
        name="state"
        label="State"
      >
        {stateMenuItems}
      </FormSelect>

      <FormDecimalField
        name="zip"
        label="ZIP Code"
        rules={{ minLength: 5, maxLength: 10, pattern: /^\d{5}(?:[-\s]\d{4})?$/i }}
      />

      <FormTextField
        name="lat"
        label="Latitude"
        disabled
      />

      <FormTextField
        name="lng"
        label="Longitude"
        disabled
      />

      <FormRadioGroup
        name="owner"
        label="Type of land"
        aria-label="owner"
        row
      >
        <FormRadio
          value="public"
          label="Public"
        />
        <FormRadio
          value="private"
          label="Private"
        />
      </FormRadioGroup>
    </FormTreeGroup>
  );
}
