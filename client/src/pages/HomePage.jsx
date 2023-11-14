import { Button, Container, Grid, Stack } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DialogBox from '../components/DialogBox'
import CreateGame from '../components/CreateGame'
import PlayWithLink from '../components/PlayWithLink'



function HomePage() {
    const navigate = useNavigate()

    const handleChat = () => {
        navigate('/chat')
    }
    const handleStartGame = () => {
        navigate('/startgame')
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
                        <Button disabled>Example</Button>
                        <Button disabled>feature 5</Button>
                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

export default HomePage