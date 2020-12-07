import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { AppBar, Tab, Tabs } from '@material-ui/core'
import { useQuery } from 'react-query'
import API from '../../api'
import { ApplicationPageTabType, IApplicationData } from '../../types/Application'
import { ApplicationPageTab } from './tabs/ApplicationPageTab'
import { ApplicationErrorPage } from './ApplicationErrorPage'

interface IApplicationPageRouteParams {
  name: string
}

export const ApplicationPage = ({
  match: {
    params: { name },
  },
}: RouteComponentProps<IApplicationPageRouteParams>) => {
  const [currentTab, setCurrentTab] = useState(ApplicationPageTabType.DEPLOY)

  const { isLoading, isError, data } = useQuery<IApplicationData>(name, API.deploymentController.getAppByName)

  const handleTabChange = (event: React.ChangeEvent<unknown>, newTab: ApplicationPageTabType) => {
    setCurrentTab(newTab)
  }

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <ApplicationErrorPage />
  }

  return (
    <div>
      <AppBar position='static'>
        <Tabs value={currentTab} onChange={handleTabChange} centered>
          <Tab label='deploy' />
          <Tab label='environment' />
          <Tab label='ports' />
          <Tab label='volumes' />
        </Tabs>
      </AppBar>
      <ApplicationPageTab tab={currentTab} data={data!} />
    </div>
  )
}
