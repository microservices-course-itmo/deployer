import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { MainPage } from './pages/MainPage'

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/'>
        <MainPage />
      </Route>
    </Switch>
  </BrowserRouter>
)

export default Router
