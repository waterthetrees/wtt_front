/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useAuthUtils from '@/components/Auth/useAuthUtils';
import { useForm, useFormContext, FormProvider } from 'react-hook-form';
import {
  // useSourcesQuery,
  useSourcesMutation,
  useCreateSourcesMutation,
} from '@/api/queries';
import { getData } from '@/api/apiUtils';
import { useQuery } from 'react-query';
// import { FormErrorMessage } from '@/components/Form';

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

function formatErrors(errors) {
  return Object.entries(errors).reduce((acc, [key, value]) => {
    return `${acc} \n${key}: ${value.message || value.type}, \n`;
  }, '');
}

export function SourceForm({ setOpenEdit, setSource, source, setMessage }) {
  const [error, setError] = React.useState('');

  // Going back to vanilla react-query for now as the documentation is good
  // TODO graphql
  const { data: savedSource } = useQuery(
    ['sources', { idSourceName: source?.idSourceName }],
    getData,
    { enabled: source?.idSourceName !== undefined },
  );

  const { isAuthenticated } = useAuth0();
  const { loginToCurrentPage } = useAuthUtils();
  if (!isAuthenticated) loginToCurrentPage();

  const mutateSources = useSourcesMutation();
  const createSources = useCreateSourcesMutation();

  const defaultValues = {
    source: source?.source || savedSource?.source || {},
    crosswalk: source?.crosswalk || savedSource?.crosswalk || {},
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
    setSaveButton('Saving...');
    const exists =
      savedSource?.source?.idSourceName === data?.source?.idSourceName;
    const idSourceName = data?.source?.idSourceName;
    if (exists) {
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
      data.crosswalk['idSourceName'] = data.source['idSourceName'];
      await createSources.mutateAsync(data);
      setMessage(`Saved ${idSourceName}! Thanks for the submission!`);
    }
    setDisabled(false);
    setSaveButton('Save');
    setSource(null);

    setOpenEdit(false);
  };

  const onError = (err) => {
    console.error('Source Form ERROR: ', errors);
    let errorStringSource = errors?.source ? formatErrors(errors.source) : '';
    let errorStringCrosswalk = errors?.crosswalk
      ? formatErrors(errors.crosswalk)
      : '';

    setError(`Source ERRORs: ${errorStringSource}\n\n
      Crosswalk ERRORs: ${errorStringCrosswalk}\n\n`);
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
              <h4>{error}</h4>
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

        switch (type) {
          case 'select': {
            return (
              <FormRow label={label} name={name} key={name}>
                <select {...register(name, rules)} className={fieldClass}>
                  {input?.options.map((option) => (
                    <option key={option?.label} value={option?.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </FormRow>
            );
          }

          case 'checkbox': {
            return (
              <FormRow label={label} name={name}>
                <input
                  type="checkbox"
                  {...register(name, rules)}
                  className={fieldClass}
                />
              </FormRow>
            );
          }

          default: {
            return (
              <FormRow label={label} name={name}>
                <input
                  type={type}
                  {...register(name, rules)}
                  className={fieldClass}
                  placeholder={label}
                />
              </FormRow>
            );
          }
        }
      })}
    </div>
  );
}

const errorByType = (label, type) =>
  ({
    required: `${label} is required.`,
    minLength: `${label} is too short.`,
    maxLength: `${label} is too long.`,
    pattern: `${label} is not formatted correctly.`,
    default: `${label} has an error.`,
  }[type ?? 'default']);

function FormRow({ children, label, name }) {
  const {
    formState: { errors },
  } = useFormContext();

  // TODO fix errors. Why are errors not showing up?
  const fieldClassErrors = 'sourceform__field-error';

  return (
    <li className="sourceform__form-row" key={name}>
      <label>{label}</label>
      {children}
      {errors && errors[name] && (
        <span className={fieldClassErrors}>
          {errorByType(label, errors[name].type)}
        </span>
      )}
    </li>
  );
}
