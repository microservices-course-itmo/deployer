import React from 'react'

import { IApplicationData } from '../../../types/Application'
import { EnvironmentsTable } from './EnvironmentsTable'
import { PortsTable } from './PortsTable'
import { VolumesTable } from './VolumesTable'

interface ISecondTable {
  data: IApplicationData
  type: number
  className?: string
}

export const SecondTable = ({ className, type, data }: ISecondTable) => {
  const components = [<EnvironmentsTable data={data} />, <PortsTable data={data} />, <VolumesTable data={data} />]

  return <div className={className}>{components[type]}</div>
}
