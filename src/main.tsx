import { createRoot } from 'react-dom/client'
import './index.css'

import { Provider } from 'react-redux'
import store from './redux/store.js'

import { ApolloProvider } from '@apollo/client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@descope/react-sdk'
import { UserProvider } from './context/UserContext'
import { HelmetProvider } from 'react-helmet-async'
import Application from './Application'
import { client } from './lib/Lib'

const queryClient = new QueryClient()
const isProd = import.meta.env.MODE === 'production'

createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthProvider
    projectId={import.meta.env.VITE_APP_DESCOPE_PROJECT_ID}
    sessionTokenViaCookie={isProd}
    refreshTokenViaCookie={isProd}
    persistTokens
  >
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={client}>
          <UserProvider>
            <HelmetProvider>
              {/* <ThemeProvider> */}
              {/* <SnackbarProvider
                      maxSnack={3}
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      autoHideDuration={3000}
                      TransitionComponent={Slide}
                      preventDuplicate
                    > */}


              <Application />


            </HelmetProvider>

          </UserProvider>
        </ApolloProvider>
      </QueryClientProvider>
    </Provider>
  </AuthProvider >
)
