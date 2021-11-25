import React from 'react';

function defaultGetValue(data, key) {
  return data[key];
}

function capitalize(string) {
	return string[0].toUpperCase() + string.slice(1)
}

function Row({ label, value, Container }) {
  return (
    <Container>
      { label
        && <span style={{ width: '7em', display: 'inline-block' }}>{label}:</span>}
      <span>{value}</span>
    </Container>
  );
}

export default function DataTable({ data, keys }) {
  return (
    <>
      {keys.map((item) => {
        const [key, label = capitalize(key), Container = 'div', getValue = defaultGetValue] = Array.isArray(item)
          ? item
          // If item's not an array containing a custom label, use the capitalized key string.
          : [item, capitalize(item)]
        const value = getValue(data, key);

        return value
          && <Row
            key={key}
            label={label}
            value={value}
            Container={Container}
          />;
      })}
    </>
  );
}
