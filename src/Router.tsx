import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import CreateApp from './pages/CreateApp/CreateApp'

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/create-app'>
        <CreateApp />
      </Route>
      <Route path='/'>
        <MainPage />
      </Route>
    </Switch>
  </BrowserRouter>
)

export default Router
