import { Button, Container, Grid, Stack } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DialogBox from '../components/DialogBox'
import CreateGame from '../components/CreateGame'
import PlayWithLink from '../components/PlayWithLink'
import { UserDetailsContext } from '../context/UserContext'



function HomePage() {
    const navigate = useNavigate()

    const handleChat = () => {
        navigate('/chat')
    }
    const handleStartGame = () => {
        navigate('/startgame')
    }

    const { user } = useContext(UserDetailsContext)
    const handleProfile = () => {
        navigate(`/profile/${user.userId}`)
    }
    const handleQuiz = () => {
        navigate('/quiz')
    }

    return (
        <>
            <Grid container direction='row' justifyContent='center' alignItems='center' height='80vh'>
                <Grid item>
                    <Stack width={200}>
                        <Button onClick={handleStartGame}>start game</Button>
                        <PlayWithLink />
                        <CreateGame />
                        <Button onClick={handleChat}>social</Button>
                        <Button onClick={handleQuiz}>quiz</Button>
                        <Button onClick={handleProfile}>profile</Button>
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

export default HomePage