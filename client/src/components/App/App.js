import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Auth0ProviderWithRedirect from '../Auth/Auth0ProviderWithRedirect';
import Header from '../Header';
import Mapper from '../../pages/mapper/Mapper';
import About from '../../pages/about/About';
import Privacy from '../../pages/privacy/Privacy';
import License from '../../pages/license/License';
import UserProfile from '../../pages/userprofile/UserProfile';
import Contact from '../../pages/contact/Contact';
import Data from '../../pages/data/Data';
import NotFound from '../../pages/notFound/NotFound';
import RequireAuth from '../Auth/RequireAuth';
import RedirectWithHash from '../Auth/RedirectWithHash';

// Create a client for react-query calls.
const queryClient = new QueryClient();

// Create a default MUI theme.
const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename="/">
          <Auth0ProviderWithRedirect>
            <Header />
            <Routes>
              <Route path="/" element={<Mapper />} />
              <Route path="/treemap" element={<Mapper />} />
              <Route path="/userprofile" element={<RequireAuth component={UserProfile} />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/license" element={<License />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/data" element={<Data />} />
              <Route path="/go" element={<RedirectWithHash param="to" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Auth0ProviderWithRedirect>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
