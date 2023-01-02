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
  enabled: false,
  isTracking: false,
};

const userLocationReducer = (state, { type, payload }) => {
  switch (type) {
    case 'setCoords':
      return { ...state, coords: payload };

    case 'enableTracking':
      return { ...state, enabled: true };

    case 'beginTracking':
      return { ...state, isTracking: true };

    case 'endTracking':
      return { coords: null, isTracking: false, enabled: false };

    default:
      return { ...state, isTracking: false, enabled: false };
  }
};

const UserLocationContext = createContext(undefined);

const UserLocationProvider = (props) => {
  const [state, dispatch] = useReducer(userLocationReducer, {
    ...initialState,
  });
  const { data } = useGeolocation({
    enabled: state.enabled,
    // Only update the position as the user moves if tracking is on.
    watching: state.enabled,
    enableHighAccuracy: true,
  });
  const context = useMemo(
    () => ({
      state,
      setCoords(coords) {
        dispatch({ type: 'setCoords', payload: coords });
      },
      enableTracking() {
        dispatch({ type: 'enableTracking' });
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
    if (data && state.enabled) {
      const {
        coords: { longitude: lng, latitude: lat },
      } = data;

      if (
        !state.coords ||
        lng !== state.coords.lng ||
        lat !== state.coords.lat
      ) {
        context.setCoords({ lng, lat });
        context.beginTracking();
      }
    }
  }, [context, data, state.enabled]);

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
