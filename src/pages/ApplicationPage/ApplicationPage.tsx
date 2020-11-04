import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { AppBar, Tab, Tabs } from '@material-ui/core'
import { ApplicationPageTabType, IApplicationData } from '../../types/Application'
import { ApplicationPageTab } from './tabs/ApplicationPageTab'
import { mockData } from './mock'

interface IApplicationPageRouteParams {
  name: string
}

export const ApplicationPage = ({
  match: {
    params: { name },
  },
}: RouteComponentProps<IApplicationPageRouteParams>) => {
  const [currentTab, setCurrentTab] = useState(ApplicationPageTabType.DEPLOY)
  const [applicationData, setApplicationData] = useState<IApplicationData>({})

  useEffect(() => {
    setTimeout(() => {
      setApplicationData(mockData)
    }, 250)
  }, [])

  // const handleTabChange = (event: React.ChangeEvent<unknown>, newTab: ApplicationPageTabType) => {
  //   setCurrentTab(newTab)
  // }

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
      {console.log(name)}
      <ApplicationPageTab tab={currentTab} data={applicationData} />
    </div>
  )
}
