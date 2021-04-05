import { IApplicationData } from '../types/Application'
import { checkAuthError } from './checkAuthError'

const getRoute = (path: string) => `${process.env.API}${path}`

interface IDeployInstance {
  alias: string
  name: string
  version: string
  memoryBytesLimit: number
  attributes: { testInstance: boolean; stopTraffic: boolean }
}

export const deployInstance = ({ alias, name, version, memoryBytesLimit, attributes }: IDeployInstance) => {
  const accessToken = window.localStorage.getItem('accessToken')

  return fetch(getRoute('/applicationInstance/deploy'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      alias,
      name,
      version,
      resources: {
        memoryBytesLimit,
      },
      attributes,
    }),
  })
    .then(checkAuthError)
    .then((resp) => resp.json())
}

export const updateData = (newData: IApplicationData) => {
  const accessToken = window.localStorage.getItem('accessToken')

  return fetch(getRoute('/application/createOrUpdate'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(newData),
  })
    .then(checkAuthError)
    .then((resp) => resp.json())
}

export const getAppByName = (name: string) => {
  const accessToken = window.localStorage.getItem('accessToken')

  return fetch(getRoute(`/application/get/byName/${name}`), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(checkAuthError)
    .then((resp) => resp.json())
}

export const removeInstance = (id: string) => {
  const accessToken = window.localStorage.getItem('accessToken')

  return fetch(getRoute(`/applicationInstance/${id}`), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate',
    },
  })
    .then(checkAuthError)
    .then((resp) => resp.json())
}

export const changeInstanceStatus = ({ id, status }: { id: string; status: string }) => {
  const accessToken = window.localStorage.getItem('accessToken')

  return fetch(getRoute(`/applicationInstance/${status}/${id}`), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate',
    },
  })
    .then(checkAuthError)
    .then((resp) => resp.json())
}

export const getApplicationNames = () => {
  const accessToken = window.localStorage.getItem('accessToken')

  return fetch(getRoute(`/application/names`), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then(checkAuthError)
    .then((resp) => resp.json())
}
