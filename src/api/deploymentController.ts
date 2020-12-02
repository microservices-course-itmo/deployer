const getRoute = (path: string) => `${process.env.API}${path}`

interface IDeployInstance {
  alias: string
  name: string
  version: string
}

export const deployInstance = ({ alias, name, version }: IDeployInstance) =>
  fetch(getRoute('/applicationInstance/deploy'), {
    method: 'post',
    body: JSON.stringify({
      alias,
      name,
      version,
    }),
  }).then((resp) => resp.json())

export const getAppByName = (name: string) =>
  fetch(getRoute(`/application/get/byName/${name}`)).then((resp) => resp.json())
