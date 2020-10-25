export enum ApplicationPageTabType {
  'DEPLOY',
  'ENVIRONMENT',
  'PORTS',
  'VOLUMES',
}

export interface IApplicationData {
  templateVersion?: string
  createdBy?: string
  name?: string
  'port-mappings'?: string[]
  volumes?: string[]
  description?: string
  env?: IEnvironmentVariable[]
  instances?: IApplicationInstance[]
}

export interface IApplicationInstance {
  appId?: string
  templateId?: string
  version?: string
  containerId?: string
  dateCreated?: string
  userCreated?: string
  status?: string
  url?: string
}

export interface IEnvironmentVariable {
  name: string
  value: string
}

// export enum ApplicationInstanceStatusType {
//   RUNNING,
//   FAILED,
//   STARTING,
//   STOPPED,
//   REMOVED,
//   RESTARTING,
// }
