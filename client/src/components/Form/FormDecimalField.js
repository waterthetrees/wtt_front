import React from 'react';
import FormTextField from './FormTextField';

const decimalPattern = { pattern: /^\s*\d+([,\\.]\d+)?\s*$/ };

export default function FormDecimalField({
  rules, ...props
}) {
  // Provide a default pattern (which the caller can still override), so if they just want to make
  // the field required, they don't also have to specify the full decimal regex.
  const mergedRules = { ...decimalPattern, ...rules };

  return (
    <FormTextField
      rules={mergedRules}
      inputProps={{ inputMode: 'decimal' }}
      {...props}
    />
  );
}
