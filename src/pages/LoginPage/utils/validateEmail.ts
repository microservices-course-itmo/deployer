export const validateEmail = (email: string) => {
  const re = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
  return re.test(email)
}
