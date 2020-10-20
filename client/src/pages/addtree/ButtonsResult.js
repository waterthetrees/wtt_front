import React from 'react';
import { convertToRaw } from 'draft-js';
import { Button } from '@material-ui/core';

export default ({ data, reset, defaultValues }) => (
  <div className="addtree_btngroup">
    {data && (
      <pre>
        {JSON.stringify(
          {
            ...data,
            DraftJS: convertToRaw(data.DraftJS.getCurrentContent()).blocks[0]
              .text,
          },
          null,
          2,
        )}
      </pre>
    )}

    <button
      className="button buttonBlack btn btn-secondary btn-lg"
      type="button"
      onClick={() => {
        reset(defaultValues);
      }}
    >
      RESET FORM
    </button>
    <button className="button btn btn-dark btn-lg">SAVE</button>
  </div>
);
