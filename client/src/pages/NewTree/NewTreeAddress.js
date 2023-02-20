import React, { useEffect } from 'react';
import { MenuItem } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import {
  FormDecimalField,
  FormTextField,
  FormSelect,
  FormRadio,
  FormRadioGroup,
  FormTheme,
} from '@/components/Form';
import Section from '@/components/Section/Section';
import { useNewTree } from './useNewTree';
import { ThemeProvider } from '@mui/material/styles';

// Add keys to each item in the map() call below.
const stateMenuItems = [
  <MenuItem key="AK" value="AK">
    Alaska
  </MenuItem>,
  <MenuItem key="AL" value="AL">
    Alabama
  </MenuItem>,
  <MenuItem key="AR" value="AR">
    Arkansas
  </MenuItem>,
  <MenuItem key="AZ" value="AZ">
    Arizona
  </MenuItem>,
  <MenuItem key="AA" value="AA">
    Armed Forces Americas
  </MenuItem>,
  <MenuItem key="AE" value="AE">
    Armed Forces Europe
  </MenuItem>,
  <MenuItem key="AP" value="AP">
    Armed Forces Pacific
  </MenuItem>,
  <MenuItem key="CA" value="CA">
    California
  </MenuItem>,
  <MenuItem key="CO" value="CO">
    Colorado
  </MenuItem>,
  <MenuItem key="CT" value="CT">
    Connecticut
  </MenuItem>,
  <MenuItem key="DC" value="DC">
    District of Columbia
  </MenuItem>,
  <MenuItem key="DE" value="DE">
    Delaware
  </MenuItem>,
  <MenuItem key="FL" value="FL">
    Florida
  </MenuItem>,
  <MenuItem key="GA" value="GA">
    Georgia
  </MenuItem>,
  <MenuItem key="HI" value="HI">
    Hawaii
  </MenuItem>,
  <MenuItem key="IA" value="IA">
    Iowa
  </MenuItem>,
  <MenuItem key="ID" value="ID">
    Idaho
  </MenuItem>,
  <MenuItem key="IL" value="IL">
    Illinois
  </MenuItem>,
  <MenuItem key="IN" value="IN">
    Indiana
  </MenuItem>,
  <MenuItem key="KS" value="KS">
    Kansas
  </MenuItem>,
  <MenuItem key="KY" value="KY">
    Kentucky
  </MenuItem>,
  <MenuItem key="LA" value="LA">
    Louisiana
  </MenuItem>,
  <MenuItem key="MA" value="MA">
    Massachusetts
  </MenuItem>,
  <MenuItem key="MD" value="MD">
    Maryland
  </MenuItem>,
  <MenuItem key="ME" value="ME">
    Maine
  </MenuItem>,
  <MenuItem key="MI" value="MI">
    Michigan
  </MenuItem>,
  <MenuItem key="MN" value="MN">
    Minnesota
  </MenuItem>,
  <MenuItem key="MO" value="MO">
    Missouri
  </MenuItem>,
  <MenuItem key="MS" value="MS">
    Mississippi
  </MenuItem>,
  <MenuItem key="MT" value="MT">
    Montana
  </MenuItem>,
  <MenuItem key="NC" value="NC">
    North Carolina
  </MenuItem>,
  <MenuItem key="ND" value="ND">
    North Dakota
  </MenuItem>,
  <MenuItem key="NE" value="NE">
    Nebraska
  </MenuItem>,
  <MenuItem key="NH" value="NH">
    New Hampshire
  </MenuItem>,
  <MenuItem key="NJ" value="NJ">
    New Jersey
  </MenuItem>,
  <MenuItem key="NM" value="NM">
    New Mexico
  </MenuItem>,
  <MenuItem key="NV" value="NV">
    Nevada
  </MenuItem>,
  <MenuItem key="NY" value="NY">
    New York
  </MenuItem>,
  <MenuItem key="OH" value="OH">
    Ohio
  </MenuItem>,
  <MenuItem key="OK" value="OK">
    Oklahoma
  </MenuItem>,
  <MenuItem key="OR" value="OR">
    Oregon
  </MenuItem>,
  <MenuItem key="PA" value="PA">
    Pennsylvania
  </MenuItem>,
  <MenuItem key="PR" value="PR">
    Puerto Rico
  </MenuItem>,
  <MenuItem key="RI" value="RI">
    Rhode Island
  </MenuItem>,
  <MenuItem key="SC" value="SC">
    South Carolina
  </MenuItem>,
  <MenuItem key="SD" value="SD">
    South Dakota
  </MenuItem>,
  <MenuItem key="TN" value="TN">
    Tennessee
  </MenuItem>,
  <MenuItem key="TX" value="TX">
    Texas
  </MenuItem>,
  <MenuItem key="UT" value="UT">
    Utah
  </MenuItem>,
  <MenuItem key="VA" value="VA">
    Virginia
  </MenuItem>,
  <MenuItem key="VT" value="VT">
    Vermont
  </MenuItem>,
  <MenuItem key="WA" value="WA">
    Washington
  </MenuItem>,
  <MenuItem key="WI" value="WI">
    Wisconsin
  </MenuItem>,
  <MenuItem key="WV" value="WV">
    West Virginia
  </MenuItem>,
  <MenuItem key="WY" value="WY">
    Wyoming
  </MenuItem>,
].map((element) => React.cloneElement(element, { key: element.props.value }));

export default function Address() {
  const { newTreeState } = useNewTree();
  const { setValue } = useFormContext();

  useEffect(() => {
    setValue('lng', newTreeState.coords.lng);
    setValue('lat', newTreeState.coords.lat);
  }, [newTreeState.coords, setValue]);

  return (
    <Section title="Location">
      <ThemeProvider theme={FormTheme}>
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

        <FormSelect name="state" label="State">
          {stateMenuItems}
        </FormSelect>

        <FormDecimalField
          name="zip"
          label="ZIP Code"
          rules={{
            minLength: 5,
            maxLength: 10,
            pattern: /^\d{5}(?:[-\s]\d{4})?$/i,
          }}
        />

        <FormTextField name="lat" label="Latitude" disabled />

        <FormTextField name="lng" label="Longitude" disabled />

        <FormRadioGroup
          name="owner"
          label="Type of land"
          aria-label="owner"
          row
        >
          <FormRadio value="public" label="Public" />
          <FormRadio value="private" label="Private" />
        </FormRadioGroup>
      </ThemeProvider>
    </Section>
  );
}
