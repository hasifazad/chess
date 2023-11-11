import React, { useState } from 'react'
import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import axios from 'axios'
import api from '../Axios';

function Signup() {
    const paperStyle = { padding: '30px 20px', width: '350px', margin: '50px auto' }
    const textStyle = { margin: '10px 0', backgroundColor: 'white' }
    const errStyle = { color: 'red', margin: 0 }

    let [signupResponse, setSignupResponse] = useState(null)
    let { register, handleSubmit, formState: { errors } } = useForm()

    // const BASE_URL = import.meta.env.VITE_API_BASE_URL
    const onSubmit = (data) => {
        console.log(data);
        api.post(`/user/register`, data).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error.response);
        })
    }

    return (
        <Grid item xs={4}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar sx={{ width: 56, height: 56 }}>
                        <LockOpenIcon />
                    </Avatar>
                    <Typography variant='h5'>SIGN UP</Typography>
                    <Typography variant='caption'>Please fill this form to create an account</Typography>
                    <p style={errStyle}>{signupResponse ? signupResponse : null}</p>
                </Grid>
                <Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField style={textStyle} type='text' fullWidth label='Username' size='small' variant='filled' name='username'
                            {...register("username", { required: true, minLength: 3 })} />
                        {errors.username && errors.username.type === "required" && (<span style={errStyle}>This field is required</span>)}
                        {errors.username && errors.username.type === "minLength" && (<span style={errStyle}>Min 3 characters</span>)}

                        <TextField style={textStyle} type='text' fullWidth label='Email' size='small' variant='filled' name='email'
                            {...register("email", { required: true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ })} />
                        {errors.email && errors.email.type === "required" && (<span style={errStyle}>This field is required</span>)}
                        {errors.email && errors.email.type === "pattern" && (<span style={errStyle}>Email must be valid</span>)}

                        <TextField style={textStyle} type='password' fullWidth label='Password' size='small' variant='filled' name='password'
                            {...register("password", { required: true })} />
                        {/* pattern: /^[A-Za-z]\w{7,14}$/ */}
                        {errors.password && errors.password.type === "required" && (<span style={errStyle}>This field is required</span>)}
                        {/* {errors.password && errors.password.type === "pattern" && (<span style={errStyle}>Enter a strong password</span>)} */}
                        <Button fullWidth variant='contained' color='primary' type='submit'>Sign Up</Button>

                    </form>
                    <div style={{ display: 'flex', margin: '5px', justifyContent: 'space-between' }}>
                        <p style={{ margin: '0' }}>Already have account?</p>
                        <Link to='/login'>Login</Link>
                    </div>
                </Box>
            </Paper>
        </Grid>
    )
}

export default Signup