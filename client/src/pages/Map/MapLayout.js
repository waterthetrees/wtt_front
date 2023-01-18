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

  const handleTransitionEnd = (event) => {
    // This event handler will get other transitions, like for the close box on the legend, so make
    // sure we're only listening to the map container changing size.  Also make sure the map has
    // loaded before trying to resize it, as this event seems to be triggered once on mobile before
    // the map is ready.
    if (event.target === mapContainerRef.current && map) {
      // If the transition has ended and the right margin is 0, then the drawer just opened.  In
      // other words, the right margin has transitioned from -350 (closed) to 0 (open).
      const drawerOpened =
        parseInt(getComputedStyle(event.target).marginRight, 10) === 0;
      // Get the location of the selected tree or the new tree to plant, if any.
      const { lng, lat } = currentTreeDb || newTreeState.coords || {};
      // Resizing the map will cause it to shift horizontally by half the drawerWidth.  We need to
      // shift it back by that amount so the user doesn't see the map move at all.  This delta is
      // not a const, as we'll adjust it below to keep a selected location in view, if necessary.
      let deltaX = (drawerWidth / 2) * (drawerOpened ? -1 : 1);

      if (Number.isFinite(lng)) {
        // Figure out where the selected location is in screen space.
        const treePoint = map.project([lng, lat]);
        // If the location is closer to the drawer than this, we'll shift the map so it stays
        // visible.
        const minDrawerOffset = 60;
        const newMapWidth = mapContainerRef.current.offsetWidth;
        const adjustment = Math.round(
          treePoint.x + minDrawerOffset - newMapWidth,
        );

        // Ignore negative adjustments, as those locations are > than the offset away from the
        // drawer. Positive adjustments will pan the map to the right, moving the selected location
        // out from under the newly opened drawer.
        deltaX += Math.max(0, adjustment);
      }

      // Opening/closing the drawer triggers a transition on this component, so now that it's done,
      // tell the map to resize to its new container size.
      map.resize();

      // Shift the map to counteract the shift caused by the resize we just did. Set the duration
      // to 0 so the pan is instant.
      map.panBy([deltaX, 0], { duration: 0 });
    }
  };

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
        onTransitionEnd={handleTransitionEnd}
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
