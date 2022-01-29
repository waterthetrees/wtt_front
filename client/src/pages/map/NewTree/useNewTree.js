import React, { useReducer, useMemo, useContext, createContext } from 'react';

const newTreeInitialState = {
  coords: null,
  result: null,
  isPanelOpen: false,
  isDragging: false,
};

const newTreeReducer = (state, { type, payload }) => {
  switch (type) {
    case 'setCoords':
      return { ...state, coords: payload };

    case 'startDrag':
      return { ...state, isDragging: true };

    case 'endDrag':
      return { ...state, isDragging: false };

    case 'openPanel':
      return { ...state, isPanelOpen: true };

    case 'confirm':
      return { ...state, isPanelOpen: false, result: payload };

    case 'cancel':
      return { ...state, isPanelOpen: false, result: null };

    case 'reset':
      return { ...newTreeInitialState };

    default:
      throw new Error(`newTreeReducer: unrecognized type: ${type}`);
  }
};

const NewTreeContext = createContext(undefined);

const NewTreeProvider = (props) => {
  const [newTreeState, dispatch] = useReducer(newTreeReducer, newTreeInitialState);
  const context = useMemo(() => ({
    newTreeState,
    setCoords(coords) {
      dispatch({ type: 'setCoords', payload: coords });
    },
    startDrag() {
      dispatch({ type: 'startDrag' });
    },
    endDrag() {
      dispatch({ type: 'endDrag' });
    },
    openPanel() {
      dispatch({ type: 'openPanel' });
    },
    confirm(result) {
      dispatch({ type: 'confirm', payload: result });
    },
    cancel() {
      dispatch({ type: 'cancel' });
    },
    reset() {
      dispatch({ type: 'reset' });
    },
  }), [newTreeState, dispatch]);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <NewTreeContext.Provider value={context} {...props} />;
};

const useNewTree = () => {
  const context = useContext(NewTreeContext);

  if (!context) {
    throw new Error('useNewTree() must be used within a NewTreeProvider.');
  }

  return context;
};

export {
  NewTreeProvider,
  useNewTree,
};
