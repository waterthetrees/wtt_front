import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Auth0ProviderWithRedirect from '@/components/Auth/Auth0ProviderWithRedirect';
import Header from '@/components/Header';
import Mapper from '@/pages/mapper/Mapper';
import MapLayout from '@/pages/map/MapLayout';
import About from '@/pages/about/About';
import Privacy from '@/pages/privacy/Privacy';
import License from '@/pages/license/License';
import UserProfile from '@/pages/userprofile/UserProfile';
import Contact from '@/pages/contact/Contact';
import NotFound from '@/pages/notFound/NotFound';
import RequireAuth from '@/components/Auth/RequireAuth';
import RedirectWithHash from '@/components/Auth/RedirectWithHash';
import Loading from '@/components/Auth/Loading';
import './App.css';

// Lazy-load the data page, so that we only load the large JSON files it uses if needed.
const Data = React.lazy(() => import(/* webpackChunkName: "Data" */ '@/pages/data/Data'));

// Create a client for react-query calls.  Don't automatically refetch the data when the window is
// focused since it's not changing that frequently.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// Create a default MUI theme so that any child can access it for styling.
const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename="/">
          <Auth0ProviderWithRedirect>
            <Header />
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Mapper />} />
                <Route path="/treemap" element={<Mapper />} />
                <Route path="/map" element={<MapLayout />} />
                <Route path="/userprofile" element={<RequireAuth component={UserProfile} />} />
                <Route path="/about" element={<About />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/license" element={<License />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/data" element={<Data />} />
                <Route path="/go" element={<RedirectWithHash param="to" />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Auth0ProviderWithRedirect>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
