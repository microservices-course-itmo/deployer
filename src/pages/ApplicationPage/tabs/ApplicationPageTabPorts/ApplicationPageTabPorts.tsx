import React from 'react'

interface IApplicationPageTabPortsProps {
  ports: string[]
}

export const ApplicationPageTabPorts = ({ ports }: IApplicationPageTabPortsProps) => (
  <div>
    <h3>ApplicationPageTabPorts</h3>
    {JSON.stringify(ports)}
  </div>
)
