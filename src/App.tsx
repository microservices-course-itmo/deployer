import { CssBaseline } from '@material-ui/core'
import React from 'react'
import { QueryCache, ReactQueryCacheProvider, ReactQueryConfigProvider } from 'react-query'
import Router from './Router'

const queryCache = new QueryCache()

const config = {
  queries: {
    retry: 0,
  },
}

const App = () => (
  <ReactQueryConfigProvider config={config}>
    <ReactQueryCacheProvider queryCache={queryCache}>
      <CssBaseline />
      <Router />
    </ReactQueryCacheProvider>
  </ReactQueryConfigProvider>
)

export default App
