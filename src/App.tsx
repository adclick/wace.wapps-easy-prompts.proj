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
import { UserPromptRequestProvider } from './context/UserPromptRequestContext';
import { PromptsSelectedFiltersProvider } from './context/PromptsSelectedFiltersContext';
import { SelectedDatabaseTypeProvider } from './context/SelectedDatabaseTypeContext';
import { ModifiersSelectedFiltersProvider } from './context/ModifiersSelectedFiltersContext';
import { PromptsRequestsProvider } from './context/PromptsRequestsContext';
import { SelectedModifiersProvider } from './context/SelectedModifiersContext';
import { SelectedTemplateProvider } from './context/SelectedTemplateContext';
import { TemplatesSelectedFiltersProvider } from './context/TemplatesSelectedFiltersContext';
import { PromptModeProvider } from './context/PromptModeContext';


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
                  <TemplatesSelectedFiltersProvider>
                    <SelectedModifiersProvider>
                      <SelectedTemplateProvider>
                        <PromptsRequestsProvider>
                          <UserPromptRequestProvider>
                            <PromptModeProvider>
                              <Notifications />
                              <Router />
                            </PromptModeProvider>
                          </UserPromptRequestProvider>
                        </PromptsRequestsProvider>
                      </SelectedTemplateProvider>
                    </SelectedModifiersProvider>
                  </TemplatesSelectedFiltersProvider>
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
