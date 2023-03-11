import React, { useState } from 'react';
import { Importer, ImporterField } from 'react-csv-importer';
import {
  NEW_SOURCE_FIELDS,
  CROSSWALK_FIELDS,
} from '@/components/SourceForm/sourceArrays.js';

// theme CSS for React CSV Importer
import 'react-csv-importer/dist/index.css';

export function CSVImporter({ setImportCSV }) {
  const [message, setMessage] = useState('');
  // sample importer usage snippet, play around with the settings and try it out!
  // (open console output to see sample results)
  return (
    <React.Fragment>
      <Importer
        dataHandler={async (rows) => {
          // required, receives a list of parsed objects based on defined fields and user column mapping;
          // may be called several times if file is large
          // (if this callback returns a promise, the widget will wait for it before parsing more data)
          console.log('received batch of rows', rows);

          // TODO: send rows to backend to be saved to treedata table in database
          // TODO: Save source or csv to sources table in database or just leave as-is?

          // mock timeout to simulate processing
          await new Promise((resolve) => setTimeout(resolve, 500));
        }}
        chunkSize={10000} // optional, internal parsing chunk size in bytes
        defaultNoHeader={false} // optional, keeps "data has headers" checkbox off by default
        restartable={false} // optional, lets user choose to upload another file when import is complete
        onStart={({ file, fields }) => {
          // optional, invoked when user has mapped columns and started import
          console.log('starting import of file', file, 'with fields', fields);
          setMessage('Importing...');
        }}
        onComplete={({ file, fields }) => {
          // optional, invoked right after import is done (but user did not dismiss/reset the widget yet)
          console.log('finished import of file', file, 'with fields', fields);
          setMessage('Import complete!');
        }}
        onClose={() => {
          // optional, invoked when import is done and user clicked "Finish"
          // (if this is not specified, the widget lets the user upload another file)
          console.log('importer dismissed');
          setImportCSV(false);
        }}
      >
        {CROSSWALK_FIELDS.inputs.map((field) => (
          <ImporterField
            name={field.name.split('-')[1]}
            label={field.label}
            key={`Import${field.name}`}
            optional={field.rules.required ? false : true}
          />
        ))}
      </Importer>
      {message && <h4>{message}</h4>}
    </React.Fragment>
  );
}
