import { CircularProgress } from '@material-ui/core'
import React from 'react'
import { useQuery } from 'react-query'
import { Appbar } from '../Appbar/Appbar'
import { SettingsList } from './SettingsList'
import { checkAuthError } from '../../api/checkAuthError'

export const Settings = () => {
  const accessToken = window.localStorage.getItem('accessToken')

  const { isLoading, isError, data } = useQuery<{ [key: string]: string }>('applicationSettings', () =>
    fetch(`${process.env.API}/settings/get`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(checkAuthError)
      .then((res) => res.json())
  )
  if (isLoading) {
    return (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </div>
    )
  }

  if (isError) {
    return <span>Error</span>
  }

  return (
    <>
      <Appbar />
      <SettingsList settings={data!} />
    </>
  )
}
