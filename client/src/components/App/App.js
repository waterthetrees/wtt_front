import React, { Suspense } from 'react';
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
import NotFound from '../../pages/notFound/NotFound';
import RequireAuth from '../Auth/RequireAuth';
import RedirectWithHash from '../Auth/RedirectWithHash';
import Loading from '../Auth/Loading';
import "../../styles/app.scss";

// Lazy-load the data page, so that we only load the large JSON files it uses if needed.
const Data = React.lazy(() => import(/* webpackChunkName: "Data" */ '../../pages/data/Data'));

// Create a client for react-query calls.
const queryClient = new QueryClient();

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
