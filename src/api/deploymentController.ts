import { IApplicationData } from '../types/Application'

const getRoute = (path: string) => `${process.env.API}${path}`

interface IDeployInstance {
  alias: string
  name: string
  version: string
}

export const deployInstance = ({ alias, name, version }: IDeployInstance) =>
  fetch(getRoute('/applicationInstance/deploy'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate',
    },
    body: JSON.stringify({
      alias,
      name,
      version,
    }),
  }).then((resp) => resp.json())

export const updateData = (newData: IApplicationData) =>
  fetch(getRoute('/application/createOrUpdate'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate',
    },
    body: JSON.stringify(newData),
  }).then((resp) => resp.json())

export const getAppByName = (name: string) =>
  fetch(getRoute(`/application/get/byName/${name}`)).then((resp) => resp.json())

export const removeInstance = (id: string) =>
  fetch(getRoute(`/applicationInstance/delete/byId/${id}`), {
    method: 'DELETE',
  }).then((resp) => resp.json())
