import React from 'react'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import Router from './Router'

const queryCache = new QueryCache()

const App = () => (
  <ReactQueryCacheProvider queryCache={queryCache}>
    <Router />
  </ReactQueryCacheProvider>
)

export default App
