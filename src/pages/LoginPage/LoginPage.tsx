import React from 'react'
import ReactDOM from 'react-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Avatar, Container, CssBaseline, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Appbar } from '../Appbar/Appbar'

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: 'center',
    width: '600px',
    height: '600px',
    position: 'absolute',
    top: '35%',
    left: '45%',
    margin: '-200px 0 0 -200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
})

export const SignIn = () => {
  const classes = useStyles()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <>
      <Appbar />
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <div>
            <form onSubmit={formik.handleSubmit} className={classes.form}>
              <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                id='email'
                name='email'
                label='Email'
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                id='password'
                name='password'
                label='Password'
                type='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button color='primary' variant='contained' fullWidth type='submit' className={classes.submit}>
                Submit
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </>
  )
}

ReactDOM.render(<SignIn />, document.getElementById('root'))
