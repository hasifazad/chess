import { Box, Button, Container, FormLabel, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import Textarea from '@mui/joy/Textarea';
import { Form, useSubmit } from 'react-router-dom';
import { Formik } from 'formik';
import api from '../Axios'

function AddQuestions() {

    const [state, setState] = useState({

    })
    const onHandleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const onHandleSubmit = () => {

    }

    return (
        <>
            <Container>
                <Grid height='88vh' container border={1} alignItems='center' justifyContent='center'>
                    <Grid item gap={2}>
                        <Box>
                            <Formik
                                initialValues={{ question: '', option_1: '', option_2: '', option_3: '', option_4: '', subject: '', answer: '' }}
                                onSubmit={(values, { resetForm }) => {
                                    console.log(values)
                                    resetForm()

                                    api.post('/quiz/set-questions', values).then((response) => {
                                        console.log(response)
                                        resetF
                                    }).catch((error) => {
                                        console.log(error)
                                    })
                                }}
                            >{
                                    ({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        isSubmitting,
                                    }) => (
                                        <form onSubmit={handleSubmit}>
                                            <Box>
                                                <FormLabel>Type question</FormLabel>
                                                <Textarea onChange={handleChange} value={values.question} name="question" />
                                            </Box>
                                            <Box>
                                                <FormLabel>Option</FormLabel>
                                                <TextField onChange={handleChange} value={values.option_1} name="option_1" size='small' />
                                            </Box>
                                            <Box>
                                                <FormLabel>Option</FormLabel>
                                                <TextField onChange={handleChange} value={values.option_2} name="option_2" size='small' />
                                            </Box>
                                            <Box>
                                                <FormLabel>Option</FormLabel>
                                                <TextField onChange={handleChange} value={values.option_3} name="option_3" size='small' />
                                            </Box>
                                            <Box>
                                                <FormLabel>Option</FormLabel>
                                                <TextField onChange={handleChange} value={values.option_4} name="option_4" size='small' />
                                            </Box>
                                            <Box>
                                                <FormLabel>Subject</FormLabel>
                                                <TextField onChange={handleChange} value={values.subject} name="subject" size='small' />
                                            </Box>
                                            <Box>
                                                <FormLabel>Answer</FormLabel>
                                                <TextField onChange={handleChange} value={values.answer} name="answer" size='small' />
                                            </Box>
                                            <Button type="submit">submit</Button>
                                        </form>
                                    )
                                }

                            </Formik>
                        </Box>
                    </Grid>
                </Grid>
            </Container >
        </>
    )
}

export default AddQuestions