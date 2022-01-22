import React, { useReducer, useMemo, useContext, createContext } from 'react';

const newTreeInitialState = {
  coords: null,
  isPanelOpen: false,
  result: null,
};

const newTreeReducer = (state, { type, payload }) => {
  switch (type) {
    case 'setCoords':
      return { ...state, coords: payload };

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

const NewTreeContext = createContext();

const NewTreeProvider = (props) => {
  const [state, dispatch] = useReducer(newTreeReducer, newTreeInitialState);
  const value = useMemo(() => [state, dispatch], [state]);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <NewTreeContext.Provider value={value} {...props} />;
};

const useNewTree = () => {
  const context = useContext(NewTreeContext);

  if (!context) {
    throw new Error('useNewTree() must be used within a NewTreeProvider.');
  }

  const [newTreeState, dispatch] = context;

  return {
    newTreeState,
    dispatch,
    setCoords(coords) {
      dispatch({ type: 'setCoords', payload: coords });
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
  };
};

export {
  NewTreeProvider,
  useNewTree,
};
