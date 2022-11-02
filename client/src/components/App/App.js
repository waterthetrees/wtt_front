import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import Header from '@/components/Header/Header';
import Sidebar from '@/components/Sidebar/Sidebar';
import {
  Loading,
  Auth0ProviderWithRedirect,
  RequireAuth,
  RedirectWithHash,
} from '@/components/Auth';
import About from '@/pages/About/About';
import Privacy from '@/pages/Privacy/Privacy';
import License from '@/pages/License/License';
import UserProfile from '@/pages/Userprofile/UserProfile';
import Contact from '@/pages/Contact/Contact';
import NotFound from '@/pages/NotFound/NotFound';
import './App.css';
import { Box } from '@mui/material';

// Lazy-load the data page, so that we only load the large JSON files it uses if needed.  Also
// lazy-load the /map route, so that it doesn't impact the default route.
const Data = React.lazy(() =>
  import(/* webpackChunkName: "Data" */ '@/pages/Data/Data'),
);
const MapLayout = React.lazy(() =>
  import(/* webpackChunkName: "MapLayout" */ '@/pages/Map/MapLayout'),
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
              <Box sx={{ display: 'flex' }}>
                <Header />
                <Sidebar />
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
                    <Route path="/data" element={<Data />} />
                    <Route
                      path="/go"
                      element={<RedirectWithHash param="to" />}
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </Box>
            </Auth0ProviderWithRedirect>
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
