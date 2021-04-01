const getRoute = (path: string) => `${process.env.API}${path}`

export const removeAppByName = (name: string) => {
  const accessToken = window.localStorage.getItem('accessToken')

  return fetch(getRoute(`/application/delete/byName/${name}`), {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate',
    },
  })
}
