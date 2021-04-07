import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { createStyles, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      display: 'flex',
      marginTop: '100px',
      alignItems: 'center',
      flexDirection: 'column',
    },
  })
)

export const ApplicationErrorPage = () => {
  const classes = useStyles()
  const [seconds, setSeconds] = useState(3)

  const history = useHistory()

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevState) => prevState - 1)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    if (seconds <= 0) {
      history.push('/')
    }
  }, [seconds])

  return (
    <div className={classes['wrapper']}>
      <h1>Whoops!</h1>
      <p>We couldn't find the App you were looking for.</p>
      <span>you will be redirected to the Home page in {seconds} seconds...</span>
    </div>
  )
}
