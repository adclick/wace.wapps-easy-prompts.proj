import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { Notifications } from '@mantine/notifications';
import { Auth0Provider } from '@auth0/auth0-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './context/UserContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RequestsProvider } from './context/RequestsContext';
import { UserPromptRequestProvider } from './context/UserPromptRequestContext';
import { PromptsSelectedFiltersProvider } from './context/ModifiersSelectedFiltersContext';
import { SelectedDatabaseTypeProvider } from './context/SelectedDatabaseTypeContext';
import { ModifiersSelectedFiltersProvider } from './context/PromptsSelectedFiltersContext copy';
import { PromptsRequestsProvider } from './context/PromptsRequestsContext';
import { ModifiersSelectedProvider } from './context/ModifiersSelectedContext';


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
          <UserProvider>
            <SelectedDatabaseTypeProvider>
              <PromptsSelectedFiltersProvider>
                <ModifiersSelectedFiltersProvider>
                  <ModifiersSelectedProvider>
                    <PromptsRequestsProvider>
                      <RequestsProvider>
                        <UserPromptRequestProvider>
                          <Notifications />
                          <Router />
                        </UserPromptRequestProvider>
                      </RequestsProvider>
                    </PromptsRequestsProvider>
                  </ModifiersSelectedProvider>
                </ModifiersSelectedFiltersProvider>
              </PromptsSelectedFiltersProvider>
            </SelectedDatabaseTypeProvider>
          </UserProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </MantineProvider>
    </Auth0Provider>
  );
}
