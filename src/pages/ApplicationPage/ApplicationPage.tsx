import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { AppBar, Tab, Tabs } from '@material-ui/core'
import { useQuery } from 'react-query'
import { ApplicationPageTabType, IApplicationData } from '../../types/Application'
import { ApplicationPageTab } from './tabs/ApplicationPageTab'

interface IApplicationPageRouteParams {
  name: string
}

export const ApplicationPage = ({
  match: {
    params: { name },
  },
}: RouteComponentProps<IApplicationPageRouteParams>) => {
  const [currentTab, setCurrentTab] = useState(ApplicationPageTabType.DEPLOY)

  const { isLoading, isError, data } = useQuery<IApplicationData>('applicationData', () =>
    fetch(`${process.env.API}/get/byName/${name}`).then((res) => res.json())
  )

  const handleTabChange = (event: React.ChangeEvent<unknown>, newTab: ApplicationPageTabType) => {
    setCurrentTab(newTab)
  }

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>ERROR!</span>
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
