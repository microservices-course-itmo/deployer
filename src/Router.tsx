// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useSnackbar } from 'notistack'

import { MainPage } from './pages/MainPage/MainPage'
import { ApplicationPage } from './pages/ApplicationPage/ApplicationPage'
import { SignIn } from './pages/LoginPage/LoginPage'
import { Settings } from './pages/SettingsPage/Settings'
import { NewAppPage } from './pages/NewAppPage/NewAppPage'
import { ProfilePage } from './pages/Profile/ProfilePage'

const ProtectedRoute = ({ auth, ...params }) => {
  if (!auth) {
    return <Redirect to='/login' />
  }

  return <Route {...params} />
}

const Router = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthenticationChecked, setIsAuthenticationChecked] = useState(false)

  useEffect(() => {
    const accessToken = window.localStorage.getItem('accessToken')

    if (accessToken) {
      fetch(`http://77.234.215.138:18080/user-service/validate?token=${accessToken}`, {
        method: 'POST',
      })
        .then(() => {
          setIsAuthenticated(true)
        })
        .catch((err) => {
          enqueueSnackbar(`${err.status} Ошибка входа`, { variant: 'error' })
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
        <ProtectedRoute auth={isAuthenticated} exact path='/new-app' component={<NewAppPage />} />
        <ProtectedRoute auth={isAuthenticated} exact path='/settings' component={<Settings />} />
        <Route exact path='/login' component={SignIn} />
        <ProtectedRoute auth={isAuthenticated} exact path='/profile' component={<ProfilePage />} />
        <ProtectedRoute auth={isAuthenticated} path='/app/:name' component={<ApplicationPage />} />
        <ProtectedRoute auth={isAuthenticated} path='/' component={<MainPage />} />
      </Switch>
    </BrowserRouter>
  ) : null
}

export default Router
