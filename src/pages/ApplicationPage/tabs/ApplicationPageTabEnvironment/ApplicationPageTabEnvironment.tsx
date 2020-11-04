import React from 'react'
import { IEnvironmentVariable } from '../../../../types/Application'

interface IApplicationPageTabEnvironmentProps {
  env: IEnvironmentVariable[]
}

export const ApplicationPageTabEnvironment = ({ env }: IApplicationPageTabEnvironmentProps) => (
  <div>
    <h3>ApplicationPageTabEnvironment</h3>
    {JSON.stringify(env)}
  </div>
)
