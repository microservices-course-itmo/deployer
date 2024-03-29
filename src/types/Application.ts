export interface IApplicationData {
  id: string
  name: string
  description: string
  templateVersion: string
  environmentVariables: IEnvironmentVariable[]
  volumes: string[]
  ports: IPorts
  versions: string[]
  instances: IApplicationInstance[]
  createdBy: string
  dateCreated: string
  baseBranch: string
  logs: IHistoryLog[]
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
  resources?: { [key: string]: string }
}

export interface IPorts {
  [key: string]: string
}

export interface IEnvironmentVariable {
  name: string
  value: string
}

export interface IHistoryState {
  env: IEnvironmentVariable
  volumes: string[]
  ports: IPorts
}

export interface IHistoryLog {
  id: string
  user: string
  date: string
  message: string
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
