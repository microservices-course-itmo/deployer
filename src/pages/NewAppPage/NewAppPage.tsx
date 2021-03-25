import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Avatar, Container, CssBaseline, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { Appbar } from '../Appbar/Appbar'
import { updateData } from '../../api/deploymentController'
import { IApplicationData } from '../../types/Application'

const prepareData = (values: {
  alias: string
  baseBranch: string
  description: string
  name: string
}): IApplicationData => {
  return {
    createdBy: 'User',
    dateCreated: `${new Date().getTime().toFixed()}`,
    environmentVariables: [],
    id: `${Math.floor(Math.random() * 10000)}`,
    instances: [],
    logs: [],
    ports: {},
    templateVersion: '0',
    versions: [],
    volumes: [],
    ...values,
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '108px',
    textAlign: 'center',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(1),
  },
  form: {
    marginTop: theme.spacing(1),
    width: '100%',
  },
  create: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const validationSchema = yup.object({
  alias: yup.string().required('Alias is required'),
  baseBranch: yup.string().notRequired(),
  description: yup.string().required('Description is required'),
  name: yup.string().required('Name is required'),
})

export const NewAppPage = () => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()

  const history = useHistory()

  const formik = useFormik({
    initialValues: {
      alias: '',
      baseBranch: '',
      description: '',
      name: '',
    },
    validationSchema,
    onSubmit: (values) => {
      updateData(prepareData(values))
        .then(({ name }) => {
          if (name) {
            history.push(`/app/${name}`)
          }
        })
        .catch((error: Error) => {
          enqueueSnackbar(`${error.name} - ${error.message}`, { variant: 'error' })
        })
    },
  })

  return (
    <>
      <Appbar />
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AddOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Create new app
          </Typography>
          <div>
            <form onSubmit={formik.handleSubmit} className={classes.form}>
              <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                id='name'
                name='name'
                label='Name'
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                id='description'
                name='description'
                label='Description'
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
              <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                id='baseBranch'
                name='baseBranch'
                label='Base branch'
                value={formik.values.baseBranch}
                onChange={formik.handleChange}
                error={formik.touched.baseBranch && Boolean(formik.errors.baseBranch)}
                helperText={formik.touched.baseBranch && formik.errors.baseBranch}
              />
              <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                id='alias'
                name='alias'
                label='Alias'
                value={formik.values.alias}
                onChange={formik.handleChange}
                error={formik.touched.alias && Boolean(formik.errors.alias)}
                helperText={formik.touched.alias && formik.errors.alias}
              />
              <Button color='primary' variant='contained' fullWidth type='submit' className={classes.create}>
                Create
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </>
  )
}
