import React from 'react'

interface IApplicationPageTabVolumesProps {
  volumes: string[]
}

export const ApplicationPageTabVolumes = ({ volumes }: IApplicationPageTabVolumesProps) => (
  <div>
    <h3>ApplicationPageTabVolumes</h3>
    {JSON.stringify(volumes)}
  </div>
)
