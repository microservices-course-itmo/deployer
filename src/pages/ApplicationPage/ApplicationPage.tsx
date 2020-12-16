import React from 'react'
import { useParams } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'
import { useQuery } from 'react-query'
import { Appbar } from '../Appbar/Appbar'
import API from '../../api'
import { IApplicationData } from '../../types/Application'
import { Deploy } from './Deploy'
import { ApplicationErrorPage } from '../ApplicationErrorPage'

export const ApplicationPage = () => {
  const { name } = useParams<{ name: string }>()
  const { isLoading, isError, data } = useQuery<IApplicationData>(name, API.deploymentController.getAppByName)

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </div>
    )
  }

  if (isError) {
    return <ApplicationErrorPage />
  }

  return (
    <>
      <Deploy data={data!} />
    </>
  )
}
