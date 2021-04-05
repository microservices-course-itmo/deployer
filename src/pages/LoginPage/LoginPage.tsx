import React, { useEffect, useState } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import firebase from 'firebase'
import * as yup from 'yup'
import { useSnackbar } from 'notistack'
import { useFormik } from 'formik'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { Avatar, Button, Container, CssBaseline, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { Appbar } from '../Appbar/Appbar'

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '88px',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const validationSchemaFirst = yup.object({
  phone: yup.string().min(11, 'Phone should be of minimum 8 characters length').required('Phone is required'),
})

const validationSchemaSecond = yup.object({
  code: yup.string().required('Code is required'),
})

export const SignIn = () => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()

  const [secondForm, setSecondForm] = useState(false)
  const [sendCode, setSendCode] = useState<any | null>(null)
  const [userData, setUserData] = useState<null | { user: { name: string; birthdate: string; id: string } }>(null)
  const [recaptcha, setRecaptcha] = useState<firebase.auth.RecaptchaVerifier>(null)

  useEffect(() => {
    setRecaptcha(new firebase.auth.RecaptchaVerifier('recaptcha', { size: 'invisible' }))
  }, [])

  const formState1 = useFormik({
    initialValues: {
      phone: '',
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    validationSchemaFirst,
    onSubmit: (values) => {
      firebase
        .auth()
        .signInWithPhoneNumber(values.phone, recaptcha)
        .then((code: string) => {
          setSendCode(code)
          setSecondForm(true)
        })
        .catch((err: any) => {
          enqueueSnackbar(err.message, { variant: 'error' })
        })
    },
  })

  const formState2 = useFormik({
    initialValues: {
      code: '',
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    validationSchemaSecond,
    onSubmit: (values) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      sendCode
        .confirm(values.code)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .then(({ user: { za: token } }) => {
          const data = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: '123',
            },
            body: JSON.stringify({
              fireBaseToken: token,
            }),
          }

          fetch(`${process.env.API_USER_SERVICE}/user-service/login`, data as RequestInit)
            .then((resp) => {
              if (resp.status === 200) {
                resp.json().then((json) => {
                  window.localStorage.setItem('accessToken', json.accessToken)
                  window.localStorage.setItem('refreshToken', json.refreshToken)
                  window.location.replace('/')
                })
              } else {
                enqueueSnackbar(`Ошибка при попытке авторизации`, { variant: 'error' })
              }
            })
            .catch((err) => {
              enqueueSnackbar(err.message, { variant: 'error' })
            })
        })
        .catch((err: any) => {
          enqueueSnackbar(err.message, { variant: 'error' })
        })
    },
  })

  return (
    <>
      <Appbar isLoginPage />
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          {userData ? (
            <div>
              <h3>ID</h3>
              <h4>{userData.user.id}</h4>
              <br />
              <h3>Имя</h3>
              <h4>{userData.user.name}</h4>
              <br />
              <h3>Дата рождения</h3>
              <h4>{userData.user.birthdate}</h4>
            </div>
          ) : (
            <>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component='h1' variant='h5'>
                Sign in
              </Typography>
              <div>
                {secondForm ? (
                  <form onSubmit={formState2.handleSubmit} className={classes.form}>
                    <TextField
                      variant='outlined'
                      margin='normal'
                      fullWidth
                      id='code'
                      name='code'
                      label='Code'
                      value={formState2.values.code}
                      onChange={formState2.handleChange}
                      error={formState2.touched.code && Boolean(formState2.errors.code)}
                      helperText={formState2.touched.code && formState2.errors.code}
                    />
                    <Button color='primary' variant='contained' fullWidth type='submit' className={classes.submit}>
                      Submit
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={formState1.handleSubmit} className={classes.form}>
                    <TextField
                      variant='outlined'
                      margin='normal'
                      fullWidth
                      id='phone'
                      name='phone'
                      label='Phone'
                      value={formState1.values.phone}
                      onChange={formState1.handleChange}
                      error={formState1.touched.phone && Boolean(formState1.errors.phone)}
                      helperText={formState1.touched.phone && formState1.errors.phone}
                    />
                    <Button color='primary' variant='contained' fullWidth type='submit' className={classes.submit}>
                      Submit
                    </Button>
                  </form>
                )}
              </div>
            </>
          )}
          <div id='recaptcha' />
        </div>
      </Container>
    </>
  )
}
