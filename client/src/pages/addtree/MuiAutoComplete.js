/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Controller } from 'react-hook-form';
import { useQuery } from 'react-query';
import { getData } from '../../api/queries';

export default function TreeName({
  control, keyName, coordinates,
}) {
  // console.log('coordinates', coordinates);
  const treelist = useQuery(['treelist', { coordinates }], getData);
  // console.log('treelist', treelist);

  // const topTrees = treelist.data || {};
  // console.log('topTrees', topTrees);
  const handleInputChange = (e, data) => data;

  return (
    <div>
      {!treelist && (<div>test</div>)}
      {treelist && treelist.status !== 'loading' && (
        <Controller
          render={(props) => (
            <Autocomplete
              {...props}
              options={treelist.data.map((option) => option[keyName])}
              id={keyName}
              freeSolo
              autoSelect
              handleHomeEndKeys
              clearOnBlur
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={keyName}
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
      )}
    </div>
  );
}
