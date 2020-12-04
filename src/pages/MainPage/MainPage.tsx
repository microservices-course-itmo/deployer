import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    page: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}))

export const MainPage = () => {
    const classes = useStyles()

    return (
        <Container component='main' maxWidth='xs'>
            <div className={classes.page}>
                Данного сервиса не существует
                <a href='http://localhost:8081/app/deployment-service'>Вернуться назад</a>
            </div>
        </Container>
    )
}
