import React from 'react'

import { IEnvironmentVariable, IPorts } from '../../../types/Application'
import { SecondTableTypes } from '../types'
import { EnvironmentsTable } from './EnvironmentsTable'
import { PortsTable } from './PortsTable'
import { VolumesTable } from './VolumesTable'

interface ISecondTable {
  env: IEnvironmentVariable[]
  ports: IPorts
  volumes: string[]
  type: number
  className: string
}

export const SecondTable = ({ className, type, env = [], ports = {}, volumes = [] }: ISecondTable) => {
  const components = [<EnvironmentsTable env={env} />, <PortsTable ports={ports} />, <VolumesTable volumes={volumes} />]

  return <div className={className}>{components[type]}</div>
}
