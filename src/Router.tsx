import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { MainPage } from './pages/MainPage/MainPage'
import { ApplicationPage } from './pages/ApplicationPage/ApplicationPage'

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/app/:name' component={ApplicationPage} />
      <Route path='/' component={MainPage} />
    </Switch>
  </BrowserRouter>
)

export default Router