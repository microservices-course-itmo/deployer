export const checkAuthError = (res: Response) => {
  if (res.status === 401) {
    window.localStorage.clear()
    window.location.reload()
  }
  return res
}
