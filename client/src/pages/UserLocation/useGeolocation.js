import { useEffect, useRef, useState } from 'react';

export const useGeolocation = ({
  enabled = true,
  watching = true,
  maximumAge = 0,
  timeout = 10000,
  enableHighAccuracy = false,
} = {}) => {
  const available = !!navigator.geolocation;
  const [data, setData] = useState(null);
  const [error, setError] = useState(
    available ? null : 'Geolocation API is not available',
  );
  const watchID = useRef(null);
  const geoOptions = { maximumAge, timeout, enableHighAccuracy };

  const getCurrentPosition = () =>
    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, geoOptions);
    });

  useEffect(() => {
    let didCancel = false;

    const clearWatch = () => {
      if (watchID.current) {
        navigator.geolocation.clearWatch(watchID.current);
        watchID.current = null;
      }
    };

    const handleSuccess = (position) => {
      if (enabled && !didCancel) {
        setData(position);
      }
    };

    const handleError = ({ message }) => {
      if (enabled && !didCancel) {
        setError(message);
      }
    };

    if (available) {
      if (!enabled || !watching) {
        clearWatch();
      }

      if (enabled && watching) {
        if (!watchID.current) {
          watchID.current = navigator.geolocation.watchPosition(
            handleSuccess,
            handleError,
            geoOptions,
          );
        }
      }
    }

    return () => {
      didCancel = true;
      clearWatch();
    };
  }, [enabled, watching]);

  return {
    data,
    error,
    getCurrentPosition,
  };
};
