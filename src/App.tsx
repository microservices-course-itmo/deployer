import { CssBaseline } from '@material-ui/core'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import { QueryCache, ReactQueryCacheProvider, ReactQueryConfigProvider } from 'react-query'
import Router from './Router'
import { initFirebase } from './firebase'

initFirebase()

const queryCache = new QueryCache()

const config = {
  queries: {
    retry: 0,
  },
}

const App = () => (
  <ReactQueryConfigProvider config={config}>
    <ReactQueryCacheProvider queryCache={queryCache}>
      <SnackbarProvider>
        <CssBaseline />
        <Router />
      </SnackbarProvider>
    </ReactQueryCacheProvider>
  </ReactQueryConfigProvider>
)

export default App
