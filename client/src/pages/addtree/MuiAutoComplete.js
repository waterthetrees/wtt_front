/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Controller } from 'react-hook-form';
import { useQuery } from 'react-query';
import { getData } from '../../api/queries';

export default function TreeName({
  register, control, keyName, coordinates, optionValues,
}) {
  console.log('autocomplete options', optionValues, control);
  return (
    <div>
      {!optionValues && (<div>test</div>)}
      {optionValues && optionValues.status !== 'loading' && (
        <FormControl
          fullWidth
        >
          <Controller
            render={(props) => (
              <Autocomplete
                {...register(keyName)} {...props}
                options={optionValues}
                id={keyName}
                freeSolo
                autoSelect
                handleHomeEndKeys
                getOptionLabel={(option) => option[keyName]}
                renderOption={(option) => (
                  <span>
                    {option[keyName]}
                  </span>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={`Choose a ${keyName}`}
                    variant="standard"
                    size="small"
                    className="addtree__infoname"
                    name={keyName}
                  />
                )}
              />
            )}
            name={keyName}
            control={control}
            rules={(keyName === 'common') ? { required: true, minLength: 1, maxLength: 100 } : { required: false, minLength: 1, maxLength: 100 }}
          />
        </FormControl>
      )}
    </div>
  );
}
