import React, { createContext } from 'react';

import MapboxManager from './MapboxManager';

export const MapboxManagerContext = createContext(undefined);

const mapboxManager = new MapboxManager();

const MapboxManagerProvider = ({ children }) => {
  <MapboxManagerContext.Provider value={mapboxManager}>
    {children}
  </MapboxManagerContext.Provider>;
};

export default MapboxManagerProvider;
