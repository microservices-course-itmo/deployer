import React, { useEffect, useState } from 'react'
import { Container, CssBaseline, Card, CardActions, CardContent, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { useHistory } from 'react-router-dom'
import { Appbar } from '../Appbar/Appbar'

const useStyles = makeStyles(() => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '45%',
  },
  card: {
    minWidth: '25rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    borderRadius: '1.5rem',
    backgroundImage: 'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)',
    boxShadow: '3px 5px 10px 5px rgb(63,81,181,0.66)',
  },
  userPicture: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '18px',
    marginBottom: '10px',
    padding: '0px 1rem',
  },
  userInfo: {
    display: 'block',
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid',
    fontSize: '16px',
    marginBottom: '1rem',
  },
  logoutBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: '1rem',
  },
}))

export const ProfilePage = () => {
  const classes = useStyles()

  const history = useHistory()

  const [userData, setUserData] = useState<null | {
    id: string
    birthdate: string
    createDate: string
    name: string
    phoneNumber: string
    city: {
      id: number
      name: string
    }
    isActivated: boolean
    role: {
      id: number
      name: string
    }
    firebaseId: string
  }>(null)

  const exitProfile = () => {
    window.localStorage.clear()
    history.replace('/login')
  }

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
          return fetch(`http://77.234.215.138:18080/user-service/users/${data.id}/full`)
        })
        .then((result) => result.json())
        .then((info) => {
          setUserData(info)
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
          <Card className={classes.card}>
            <CardContent>
              <div className={classes.userPicture}>
                <AccountCircleIcon style={{ fontSize: 80 }} />
                <div>
                  <span className={classes.userInfo}>
                    Name: <b>{userData?.name || ' '}</b>
                  </span>
                  <span className={classes.userInfo}>
                    ID: <b>{userData?.id || ' '}</b>
                  </span>
                </div>
              </div>
              <div>
                <div className={classes.userDetails}>
                  <span>Phone Number: </span>
                  <span>
                    <b>{userData?.phoneNumber || ''}</b>
                  </span>
                </div>
                <div className={classes.userDetails}>
                  <span>Birth date: </span>
                  <span>
                    <b>{userData?.birthdate || ''}</b>
                  </span>
                </div>
                <div className={classes.userDetails}>
                  <span>City: </span>
                  <span>
                    <b>{userData?.city.name || ''}</b>
                  </span>
                </div>
                <div className={classes.userDetails}>
                  <span>Role: </span>
                  <span>
                    <b>{userData?.role.name || ''}</b>
                  </span>
                </div>
              </div>
            </CardContent>
            <CardActions className={classes.logoutBtn}>
              {userData && (
                <Button onClick={exitProfile} color='primary' variant='contained' type='submit'>
                  Log out
                </Button>
              )}
            </CardActions>
          </Card>
        </div>
      </Container>
    </>
  )
}
