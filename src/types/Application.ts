export enum ApplicationPageTabType {
  'DEPLOY',
  'ENVIRONMENT',
  'PORTS',
  'VOLUMES',
}

export interface IApplicationData {
  name: string
  description: string
  templateVersion: string
  createdBy: string
  lastRelease: string

  'port-mappings': string[]
  volumes: string[]
  env: IEnvironmentVariable[]
  instances: IApplicationInstance[]
  versions: string[]
  history: IHistoryLog[]
}

export interface IApplicationInstance {
  id: string
  appId: string
  templateId: string
  version: string
  containerId: string
  dateCreated: string
  userCreated: string
  status: string
  url: string
  alias: string
}

export interface IEnvironmentVariable {
  name: string
  value: string
}

export interface IHistoryLog {
  id: string
  user: string
  date: string
  log: string
}

// export enum ApplicationInstanceStatusType {
//   RUNNING,
//   FAILED,
//   STARTING,
//   STOPPED,
//   REMOVED,
//   RESTARTING,
// }
