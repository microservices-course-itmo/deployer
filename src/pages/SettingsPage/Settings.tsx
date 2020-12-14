import React from 'react'
import { useQuery } from 'react-query'
import { SettingsList } from './SettingsList'

export const Settings = () => {
  const { isLoading, isError, data } = useQuery<{ [key: string]: string }>('applicationSettings', () =>
    fetch(`${process.env.API}/settings/get`).then((res) => res.json())
  )
  if (isLoading) {
    return <span>Loading</span>
  }

  if (isError) {
    return <span>Error</span>
  }

  return <SettingsList settings={data!} />
}
