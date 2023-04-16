import MapboxManager from './MapboxManager';
import React, { createContext } from 'react';

export const MapboxManagerContext = createContext(undefined);

const mapboxManager = new MapboxManager();

const MapboxManagerProvider = ({ children }) => {
  return (
    <MapboxManagerContext.Provider value={mapboxManager}>
      {children}
    </MapboxManagerContext.Provider>
  );
};

export default MapboxManagerProvider;
