import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {
  Auth0ProviderWithRedirect,
  Loading,
  RedirectWithHash,
  RequireAuth,
} from '@/components/Auth';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import Header from '@/components/Header/Header';
import About from '@/pages/About/About';
import Contact from '@/pages/Contact/Contact';
import License from '@/pages/License/License';
import NotFound from '@/pages/NotFound/NotFound';
import Privacy from '@/pages/Privacy/Privacy';
import UserProfile from '@/pages/Userprofile/UserProfile';

import './App.css';

// Lazy-load the treelist data page, so that we only load the large JSON files it uses if needed.  Also
// lazy-load the /map route, so that it doesn't impact the default route.
const Source = React.lazy(() =>
  import(/* webpackChunkName: "Source" */ '@/pages/Source/Source'),
);
const MapLayout = React.lazy(() =>
  import(/* webpackChunkName: "MapLayout" */ '@/pages/Map/MapLayout'),
);
const TreeList = React.lazy(() =>
  import(/* webpackChunkName: "TreeList" */ '@/pages/TreeList/TreeList'),
);
const TreePage = React.lazy(() =>
  import(/* webpackChunkName: "TreePage" */ '@/pages/TreeList/TreePage'),
);
const TreeCare = React.lazy(() =>
  import(/* webpackChunkName: "TreeCare" */ '@/pages/TreeCare/TreeCare'),
);

// Create a client for react-query calls.  Don't automatically refetch the data when the window is
// focused since it's not changing that frequently.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

// Create an MUI theme so that any child can access it for styling via the hooks.
const theme = createTheme({
  typography: {
    fontFamily: 'inherit',
  },
});

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter basename="/">
            <Auth0ProviderWithRedirect>
              <Header />
              <Suspense fallback={<Loading />}>
                <Routes>
                  <Route path="/" element={<MapLayout />} />
                  <Route path="/map" element={<MapLayout />} />
                  <Route
                    path="/userprofile"
                    element={<RequireAuth component={UserProfile} />}
                  />
                  <Route path="/about" element={<About />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/license" element={<License />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/treecare" element={<TreeCare />} />
                  <Route path="/source" element={<Source />} />
                  <Route path="/treelist" element={<TreeList />} />
                  <Route path="/tree/:common" element={<TreePage />} />
                  <Route path="/tree/:scientific" element={<TreePage />} />
                  <Route path="/go" element={<RedirectWithHash param="to" />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </Auth0ProviderWithRedirect>
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
