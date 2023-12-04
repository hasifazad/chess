import React, { useState } from 'react'
import Quiz from '../components/Quiz'
import AddQuestions from '../components/AddQuestions'
import { Button, Container, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const arr = ['general', 'history', 'geography', 'science', 'maths', 'computer']

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
                        {state ? <Grid item>
                            {arr.map((v, i) => <Button key={i} onClick={() => { onHandleClick(v) }} variant='outlined' style={btnStyle}>{v}</Button>)}
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