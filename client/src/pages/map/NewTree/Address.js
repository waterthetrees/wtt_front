import React, { useEffect, useState } from 'react';
import { MenuItem } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import {
  FormDecimalField,
  FormTextField,
  FormSelect,
  FormRadio,
  FormRadioGroup,
} from '@/components/Form';
import { useQuery } from 'react-query';
import { useNewTree } from './useNewTree';
import Section from '../Section';

const states = [
  ['AK', 'Alaska'],
  ['AL', 'Alabama'],
  ['AR', 'Arkansas'],
  ['AZ', 'Arizona'],
  ['AA', 'Armed Forces Americas'],
  ['AE', 'Armed Forces Europe'],
  ['AP', 'Armed Forces Pacific'],
  ['CA', 'California'],
  ['CO', 'Colorado'],
  ['CT', 'Connecticut'],
  ['DC', 'District of Columbia'],
  ['DE', 'Delaware'],
  ['FL', 'Florida'],
  ['GA', 'Georgia'],
  ['HI', 'Hawaii'],
  ['IA', 'Iowa'],
  ['ID', 'Idaho'],
  ['IL', 'Illinois'],
  ['IN', 'Indiana'],
  ['KS', 'Kansas'],
  ['KY', 'Kentucky'],
  ['LA', 'Louisiana'],
  ['MA', 'Massachusetts'],
  ['MD', 'Maryland'],
  ['ME', 'Maine'],
  ['MI', 'Michigan'],
  ['MN', 'Minnesota'],
  ['MO', 'Missouri'],
  ['MS', 'Mississippi'],
  ['MT', 'Montana'],
  ['NC', 'North Carolina'],
  ['ND', 'North Dakota'],
  ['NE', 'Nebraska'],
  ['NH', 'New Hampshire'],
  ['NJ', 'New Jersey'],
  ['NM', 'New Mexico'],
  ['NV', 'Nevada'],
  ['NY', 'New York'],
  ['OH', 'Ohio'],
  ['OK', 'Oklahoma'],
  ['OR', 'Oregon'],
  ['PA', 'Pennsylvania'],
  ['PR', 'Puerto Rico'],
  ['RI', 'Rhode Island'],
  ['SC', 'South Carolina'],
  ['SD', 'South Dakota'],
  ['TN', 'Tennessee'],
  ['TX', 'Texas'],
  ['UT', 'Utah'],
  ['VA', 'Virginia'],
  ['VT', 'Vermont'],
  ['WA', 'Washington'],
  ['WI', 'Wisconsin'],
  ['WV', 'West Virginia'],
  ['WY', 'Wyoming'],
];
const stateCodesByName =
  states.reduce((result, [code, name]) => ({ ...result, [name]: code }), {});
const stateMenuItems = states.map(([code, name] ) => (
  <MenuItem key={code} value={code}>{name}</MenuItem>
));
const addressFieldNames = [
  'address',
  'city',
  'state',
  'zip',
];

async function fetchAddress({ queryKey: [api, params] }) {
  const paramString = String(new URLSearchParams({ ...params, format: 'jsonv2' }));
  const url = `https://nominatim.openstreetmap.org/${api}.php?${paramString}`;

  const response = await fetch(url);

  if (response && !response.ok) {
    // Throw an error so react-query knows to retry the request.
    throw new Error(`${response.status} (${response.statusText}) ${url}`);
  }

  return response && response.json();
}

export default function Address() {
  const [locationQuery, setLocationQuery] = useState('');
  const { newTreeState } = useNewTree();
  const { setValue, getValues } = useFormContext();
  // Don't make this query until we have the lat/lng from the planting marker.
  const { data: nearestAddress } = useQuery(locationQuery, fetchAddress,
    { enabled: !!locationQuery });

  useEffect(() => {
    const { lng, lat } = newTreeState.coords;
    const addressFields = getValues(addressFieldNames);

    setValue('lng', lng);
    setValue('lat', lat);

    // Only query if the address fields are blank, so we don't overwrite what the user entered.
//    if (addressFields.join('').length === 0) {
      setLocationQuery(['reverse', { lat, lon: lng }]);
//    }
  }, [newTreeState.coords, setValue, setLocationQuery]);

  useEffect(() => {
    if (nearestAddress) {
      const { address: { house_number, road, city, state, postcode, } } = nearestAddress;

      setValue('address', `${house_number} ${road}`.trim());
      setValue('city', city);
      setValue('state', stateCodesByName[state]);
      setValue('zip', postcode);
    }
  }, [nearestAddress]);


  return (
    <Section title="Location">
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
        rules={{ minLength: 5, maxLength: 10, pattern: /^\d{5}(?:[-\s]\d{4})?$/i, }}
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
    </Section>
  );
}
