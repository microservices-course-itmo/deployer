import { CircularProgress } from '@material-ui/core'
import React from 'react'
import { useQuery } from 'react-query'
import { Appbar } from '../Appbar/Appbar'
import { SettingsList } from './SettingsList'

export const Settings = () => {
  const { isLoading, isError, data } = useQuery<{ [key: string]: string }>('applicationSettings', () =>
    fetch(`${process.env.API}/settings/get`).then((res) => res.json())
  )
  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
