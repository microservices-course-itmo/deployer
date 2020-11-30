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
  'port-mappings': IPortMapping[]
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

export interface IPortMapping {
  port: string
  value: string
}

export interface IEnvironmentVariable {
  name: string
  value: string
}

export interface IHistoryState {
  env: IEnvironmentVariable
  volumes: string[]
  ports: IPortMapping
}

export interface IHistoryLog {
  id: string
  user: string
  date: string
  log: string
  prevState: IHistoryState
  currentState: IHistoryState
}

// export enum ApplicationInstanceStatusType {
//   RUNNING,
//   FAILED,
//   STARTING,
//   STOPPED,
//   REMOVED,
//   RESTARTING,
// }
