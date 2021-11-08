/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Controller } from 'react-hook-form';

export default function TreeName({
  register, control, keyName, coordinates, optionValues,
}) {

  const handleInputChange = (e, data) => {data};

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
                options={optionValues.map((option) => option[keyName])}
                id={keyName}
                freeSolo
                autoSelect
                handleHomeEndKeys
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
                onInputChange={handleInputChange}
                onChange={(_, data) => props.onChange(data)}
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
