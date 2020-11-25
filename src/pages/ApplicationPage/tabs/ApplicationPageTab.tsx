import React, { memo } from 'react'
import { ApplicationPageTabType, IApplicationData } from '../../../types/Application'
import { ApplicationPageTabDeploy } from './ApplicationPageTabDeploy/ApplicationPageTabDeploy'
import { ApplicationPageTabEnvironment } from './ApplicationPageTabEnvironment/ApplicationPageTabEnvironment'
import { ApplicationPageTabPorts } from './ApplicationPageTabPorts/ApplicationPageTabPorts'
import { ApplicationPageTabVolumes } from './ApplicationPageTabVolumes/ApplicationPageTabVolumes'

interface IApplicationPageTabProps {
  tab: ApplicationPageTabType
  data?: IApplicationData
}

export const ApplicationPageTab = memo(({ tab, data }: IApplicationPageTabProps) => {
  if (!data) return <div>Loading...</div>

  switch (tab) {
    case ApplicationPageTabType.ENVIRONMENT:
      return <ApplicationPageTabEnvironment env={data.env} />
    case ApplicationPageTabType.PORTS:
      return <ApplicationPageTabPorts ports={data['port-mappings']} />
    case ApplicationPageTabType.VOLUMES:
      return <ApplicationPageTabVolumes volumes={data.volumes} />
    case ApplicationPageTabType.DEPLOY:
    default:
      return (
        <ApplicationPageTabDeploy
          description={data.description}
          instances={data.instances}
          templateVersion={data.templateVersion}
          possibleVersions={data.versions}
          lastRelease={data.lastRelease}
          history={data.history}
        />
      )
  }
})
