import React from 'react'
import { IApplicationInstance } from '../../../../types/Application'
import { ApplicationInstanceTable } from './ApplicationInstanceTable/ApplicationInstanceTable'

interface IApplicationPageTabDeployProps {
  description?: string
  templateVersion?: string
  instances?: IApplicationInstance[]
}

export const ApplicationPageTabDeploy = ({
  description,
  templateVersion,
  instances,
}: IApplicationPageTabDeployProps) => (
  <div>
    <h3>ApplicationPageTabDeploy</h3>
    {description}
    {templateVersion}
    {JSON.stringify(instances)}
    <ApplicationInstanceTable data={instances} />
  </div>
)
