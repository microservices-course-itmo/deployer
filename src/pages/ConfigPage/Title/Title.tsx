import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
  createStyles({
    main: {
      color: 'black',
    },
  })
)
interface ITitleProps {
  text: string
}

export const Title = ({ text }: ITitleProps) => {
  const classes = useStyles()
  return <h1 className={classes.main}>{text}</h1>
}
