import React from 'react';

function defaultGetValue(data, key) {
  return data[key];
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
        const [key, label, Container = 'div', getValue = defaultGetValue] = Array.isArray(item)
          ? item
          // If item's not an array containing a custom label, use the capitalized key string.
          : [item, item[0].toUpperCase() + item.slice(1)];
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
