import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './global.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { Notifications } from '@mantine/notifications';
import { Auth0Provider } from '@auth0/auth0-react';
import { FiltersProvider } from './context/FiltersContext';
import { OptionsProvider } from './context/OptionsContext';
import { SelectedFiltersProvider } from './context/SelectedFiltersContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App() {
  const queryClient = new QueryClient();

  return (
    <Auth0Provider
      domain='easyprompts.eu.auth0.com'
      clientId='ah2cBGpaMydRymfVj1isGtFKFo3cfbue'
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <MantineProvider defaultColorScheme='dark' theme={theme}>
        <QueryClientProvider client={queryClient}>
          <OptionsProvider>
            <FiltersProvider>
              <SelectedFiltersProvider>
                <Notifications />
                <Router />
              </SelectedFiltersProvider>
            </FiltersProvider>
          </OptionsProvider>
        </QueryClientProvider>
      </MantineProvider>
    </Auth0Provider>
  );
}
