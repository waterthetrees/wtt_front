import React, { useState, useRef, useEffect } from 'react';
import {
  Box, styled, useMediaQuery, useTheme,
} from '@mui/material';
import { useTreeQuery } from '@/api/queries';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import DetailsDrawer from './DetailsDrawer';
import Map from './Map/Map';
import TreeDetailsPanel from './TreeDetails/TreeDetailsPanel';
import NewTreePanel from './NewTree/NewTreePanel';
import { useNewTree, NewTreeProvider } from './NewTree/useNewTree';
import ScrollableDialog from '@/components/ScrollableDialog/ScrollableDialog';

const drawerWidth = 350;

const MapContainer = styled('main', { shouldForwardProp: (prop) => prop.indexOf('drawer') !== 0 })(
  ({ theme, drawerEnabled, drawerOpen, drawerWidth }) => ({
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

// TODO: fix AddTree, which seems to be trying to remove the geolocater before it's added, and adds two geolocaters

function MapLayout() {
  const [map, setMap] = useState(null);
  const [currentTreeId, setCurrentTreeId] = useState(null);
  const [mapSelectionEnabled, setMapSelectionEnabled] = useState(true);
  const { newTreeState } = useNewTree();
  const mapContainerRef = useRef(null);
  const { data: currentTreeData, isError: isTreeQueryError } = useTreeQuery({ id: currentTreeId });
  const theme = useTheme();
  // Use a full-screen dialog on smaller screens instead of the drawer.
  const drawerEnabled = !useMediaQuery(theme.breakpoints.down('sm'));
  const drawerOpen = !!currentTreeId || newTreeState.isPanelOpen;
  const container = drawerEnabled
    ? DetailsDrawer
    : ScrollableDialog;

  const handleTransitionEnd = (event) => {
    // This event handler will get other transitions, like for the close box on the legend, so make
    // sure we're only listening to the map container changing size.  Also make sure the map has
    // loaded before trying to resize it, as this event seems to be triggered once on mobile before
    // the map is ready.
    if (event.target === mapContainerRef.current && map) {
      // If the transition has ended and the right margin is 0, then the drawer just opened.  In
      // other words, the right margin has transitioned from -350 (closed) to 0 (open).
      const drawerOpened = parseInt(getComputedStyle(event.target).marginRight, 10) === 0;
      // Resizing the map will cause it to shift horizontally by half the drawerWidth.  We need to
      // shift it back by that amount so the user doesn't see the map move at all.
      let deltaX = (drawerWidth / 2) * (drawerOpened ? -1 : 1);

      if (currentTreeData) {
        const { lng, lat } = currentTreeData;
        // Figure out where the selected tree is in screen space.
        const treePoint = map.project([lng, lat]);
        // If the tree is closer to the drawer than this, we'll shift the map so it's farther away.
        const minDrawerOffset = 50;
        const newMapWidth = mapContainerRef.current.offsetWidth;
        const adjustment = Math.round((treePoint.x + minDrawerOffset) - newMapWidth);

        // Ignore negative adjustments, as those trees are > 50px away from the drawer.  Positive
        // adjustments will pan the map to the right, moving the selected tree out from under the
        // newly opened drawer.
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
          currentTreeData={currentTreeData}
          setCurrentTreeId={setCurrentTreeId}
          selectionEnabled={mapSelectionEnabled}
          onLoad={setMap}
        />
      </MapContainer>

      {/* We need to render the DetailsDrawer even if nothing is selected so that its width is
          still reserved in the parent Box and therefore the marginRight calculations in
          Container are correct. */}
      {newTreeState.isPanelOpen
        ? (
          <NewTreePanel
            Container={container}
            drawerWidth={drawerWidth}
          />
        )
        : (
          <TreeDetailsPanel
            // Key the panel on the current tree, so that when the selection changes, all of the
            // components get re-rendered with fresh props.
            key={currentTreeId}
            Container={container}
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
// useNewTree() hook to share state with NewTree and NewTreePanel.
export default function WrappedMayLayout() {
  return (
    <ErrorBoundary>
      <NewTreeProvider>
        <MapLayout />
      </NewTreeProvider>
    </ErrorBoundary>
  );
}
