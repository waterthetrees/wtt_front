import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import { Auth0Provider } from '@auth0/auth0-react';
import App from './components/app';
// import registerServiceWorker from './registerServiceWorker';
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';

const app = (
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
  </BrowserRouter>
);

ReactDOM.render(app, document.querySelector('.root'));
// registerServiceWorker();
