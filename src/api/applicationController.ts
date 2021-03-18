const getRoute = (path: string) => `${process.env.API}${path}`

export const removeInstance = (id: string) =>
  fetch(getRoute(`/application/delete/byId/${id}`), {
    method: 'DELETE',
  }).then((resp) => resp.json())
  