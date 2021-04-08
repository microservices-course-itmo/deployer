// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect, useState } from 'react'
import {
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
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Checkbox,
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
    display: 'flex',
    flexDirection: 'row',
    marginTop: '64px',
    marginBottom: '1%',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  deployBtn: {
    width: '150px',
  },
  modalContainer: {
    position: 'absolute',
    float: 'left',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '550px',
    backgroundColor: '#f5f5f5',
    outline: 'none',
    borderRadius: '12px',
    padding: '25px 70px',
    boxShadow: '5px 3px 15px 3px rgba(63,81,181,0.50)',
  },
  attributes: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  warningBtnRow: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '100px',
    width: '100%',
    justifyContent: 'space-between',
  },
}))

export const Deploy = ({ data }: { data: IApplicationData }) => {
  const { versions = [], instances, dateCreated, description, logs } = data

  const history = useHistory()
  const classes = useStyles()
  const { name: appName } = useParams<{ name: string }>()
  const { enqueueSnackbar } = useSnackbar()
  const { hash } = useLocation()

  const [tab, setTab] = useState('')

  const [warning, setWarning] = useState(false)

  const [version, setVersion] = useState(versions[versions.length - 1])
  const [instanceItems, setInstanceItems] = useState<IApplicationInstance[]>(instances)
  const [alias, setAlias] = useState('')
  const [memoryLimit, setMemoryLimit] = useState('')
  const [modalState, setModalState] = useState(false)
  const attributes = ['Test instance', 'Stop traffic']
  const [attributesState, setAttributeState] = useState({
    testInstance: false,
    stopTraffic: false,
  })
  const resources = ['Memory limit']

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
    onSuccess: (newItem) => {
      if (newItem.status !== 500) {
        setInstanceItems((items) => [...items.filter((item) => item.alias !== newItem.alias), newItem])
      } else {
        enqueueSnackbar(`${newItem.status} - ${newItem.error}`, { variant: 'error' })
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

  const handleChangeAttributes = (event) => {
    setAttributeState({ ...attributesState, [event.target.name]: event.target.checked })
  }

  const deployInstance = () => {
    const bytes = parseInt(memoryLimit, 10) || 0
    mutate({ alias, version, name: appName, memoryBytesLimit: bytes, attributes: attributesState }).then(() => {
      setVersion(versions[versions.length - 1])
      setAlias('')
      setMemoryLimit('')
      setAttributeState({
        testInstance: false,
        stopTraffic: false,
      })
      setWarning(false)
      setModalState(false)
    })
  }

  const onClickDeploy = () => {
    if (instanceItems.some((item) => item.alias === alias)) {
      setWarning(true)
    } else {
      deployInstance()
    }
  }

  const createdAt = (dateCreated ? new Date(dateCreated) : new Date()).toISOString().split('T')[0]

  return (
    <div>
      <Appbar />
      <Container className={classes.formControl}>
        <Tabs value={tab} onChange={(e, newTab) => setTab(newTab)}>
          <Tab value={TabTypes.app} label='APP' />
          <Tab value={TabTypes.env} label='ENV' />
          <Tab value={TabTypes.ports} label='PORTS' />
          <Tab value={TabTypes.volumes} label='VOLUMES' />
        </Tabs>
        <div>
          <Typography variant='body2'>Description:</Typography>
          <Typography variant='body1'>{description}</Typography>
        </div>
        <div>
          <Typography variant='body2'>Last release:</Typography>
          <Typography variant='body1'>{createdAt}</Typography>
        </div>

        <Button
          className={classes.deployBtn}
          variant='contained'
          disabled={!version}
          onClick={() => setModalState(true)}
        >
          Deploy
        </Button>
        <Modal
          open={modalState}
          onClose={() => {
            setWarning(false)
            setModalState(false)
          }}
        >
          {warning ? (
            <div className={classes.modalContainer}>
              <div style={{ textAlign: 'center' }}>
                <span style={{ display: 'block', fontSize: '21px' }}>Instance with this alias already exists</span>
                <span style={{ display: 'block', fontSize: '21px' }}>Are you sure want to redeploy it?</span>
              </div>
              <div className={classes.warningBtnRow}>
                <Button
                  onClick={() => {
                    setWarning(false)
                  }}
                  variant='contained'
                  color='secondary'
                  className={classes.deployBtn}
                >
                  Cancel
                </Button>
                <Button onClick={deployInstance} variant='contained' color='primary' className={classes.deployBtn}>
                  Deploy
                </Button>
              </div>
            </div>
          ) : (
            <div className={classes.modalContainer}>
              <Grid container direction='row' justify='space-between' alignItems='center'>
                <TextField disabled label='Name' variant='outlined' value={appName} />
                <div>
                  <InputLabel htmlFor='app_version' className={classes.inputLabelStyle}>
                    Version
                  </InputLabel>
                  <Select inputProps={{ id: 'app_version' }} value={version} onChange={handleVersionChange}>
                    {versions.map((vers) => (
                      <MenuItem key={vers} value={vers}>
                        {vers}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </Grid>
              <Table>
                <TableHead>
                  <TableCell>Resources</TableCell>
                  <TableCell align='right'>Quantity</TableCell>
                </TableHead>
                <TableBody>
                  {resources.map((resource) => (
                    <TableRow key={resource}>
                      <TableCell>{resource}</TableCell>
                      <TableCell align='right'>
                        <TextField variant='outlined' value={memoryLimit} onChange={handleMemoryLimitChange} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <br />
              <Table>
                <TableHead>
                  <TableCell>Attributes</TableCell>
                  <TableCell align='right'>Select</TableCell>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Test instance</TableCell>
                    <TableCell align='right'>
                      <Checkbox
                        checked={attributesState.testInstance}
                        onChange={handleChangeAttributes}
                        name='testInstance'
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Stop traffic</TableCell>
                    <TableCell align='right'>
                      <Checkbox
                        checked={attributesState.stopTraffic}
                        onChange={handleChangeAttributes}
                        name='stopTraffic'
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <br />
              <div>
                <TextField label='Alias' variant='outlined' value={alias} onChange={handleAliasChange} />
              </div>
              <br />
              <Button onClick={onClickDeploy} variant='contained' color='primary' className={classes.deployBtn}>
                Deploy
              </Button>
            </div>
          )}
        </Modal>
      </Container>
      <hr className={classes.hrStyle} />
      <div style={{ display: 'flex' }}>
        <Container style={{ display: tab === TabTypes.app ? 'block' : 'none' }}>
          <InstancesTable data={instanceItems} />
          <HistoryLog variant={logs} />
        </Container>

        <Container style={{ display: tab === TabTypes.env ? 'block' : 'none' }}>
          <EnvironmentsTable data={data} />
        </Container>

        <Container style={{ display: tab === TabTypes.ports ? 'block' : 'none' }}>
          <PortsTable data={data} />
        </Container>

        <Container style={{ display: tab === TabTypes.volumes ? 'block' : 'none' }}>
          <VolumesTable data={data} />
        </Container>
      </div>
    </div>
  )
}
