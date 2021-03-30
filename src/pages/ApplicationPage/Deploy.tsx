// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect, useState } from 'react'
import {
  FormControl,
  Container,
  Grid,
  MenuItem,
  Modal,
  Select,
  Button,
  InputLabel,
  TextField,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useMutation } from 'react-query'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { IApplicationInstance, IApplicationData } from '../../types/Application'
import { InstancesTable } from './InstancesTable/InstancesTable'
import { HistoryLog } from './HistoryLog/HistoryLog'
import API from '../../api'
import { Appbar } from '../Appbar/Appbar'
import { PortsTable } from './SecondTable/PortsTable'
import { EnvironmentsTable } from './SecondTable/EnvironmentsTable'
import { VolumesTable } from './SecondTable/VolumesTable'

const TabTypes = {
  app: 'app',
  env: 'env',
  ports: 'ports',
  volumes: 'volumes',
}

const useStyles = makeStyles(({ spacing }) => ({
  formControl: {
    marginTop: '5%',
    marginBottom: '1%',
  },
  hrStyle: {
    marginBottom: '1%',
    height: '3px',
    color: '#3F51B5',
    borderWidth: '0',
    backgroundColor: '#3F51B5',
  },
  h3Style: {
    marginBottom: '1.5px',
    padding: '5px',
  },
  buttonContainerStyle: {
    marginRight: '4%',
  },
  inputLabelStyle: {
    color: '#3F51B5',
  },
  secondTable: {
    marginLeft: spacing(2),
    width: '30%',
  },
  tables: {
    display: 'flex',
  },
  formPanel: {
    marginTop: '85px',
  },
}))

export const Deploy = ({ data }: { data: IApplicationData }) => {
  const { versions = [], instances, dateCreated, description, logs } = data

  const history = useHistory()
  const classes = useStyles()
  const { name: appName } = useParams<{ name: string }>()
  const { enqueueSnackbar } = useSnackbar()
  const { hash } = useLocation()

  const [tab, setTab] = useState()

  const [version, setVersion] = useState(versions[versions.length - 1])
  const [instanceItems, setInstanceItems] = useState<IApplicationInstance[]>(instances)
  const [alias, setAlias] = useState('')
  const [memoryLimit, setMemoryLimit] = useState('')
  const [modalState, setModalState] = useState(false)

  useEffect(() => {
    const hashValue = hash?.slice(1)
    if (tab !== hashValue) {
      history.push({ hash: `#${tab}` })
    }
  }, [tab])

  useEffect(() => {
    const hashValue = hash?.slice(1)
    setTab(hashValue || TabTypes.app)
  }, [])

  const [mutate] = useMutation(API.deploymentController.deployInstance, {
    onSuccess: (newItems) => {
      if (newItems.status !== 500) {
        setInstanceItems((items) => [...items, newItems])
      } else {
        enqueueSnackbar(`${newItems.status} - ${newItems.error}`, { variant: 'error' })
      }
    },
    onError: (error: Error) => {
      enqueueSnackbar(`${error.name} - ${error.message}`, { variant: 'error' })
    },
  })

  const handleVersionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setVersion(event.target.value as string)
  }

  const handleAliasChange = (event: React.ChangeEvent<{ value: string }>) => {
    setAlias(event.target.value)
  }

  const handleMemoryLimitChange = (event: React.ChangeEvent<{ value: string }>) => {
    setMemoryLimit(event.target.value)
  }

  const onClickDeploy = () => {
    const bytes = parseInt(memoryLimit, 10) || 0
    mutate({ alias, version, name: appName, memoryBytesLimit: bytes })
    setVersion(versions[versions.length - 1])
    setAlias('')
    setMemoryLimit('')
  }

  const createdAt = (dateCreated ? new Date(dateCreated) : new Date()).toISOString().split('T')[0]

  return (
    <div>
      <Appbar />
      <Container className={classes.formControl}>
        <Grid container direction='row' justify='space-around' alignItems='center' className={classes.formPanel}>
          <Grid item className={classes.buttonContainerStyle}>
            <Button variant='contained' disabled={!version} onClick={() => setModalState(true)}>
              Deploy
            </Button>
            <Modal open={modalState} onClose={() => setModalState(false)}>
              <Grid item>
                <Typography variant='h5'>Description: {description}</Typography>
                <Typography variant='h6'>Last release: {createdAt}</Typography>
              </Grid>
              <Grid item>
                <InputLabel placeholder='Version' className={classes.inputLabelStyle} />
                <FormControl variant='filled'>
                  <Select value={version} onChange={handleVersionChange}>
                    {versions.map((vers) => (
                      <MenuItem key={vers} value={vers}>
                        {vers}
                      </MenuItem>
                    ))}
                  </Select>
                  <TextField label='Alias' variant='filled' value={alias} onChange={handleAliasChange} />
                  <TextField
                    label='Memory limit'
                    variant='filled'
                    value={memoryLimit}
                    onChange={handleMemoryLimitChange}
                  />
                </FormControl>
              </Grid>
              <Grid>
                <Button variant='contained' disabled={!version} onClick={onClickDeploy}>
                  Deploy
                </Button>
              </Grid>
            </Modal>
          </Grid>
        </Grid>
        <Container>
          <Tabs value={tab} onChange={(e, newTab) => setTab(newTab)}>
            <Tab value={TabTypes.app} label='APP' />
            <Tab value={TabTypes.env} label='ENV' />
            <Tab value={TabTypes.ports} label='PORTS' />
            <Tab value={TabTypes.volumes} label='VOLUMES' />
          </Tabs>
        </Container>
      </Container>
      <hr className={classes.hrStyle} />
      <div style={{ display: 'flex' }}>
        {tab === TabTypes.app && (
          <Container>
            <InstancesTable data={instanceItems} />
            <HistoryLog variant={logs} />
          </Container>
        )}
        {tab === TabTypes.env && (
          <Container>
            <EnvironmentsTable data={data} />
          </Container>
        )}
        {tab === TabTypes.ports && (
          <Container>
            <PortsTable data={data} />
          </Container>
        )}
        {tab === TabTypes.volumes && (
          <Container>
            <VolumesTable data={data} />
          </Container>
        )}
      </div>
    </div>
  )
}
