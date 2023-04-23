import React, { createContext, useContext, useMemo, useReducer } from 'react';

const newTreeInitialState = {
  coords: null,
  result: null,
  isPlanting: false,
  // Default isFollowingUser to true so that on mobile, when the user taps Plant for the first time,
  // the marker will sync to their location.  On desktop, we don't automatically turn on tracking
  // when clicking Plant.
  isFollowingUser: true,
  isPanelOpen: false,
  isDragging: false,
};

const newTreeReducer = (state, { type, payload }) => {
  switch (type) {
    case 'setCoords':
      return { ...state, coords: payload };

    case 'beginPlanting':
      return { ...state, isPlanting: true };

    case 'endPlanting': {
      // Reset the state except for isFollowingUser.  We want to leave that flag alone so that it's
      // remembered across planting sessions.
      const { isFollowingUser } = state;
      return { ...newTreeInitialState, isFollowingUser };
    }

    case 'beginFollowingUser':
      return { ...state, isFollowingUser: true };

    case 'endFollowingUser':
      return { ...state, isFollowingUser: false };

    case 'beginDrag':
      return { ...state, isDragging: true };

    case 'endDrag':
      return { ...state, isDragging: false };

    case 'openPanel':
      return { ...state, isPanelOpen: true };

    case 'confirm':
      return { ...state, isPanelOpen: false, result: payload };

    case 'cancel':
      return { ...state, isPanelOpen: false, result: null };

    default:
      throw new Error(`newTreeReducer: unrecognized type: ${type}`);
  }
};

const NewTreeContext = createContext(undefined);

const NewTreeProvider = (props) => {
  const [newTreeState, dispatch] = useReducer(newTreeReducer, {
    ...newTreeInitialState,
  });
  const context = useMemo(
    () => ({
      newTreeState,
      setCoords(coords) {
        dispatch({ type: 'setCoords', payload: coords });
      },
      beginPlanting() {
        dispatch({ type: 'beginPlanting' });
      },
      endPlanting() {
        dispatch({ type: 'endPlanting' });
      },
      beginFollowingUser() {
        dispatch({ type: 'beginFollowingUser' });
      },
      endFollowingUser() {
        dispatch({ type: 'endFollowingUser' });
      },
      beginDrag() {
        dispatch({ type: 'beginDrag' });
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
    }),
    [newTreeState, dispatch],
  );

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

export { NewTreeProvider, useNewTree };
