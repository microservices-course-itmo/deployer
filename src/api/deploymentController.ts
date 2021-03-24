import { IApplicationData } from '../types/Application'

const getRoute = (path: string) => `${process.env.API}${path}`

interface IDeployInstance {
  alias: string
  name: string
  version: string
}

export const deployInstance = ({ alias, name, version }: IDeployInstance) => {
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
    }),
  }).then((resp) => resp.json())
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
  }).then((resp) => resp.json())
}

export const getAppByName = (name: string) => {
  const accessToken = window.localStorage.getItem('accessToken')
  return fetch(getRoute(`/application/get/byName/${name}`), {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((resp) => resp.json())
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
  }).then((resp) => resp.json())
}
