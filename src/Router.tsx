import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { MainPage } from './pages/MainPage'
import { ROUTES_REGISTRY } from './definitions'

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={ROUTES_REGISTRY.MAIN.path}>
        <MainPage />
      </Route>
      <Route path={ROUTES_REGISTRY.CREATE_APP.path}>
        <div>Hi, create app here</div>
      </Route>
    </Switch>
  </BrowserRouter>
)

export default Router
