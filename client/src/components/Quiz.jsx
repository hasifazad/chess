import { Box, Button, Container, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from '../Axios'
import Loading from './Loading';
import { useNavigate, useParams } from 'react-router-dom';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { Player } from '@lottiefiles/react-lottie-player';


function Quiz() {
    const { subject } = useParams()


    function shuffleArray(array = [1, 2, 3, 4, 5]) {
        const shuffledArray = [...array]; // Create a copy to avoid modifying the original array

        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }

        return shuffledArray;
    }

    const style = {
        border: '1px solid gray',
        borderRadius: '20px',
        padding: '20px',
        marginBottom: '10px'
    }
    const lottieStyle = {
        height: '200px',
        width: '200px'
    }

    const tClr = {
        border: '2px solid green',
        borderRadius: '10px',
        color: 'black',
        backgroundColor: '#B8FFB7'
    }
    const fClr = {
        border: '2px solid red',
        borderRadius: '10px',
        color: 'black',
        backgroundColor: '#FFC2BF'
    }
    const [count, setCount] = useState(0)
    const [score, setScore] = useState(0)
    const [state, setState] = useState('')
    const [questions, setQuestions] = useState([])
    const [question, setQuestion] = useState({})
    const [finished, setFinished] = useState(false)
    const [answer, setAnswer] = useState(null)
    const [options, setOptions] = useState([])
    const [total, setTotal] = useState(0)
    const [error, setError] = useState(false)

    useEffect(() => {
        api.get(`/quiz/get-questions/${subject}/5`).then((response) => {
            console.log(response);
            setQuestions(response.data.questions)
            setQuestion(response.data.questions[0])
            setTotal(response.data.questions.length)
            setOptions(shuffleArray(response.data.questions[0].options))
        }).catch((error) => {
            console.log(error);
            setError(true)
        })
    }, [])

    const onHandleSubmit = () => {
        console.log('hello', question.answer);
        console.log(answer);
        if (!answer) return
        if (question.answer == answer) {
            console.log(true);
            setState('correct')
            setScore(score + 1)
        } else {
            setState('incorrect')
            console.log(false);
        }
        setFinished(true)
        setCount(count + 1)
    }

    const handleChange = (e) => {
        console.log(e.target.value);
        setAnswer(e.target.value)
    }
    const [end, setEnd] = useState(false)
    const onHandleNext = () => {
        if (questions.length == count) {
            setEnd(true)
            return
        }
        console.log(count);
        setQuestion(questions[count])
        setOptions(shuffleArray(questions[count].options))
        setFinished(false)
        setState('')
        setAnswer(null)

    }
    // useEffect(() => {
    //     if (count > 0) {
    //         console.log('hello');
    //         onHandleNext()
    //     }
    //     let timer
    //     if (count <= (questions.length - 1)) {
    //         timer = setTimeout(() => {
    //             setCount(count + 1)
    //         }, 10 * 1000)
    //     }
    // }, [count, questions])


    let navigate = useNavigate()
    return (
        <>
            <Container>
                <Grid height='88vh' container alignItems='center' justifyContent='center'>
                    {error ?
                        <>
                            <Grid item border={3} borderRadius={5} borderColor='#31AC9B' height='50%' width='100%' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                                <Player
                                    src='https://lottie.host/808f0817-d08c-4681-b38c-32a3793a06c9/iqreofYDNJ.json'
                                    style={lottieStyle}
                                    autoplay
                                    loop
                                />

                                <Typography variant='h4'>Quiz not found</Typography>
                                <Button onClick={() => { navigate('/quiz') }} variant='outlined'>back</Button>
                            </Grid>

                        </>


                        :
                        <> {end ? <>
                            <Grid item>

                                <Typography variant='h5'>The End</Typography>
                                <Typography variant='h4'>Your Score : {score}</Typography>
                                <Button variant='outlined' onClick={() => { navigate('/quiz') }}>Play Again</Button>
                            </Grid>
                        </>

                            : <Grid item xs={12} md={7}>
                                <Box sx={style} display='flex' justifyContent='end'>

                                    {/* <CountdownCircleTimer

                                        key={count}
                                        size={50}
                                        strokeWidth={6}
                                        isPlaying
                                        duration={10}
                                        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                        colorsTime={[7, 5, 2, 0]}>
                                        {({ remainingTime }) => remainingTime}
                                    </CountdownCircleTimer>
                                    <Typography>{count}</Typography> */}
                                </Box>
                                <Box sx={style}>
                                    <Typography>{question?.question}</Typography>
                                    {/* <Typography>{state}</Typography> */}
                                </Box>
                                <Box sx={style}>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                    >
                                        {options?.map((a, i) => <FormControlLabel

                                            key={i}
                                            sx={
                                                answer == a ?
                                                    state == 'correct' ?
                                                        tClr : state != '' ?
                                                            fClr : null : null || question.answer == a && state != '' ? tClr : null
                                            }

                                            onChange={state == '' ? handleChange : null} value={a} control={<Radio color='default' />} label={a} />
                                        )}
                                    </RadioGroup>
                                </Box>
                                <Box sx={style} display='flex' justifyContent='space-between' alignItems='center'>
                                    {!finished ? <Button disableElevation variant='contained' color='success' onClick={onHandleSubmit}>submit</Button> :
                                        <Button disableElevation variant='contained' onClick={onHandleNext}>next</Button>}

                                    <Typography variant='h5'>{count} / {total}</Typography>
                                    <Typography>Score : {score}</Typography>
                                </Box>
                            </Grid>
                        }</>
                    }
                </Grid>
            </Container>
        </>
    )
}

export default Quiz