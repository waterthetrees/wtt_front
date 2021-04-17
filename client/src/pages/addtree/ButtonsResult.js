import React from 'react';
import { convertToRaw } from 'draft-js';
// import { Button } from '@material-ui/core';

const EARTH = 'assets/images/addtree/earth2.svg';
export default ({
  data, reset, defaultValues, setAddTreeSelected,
}) => (
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
    <img
      alt="EARTH"
      className="addtreemodal__header-image"
      src={EARTH}
    />
    <button
      className="addtree_btn__save button buttonBlack btn btn-secondary btn-lg"
      type="button"
      onClick={() => {
        reset(defaultValues);
      }}
    >
      RESET FORM
    </button>
    <button
      type="submit"
      className="addtree_btn__save button btn btn-dark btn-lg"
      onClick={() => setAddTreeSelected(false)}
    >
      SAVE
    </button>
  </div>
);
