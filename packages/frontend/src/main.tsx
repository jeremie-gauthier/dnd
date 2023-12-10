import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      useRefreshTokens={true}
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: window.location.origin,
        // audience: 'https://dev-bzwd13qtp70ke1ou.eu.auth0.com/api/v2/',
        audience: 'http://localhost:3000/',
        scope: 'profile email read:current_user offline_access',
        // prompt: 'login'
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
);
