import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { MainPage } from './pages/MainPage/MainPage'
import { ApplicationPage } from './pages/ApplicationPage/ApplicationPage'
import { SignIn } from './pages/LoginPage/LoginPage'
import { Settings } from './pages/SettingsPage/Settings'
import { NewAppPage } from './pages/NewAppPage/NewAppPage'
import { ProfilePage } from './pages/Profile/ProfilePage'

const Router = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthenticationChecked, setIsAuthenticationChecked] = useState(false)

  useEffect(() => {
    const accessToken = window.localStorage.getItem('accessToken')

    if (accessToken) {
      fetch(`http://77.234.215.138:18080/user-service/validate?token=${accessToken}`, {
        method: 'POST',
      })
        .then((res) => {
          if (res.ok) {
            setIsAuthenticated(true)
          } else {
            window.localStorage.clear()
          }
        })
        .finally(() => {
          setIsAuthenticationChecked(true)
        })
    } else {
      setIsAuthenticationChecked(true)
    }
  }, [])

  return isAuthenticationChecked ? (
    <BrowserRouter>
      <Switch>
        <Route exact path='/new-app' render={() => (isAuthenticated ? <NewAppPage /> : <Redirect to='/login' />)} />
        <Route exact path='/settings' render={() => (isAuthenticated ? <Settings /> : <Redirect to='/login' />)} />
        <Route exact path='/login' component={SignIn} />
        <Route exact path='/profile' render={() => (isAuthenticated ? <ProfilePage /> : <Redirect to='/login' />)} />
        <Route path='/app/:name' render={() => (isAuthenticated ? <ApplicationPage /> : <Redirect to='/login' />)} />
        <Route path='/' render={() => (isAuthenticated ? <MainPage /> : <Redirect to='/login' />)} />
      </Switch>
    </BrowserRouter>
  ) : null
}

export default Router
