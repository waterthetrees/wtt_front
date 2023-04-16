import Map from './Map';
import { useTreeQuery } from '@/api/queries';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import PanelDrawer from '@/components/PanelDrawer/PanelDrawer';
import ScrollableDialog from '@/components/ScrollableDialog/ScrollableDialog';
import MapboxManagerProvider from '@/pages/Map/MapboxManagerProvider';
import NewTree from '@/pages/NewTree/NewTree';
import { useNewTree, NewTreeProvider } from '@/pages/NewTree/useNewTree';
import { useIsMobile } from '@/pages/NewTree/utilities';
import Search from '@/pages/Search/Search';
import Tree from '@/pages/Tree/Tree';
import { UserLocationProvider } from '@/pages/UserLocation/useUserLocation';
import { Box, styled } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';

const drawerWidth = 350;

const MapContainer = styled('main')({
  background: '#c5def6',
  flexGrow: 1,
  // We need to use vh here, as height: 100% leaves the map at 0 height.
  height: '100vh',
  padding: 0,
  // Put a position on this element so that the map control groups will move when it changes size.
  position: 'relative',
});

function MapLayout() {
  const [currentTreeId, setCurrentTreeId] = useState();
  const [currentTreeDataVector, setCurrentTreeDataVector] = useState();
  const [map, setMap] = useState(null);
  const [mapSelectionEnabled, setMapSelectionEnabled] = useState(true);
  const { newTreeState } = useNewTree();
  const mapContainerRef = useRef(null);

  const newTree = useTreeQuery({ id: currentTreeId }, { retry: 0 });
  const { data: currentTreeDb, isError: isTreeQueryError } = newTree || {};

  const drawerEnabled = !useIsMobile();
  const drawerOpen = !!currentTreeId || newTreeState.isPanelOpen;
  // Opens a left side panel on desktop, and a full-screen dialog on mobile.
  const treeDetailsContainer = drawerEnabled ? PanelDrawer : ScrollableDialog;

  useEffect(() => {
    if (newTreeState.isPanelOpen) {
      setMapSelectionEnabled(false);
      setCurrentTreeId(null);
    } else {
      setMapSelectionEnabled(true);
    }
  }, [newTreeState.isPanelOpen]);

  useEffect(() => {
    setMapSelectionEnabled(!newTreeState.isDragging);
  }, [newTreeState.isDragging]);

  const currentTreeData = {
    ...currentTreeDataVector,
    ...currentTreeDb,
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <MapContainer
        ref={mapContainerRef}
        drawerEnabled={drawerEnabled}
        drawerOpen={drawerOpen}
        drawerWidth={drawerWidth}
      >
        <Map
          containerRef={mapContainerRef}
          currentTreeDb={currentTreeDb}
          setCurrentTreeDataVector={setCurrentTreeDataVector}
          setCurrentTreeId={setCurrentTreeId}
          selectionEnabled={mapSelectionEnabled}
          onLoad={setMap}
        />
      </MapContainer>

      <Search map={map} />

      {newTreeState.isPanelOpen ? (
        <NewTree
          TreeDetailsContainer={treeDetailsContainer}
          drawerWidth={drawerWidth}
        />
      ) : (
        <Tree
          TreeDetailsContainer={treeDetailsContainer}
          drawerWidth={drawerWidth}
          map={map}
          currentTreeData={currentTreeData}
          currentTreeId={currentTreeId}
          setCurrentTreeId={setCurrentTreeId}
          isTreeQueryError={isTreeQueryError}
        />
      )}
    </Box>
  );
}

// Wrap the MapLayout component in an ErrorBoundary and NewTreeProvider so that it can use the
// useNewTree() hook to share state with NewTree and NewTree.
export default function WrappedMapLayout() {
  return (
    <ErrorBoundary>
      <NewTreeProvider>
        <UserLocationProvider>
          <MapboxManagerProvider>
            <MapLayout />
          </MapboxManagerProvider>
        </UserLocationProvider>
      </NewTreeProvider>
    </ErrorBoundary>
  );
}
