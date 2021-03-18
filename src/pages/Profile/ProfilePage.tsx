import React, { useEffect, useState } from 'react'
import { Container, CssBaseline } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { Appbar } from '../Appbar/Appbar'

const useStyles = makeStyles(() => ({
  paper: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '88px',
  },
}))

export const ProfilePage = () => {
  const classes = useStyles()

  const history = useHistory()

  const [userData, setUserData] = useState<null | {
    name: string
    birthdate: string
    id: string
    phoneNumber: string
    role: string
  }>(null)

  useEffect(() => {
    const accessToken = window.localStorage.getItem('accessToken')

    if (accessToken) {
      fetch('http://77.234.215.138:18080/user-service/users/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserData(data)
        })
        .catch(() => {
          history.replace('/login')
        })
    } else {
      history.replace('/login')
    }
  }, [])

  return (
    <>
      <Appbar />
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <div className={classes.paper}>
          <div>
            <h3>ID</h3>
            <h4>{userData?.id || ''}</h4>
            <br />
            <h3>Phone Number</h3>
            <h4>{userData?.phoneNumber || ''}</h4>
            <br />
            <h3>Name</h3>
            <h4>{userData?.name || ''}</h4>
            <br />
            <h3>Birth date</h3>
            <h4>{userData?.birthdate || ''}</h4>
          </div>
          {userData && (
            <Button color='primary' variant='contained' fullWidth type='submit'>
              exit
            </Button>
          )}
        </div>
      </Container>
    </>
  )
}
