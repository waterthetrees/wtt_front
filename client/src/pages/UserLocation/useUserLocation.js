import React, {
  useReducer,
  useMemo,
  useContext,
  createContext,
  useEffect,
} from 'react';
import { useGeolocation } from '@/pages/UserLocation/useGeolocation';

const initialState = {
  coords: null,
  isTracking: false,
};

const userLocationReducer = (state, { type, payload }) => {
  switch (type) {
    case 'setCoords':
      return { ...state, coords: payload };

    case 'beginTracking':
      return { ...state, isTracking: true };

    case 'endTracking':
      return { ...state, isTracking: false };

    default:
      return { ...state, isTracking: false };
  }
};

const UserLocationContext = createContext(undefined);

const UserLocationProvider = (props) => {
  const [state, dispatch] = useReducer(userLocationReducer, {
    ...initialState,
  });
  const { data } = useGeolocation({
    enabled: state.isTracking,
    // Only update the position as the user moves if tracking is on.
    watching: state.isTracking,
    enableHighAccuracy: true,
  });
  const context = useMemo(
    () => ({
      state,
      setCoords(coords) {
        dispatch({ type: 'setCoords', payload: coords });
      },
      beginTracking() {
        dispatch({ type: 'beginTracking' });
      },
      endTracking() {
        dispatch({ type: 'endTracking' });
      },
    }),
    [state, dispatch],
  );

  useEffect(() => {
    if (data && state.isTracking) {
      const {
        coords: { longitude: lng, latitude: lat },
      } = data;

      if (
        !state.coords ||
        lng !== state.coords.lng ||
        lat !== state.coords.lat
      ) {
        context.setCoords({ lng, lat });
      } else {
        context.setCoords(null);
      }
    }
  }, [data, state.isTracking]);

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <UserLocationContext.Provider value={context} {...props} />;
};

const useUserLocation = () => {
  const context = useContext(UserLocationContext);

  if (!context) {
    throw new Error(
      'useUserLocation() must be used within a UserLocationProvider.',
    );
  }

  return context;
};

export { UserLocationProvider, useUserLocation };
