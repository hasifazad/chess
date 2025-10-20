import React, { useState } from 'react'
import Quiz from '../components/Quiz'
import AddQuestions from '../components/AddQuestions'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { Player } from '@lottiefiles/react-lottie-player';

const ar = ['general', 'history', 'geography', 'science', 'maths', 'computer']
const arr = [
    {
        name: 'general',
        img: ''
    },
    {
        name: 'history',
        img: ''
    },
    {
        name: 'geography',
        img: 'https://lottie.host/c8bf9af9-d20c-40c6-9430-8981f735f53e/92MRLaAncV.json'
    },
    {
        name: 'science',
        img: 'https://lottie.host/7c3644df-9a38-48e2-a6db-4be120e37a1c/jZU9Os3p35.json'
    },
    {
        name: 'maths',
        img: 'https://lottie.host/3182ef14-b21a-4b76-a5fe-a2dc282bf967/rNOEGdBzYe.json'
    },
    {
        name: 'computer',
        img: 'https://lottie.host/1c142664-c303-4eb2-b67e-b70b80a30a91/6Alg3IRid5.json'
    },
]

function QuizPage() {
    const btnStyle = {
        height: '100px',
        margin: '0 5px 0 5px'
    }

    const [state, setState] = useState(true)
    const navigate = useNavigate()

    const onHandleClick = (value) => {
        console.log(value);
        navigate("/quiz/" + value)
    }
    return (
        <>


            <>
                <Container>
                    <Grid height='90vh' container justifyContent='center' alignItems='center'>
                        {state ? <Grid item display='flex'>
                            {arr.map((v, i) => <Box sx={{ border: '1px solid', height: '150px', width: '150px', borderRadius: '15px' }}>
                                <Link to={`/quiz/${v.name}`}
                                    style={{ textDecoration: 'none' }}>
                                    <Player

                                        src={v.img}
                                        autoplay
                                        loop
                                        style={{ height: '130px', width: '130px' }}
                                    />
                                    <Typography textAlign='center'>{v.name.toUpperCase()}</Typography>
                                </Link>
                            </Box>)}
                        </Grid> : null}
                        <Grid item>

                            {/* <Button onClick={() => { navigate('/quiz/add-question') }}>Add Question</Button> */}
                        </Grid>
                    </Grid>
                </Container>
            </>

        </>
    )
}

export default QuizPage