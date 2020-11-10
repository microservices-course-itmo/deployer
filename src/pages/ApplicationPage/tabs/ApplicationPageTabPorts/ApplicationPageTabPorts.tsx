import React from 'react'
import { IPortMapping } from '../../../../types/Application'

interface IApplicationPageTabPortsProps {
  ports: IPortMapping[]
}

export const ApplicationPageTabPorts = ({ ports }: IApplicationPageTabPortsProps) => (
  <div>
    <h3>ApplicationPageTabPorts</h3>
    {JSON.stringify(ports)}
  </div>
)
