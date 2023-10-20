import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { Auth0Provider } from '@auth0/auth0-react';

export default function App() {
  return (
    // <Auth0Provider
    //   domain='easyprompts.eu.auth0.com'
    //   clientId='ah2cBGpaMydRymfVj1isGtFKFo3cfbue'
    //   authorizationParams={{
    //     redirect_uri: window.location.origin
    //   }}
    // >
    //   <MantineProvider defaultColorScheme='dark' theme={theme}>
    //     <Router />
    //   </MantineProvider>
    // </Auth0Provider>
    <MantineProvider defaultColorScheme='dark' theme={theme}>
      <Router />
    </MantineProvider>
  );
}
