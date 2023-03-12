/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useAuthUtils from '@/components/Auth/useAuthUtils';
import { useForm, useFormContext, FormProvider } from 'react-hook-form';
import {
  useSourcesQuery,
  useSourcesMutation,
  useCreateSourcesMutation,
} from '@/api/queries';

import { NEW_SOURCE_FIELDS, CROSSWALK_FIELDS } from './sourceArrays';
import './SourceForm.scss';

function eliminateSameKeyValuePairs(obj1, obj2, idSourceName) {
  const commonKeys = Object.keys(obj1).filter((key) => key in obj2);
  const newObj = commonKeys.reduce((acc, key) => {
    if (obj1[key] !== obj2[key]) {
      acc[key] = obj1[key];
    }
    return acc;
  }, {});
  return Object.keys(newObj).length > 0 ? { idSourceName, ...newObj } : null;
}

export function SourceForm({ setOpenEdit, setSource, source, setMessage }) {
  const [error, setError] = React.useState('');
  const { data: savedSource } = useSourcesQuery({
    idSourceName: source?.idSourceName,
  });

  const { isAuthenticated } = useAuth0();
  const { loginToCurrentPage } = useAuthUtils();
  if (!isAuthenticated) loginToCurrentPage();

  const mutateSources = useSourcesMutation();
  const createSources = useCreateSourcesMutation();

  const defaultValues = {
    source: {
      idSourceName: savedSource?.source?.idSourceName || source?.city || '',
      state: savedSource?.source?.state || '',
      isoAlpha3: savedSource?.source?.isoAlpha3 || '',
      country: savedSource?.source?.country || '',
      info: savedSource?.source?.info || '',
      download: savedSource?.source?.download || '',
      latitude: savedSource?.source?.latitude || '',
      longitude: savedSource?.source?.longitude || '',
      notes: savedSource?.source?.notes || '',
      format: savedSource?.source?.format || '',
      filename: savedSource?.source?.filename || '',
      license: savedSource?.source?.license || '',
      email: savedSource?.source?.email || '',
      contact: savedSource?.source?.contact || '',
      name: savedSource?.source?.name || '',
    },
    crosswalk: savedSource,
  };
  const methods = useForm({
    mode: 'all',
    defaultValues,
    values: savedSource,
  });
  const {
    formState: { errors },
    watch,
    handleSubmit,
  } = methods;
  watch('formats', 'csv');
  watch('isoAlpha3', savedSource?.source?.isoAlpha3 ?? source?.isoAlpha3);
  watch('idSourceName', '');
  const [saveButton, setSaveButton] = React.useState('Save');
  const [disabled, setDisabled] = React.useState(false);

  const onSubmit = async (data) => {
    console.log('data', data);
    setSaveButton('Saving...');
    const exists =
      savedSource?.source?.idSourceName === data?.source?.idSourceName;

    if (exists) {
      const idSourceName = data?.source?.idSourceName;
      const newSource = eliminateSameKeyValuePairs(
        data?.source,
        savedSource?.source,
        idSourceName,
      );
      const newCrosswalk = eliminateSameKeyValuePairs(
        data?.crosswalk,
        savedSource?.crosswalk,
        idSourceName,
      );
      const payload = {
        source: newSource,
        crosswalk: newCrosswalk,
      };

      await mutateSources.mutateAsync(payload);
      setMessage(`Updated ${idSourceName}! Thanks for the update!`);
    } else {
      console.log('data', data);
      await createSources.mutateAsync(data);
      setMessage(
        `Saved ${data?.source?.idSourceName}! Thanks for the submission!`,
      );
    }
    setDisabled(false);
    setSaveButton('Save');
    setSource(null);

    setOpenEdit(false);
  };

  const onError = (err) => {
    console.error('Source Form ERROR: ', errors, err);
    setError(`ERROR: ${err} ${errors} `);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="sourceform">
          <SubmitButtons
            setOpenEdit={setOpenEdit}
            saveButton={saveButton}
            disabled={disabled}
            setSource={setSource}
          />

          {error && (
            <div className="sourceform__alert">
              <h2>{error}</h2>
            </div>
          )}
          <div className="sourceform__section">
            <FormFields fields={NEW_SOURCE_FIELDS} source={source} />
            <FormFields fields={CROSSWALK_FIELDS} crosswalk={source} />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

function SubmitButtons({ setOpenEdit, setSource, saveButton, disabled }) {
  const handleCancel = () => {
    setOpenEdit(false);
    setSource(null);
  };
  return (
    <div className="sourceform__submit">
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
      <button type="submit" disabled={disabled}>
        {saveButton}
      </button>
    </div>
  );
}

function FormFields({ fields }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="sourceform__section-item">
      <div className="sourceform__section-item-header">
        <h2>{fields.header}</h2>
        <h5>{fields.summary}</h5>
        <p>{fields.directions}</p>
      </div>

      {fields?.inputs.map((input) => {
        const { label, name, type, rules } = input;

        // TODO use plugin for dynamic class names
        const fieldClass = errors[name]
          ? `sourceform__field-${type} sourceform__field-error`
          : `sourceform__field-${type}`;
        const fieldClassErrors = 'sourceform__field-error';
        const errorMessage = errors[name]?.message;
        return (
          <li className="sourceform__form-row" key={name}>
            <label>{label}</label>
            {type === 'select' && (
              <select {...register(name, rules)} className={fieldClass}>
                {input?.options.map((option) => (
                  <option key={option?.label} value={option?.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}

            {type === 'checkbox' && (
              <input
                type="checkbox"
                {...register(name, rules)}
                className={fieldClass}
              />
            )}

            {['text', 'email', 'email', 'url'].includes(type) && (
              <input
                type={type}
                {...register(name, rules)}
                className={fieldClass}
                placeholder={label}
              />
            )}
            {errors[name] && (
              <span className={fieldClassErrors}>{errorMessage}</span>
            )}
          </li>
        );
      })}
    </div>
  );
}
