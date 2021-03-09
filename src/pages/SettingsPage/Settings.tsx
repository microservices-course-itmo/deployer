import { CircularProgress } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          margin: '0 auto',
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
