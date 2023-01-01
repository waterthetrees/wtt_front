import React, { useState, useRef, useEffect } from 'react';
import { Box, styled } from '@mui/material';
import { useTreeQuery } from '@/api/queries';
import { useIsMobile } from '@/pages/NewTree/utilities';
import { UserLocationProvider } from '@/pages/UserLocation/useUserLocation';
import { useNewTree, NewTreeProvider } from '@/pages/NewTree/useNewTree';
import NewTree from '@/pages/NewTree/NewTree';
import PanelDrawer from '@/components/PanelDrawer/PanelDrawer';
import ScrollableDialog from '@/components/ScrollableDialog/ScrollableDialog';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import Tree from '@/pages/Tree/Tree';
import Map from './Map';

const DEFAULT_TREE_ZOOM = 17;
const drawerWidth = 350;

const MapContainer = styled('main', {
  shouldForwardProp: (prop) => prop.indexOf('drawer') !== 0,
})(
  ({
    theme,
    drawerEnabled,
    drawerOpen,
    drawerWidth, // eslint-disable-line no-shadow
  }) => ({
    background: '#c5def6',
    flexGrow: 1,
    // We need to use vh here, as height: 100% leaves the map at 0 height.
    height: '100vh',
    padding: 0,
    // Put a position on this element so that the map control groups will move when it changes size.
    position: 'relative',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: drawerEnabled ? -drawerWidth : 0,
    ...(drawerOpen && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
);

function MapLayout() {
  const hashParams = new URLSearchParams(window.location.hash.slice(1));
  const [currentTreeId, setCurrentTreeId] = useState(hashParams.get('id'));
  const [currentTreeDataVector, setCurrentTreeDataVector] = useState();
  const [currentTreeData, setCurrentTreeData] = useState();
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

  // On initial page load, if there is a tree id in the url as
  // a hash param, move to that tree on the map.
  useEffect(() => {
    if (!map) {
      return;
    }
    const { lng, lat } = currentTreeDataVector || currentTreeDb || {};
    const currentZoom = map.getZoom();
    if (lng) {
      map.flyTo({
        center: [lng, lat],
        zoom: currentZoom > DEFAULT_TREE_ZOOM ? currentZoom : DEFAULT_TREE_ZOOM,
      });
    } else {
      hashParams.delete('id');
      const newUrl = `${window.location.origin}#${decodeURIComponent(
        hashParams.toString(),
      )}`;
      window.history.replaceState({}, '', newUrl);
      setCurrentTreeId(null);
    }
  }, [map, currentTreeDataVector, currentTreeDb]);

  useEffect(() => {
    if (currentTreeDb) {
      setCurrentTreeData({
        ...currentTreeDb,
        ...currentTreeDataVector,
      });
    }
  }, [currentTreeDb]);

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

      {/* We need to render the TreeDetailsContainer Panel even if nothing
          is selected so that its width is
          still reserved in the parent Box and therefore the marginRight calculations in
          Container are correct. */}
      {newTreeState.isPanelOpen ? (
        <NewTree
          TreeDetailsContainer={treeDetailsContainer}
          drawerWidth={drawerWidth}
        />
      ) : (
        <Tree
          // Key the TreeDetailsContainer panel on the current tree,
          // so that when the selection changes, all of the
          // components get re-rendered with fresh props.
          key={currentTreeId}
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
          <MapLayout />
        </UserLocationProvider>
      </NewTreeProvider>
    </ErrorBoundary>
  );
}
