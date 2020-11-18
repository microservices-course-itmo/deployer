import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { MainPage } from './pages/MainPage/MainPage'
import { ApplicationPage } from './pages/ApplicationPage/ApplicationPage'
import { SignIn } from './pages/LoginPage/LoginPage'

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/login' component={SignIn} />
      <Route path='/app/:name' component={ApplicationPage} />
      <Route path='/' component={MainPage} />
    </Switch>
  </BrowserRouter>
)

export default Router
