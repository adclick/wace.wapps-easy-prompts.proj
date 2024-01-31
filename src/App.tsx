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
import { SelectedDatabaseTypeProvider } from './context/SelectedDatabaseTypeContext';
import { PromptsRequestsProvider } from './context/PromptsRequestsContext';
import { SelectedModifiersProvider } from './context/SelectedModifiersContext';
import { SelectedTemplateProvider } from './context/SelectedTemplateContext';
import { PromptModeProvider } from './context/PromptModeContext';
import { SelectedFiltersProvider } from './context/SelectedFiltersContext';
import { SelectedTemplatesProvider } from './context/SelectedTemplatesContext';
import { ModalsProvider } from '@mantine/modals';
import AppUpdateModal from './components/Common/AppUpdateModal/AppUpdateModal';

const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

export default function App() {
  const queryClient = new QueryClient();

  return (
    <Auth0Provider
      domain={auth0Domain}
      clientId={auth0ClientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <MantineProvider defaultColorScheme='dark' theme={theme}>
        <QueryClientProvider client={queryClient}>
          <UserProvider>
            <SelectedDatabaseTypeProvider>
              <SelectedFiltersProvider>
                <SelectedModifiersProvider>
                  <SelectedTemplatesProvider>
                    <SelectedTemplateProvider>
                      <PromptsRequestsProvider>
                        <UserPromptRequestProvider>
                          <PromptModeProvider>
                            <ModalsProvider>
                              <AppUpdateModal />
                              <Notifications />
                              <Router />
                            </ModalsProvider>
                          </PromptModeProvider>
                        </UserPromptRequestProvider>
                      </PromptsRequestsProvider>
                    </SelectedTemplateProvider>
                  </SelectedTemplatesProvider>
                </SelectedModifiersProvider>
              </SelectedFiltersProvider>
            </SelectedDatabaseTypeProvider>
          </UserProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </MantineProvider>
    </Auth0Provider>
  );
}
