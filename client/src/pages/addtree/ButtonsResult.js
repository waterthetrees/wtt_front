import React from 'react';

export default  ({
  reset, defaultValues, setAddTreeSelected,
}) => (
  <div className="addtree_btngroup">
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
