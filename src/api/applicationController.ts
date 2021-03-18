const getRoute = (path: string) => `${process.env.API}${path}`

export const removeInstance = (id: string) =>
  fetch(getRoute(`/application/delete/byId/${id}`), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate',
    },
    body: JSON.stringify({
      id,
}),
