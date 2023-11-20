import React, { useContext, useState } from 'react'
import { Avatar, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import axios from 'axios';
import { UserDetailsContext } from '../context/UserContext';
import api from '../Axios';


function Login() {
    const paperStyle = { padding: '30px 20px', width: '350px', margin: '50px auto' }
    const textStyle = { margin: '10px 0', backgroundColor: 'white' }
    const span = { color: 'red' }
    const errStyle = { color: 'red', margin: 0 }


    let [loginResponse, setLoginResponse] = useState(null)
    let { register, handleSubmit, formState: { errors } } = useForm()

    let { setUser, user } = useContext(UserDetailsContext)

    const navigate = useNavigate();

    // const BASE_URL = import.meta.env.VITE_API_BASE_URL
    const onSubmit = (data) => {
        api.post(`/user/login`, data).then((response) => {

            localStorage.setItem('user', response.data.user.accessToken)
            setUser({
                status: true,
                username: response.data.user.username,
                userId: response.data.user.userId,
                email: response.data.user.email
            })
            navigate('/')
        }).catch((error) => {
            console.log(error.response);
        })
    }
    console.log(user);
    return (
        <Grid container>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar sx={{ width: 56, height: 56 }}>
                        <VpnKeyIcon />
                    </Avatar>
                    <Typography variant='h5'>LOG IN</Typography>
                    <Typography variant='caption'>Please fill this form to create an account</Typography>
                    <p style={errStyle}>{loginResponse ? loginResponse : null}</p>
                </Grid>
                <Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField style={textStyle} type='text' fullWidth label='Email' size='small' variant='filled' name='email'
                            {...register("email", { required: true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ })} />
                        {errors.email && errors.email.type === "required" && (<span style={span}>This field is required</span>)}
                        {errors.email && errors.email.type === "pattern" && (<span style={span}>Email must be valid</span>)}

                        <TextField style={textStyle} type='password' fullWidth label='Password' size='small' variant='filled' name='password'
                            {...register("password", { required: true })} />
                        {/* pattern: /^[A-Za-z]\w{7,14}$/ */}
                        {errors.password && errors.password.type === "required" && (<span style={span}>This field is required</span>)}
                        {/* {errors.password && errors.password.type === "pattern" && (<span style={span}>Enter a strong password</span>)} */}
                        <Button fullWidth variant='contained' color='primary' type='submit'>Log in</Button>
                        <Typography align='center' padding={1}>OR</Typography>

                    </form>
                    <div style={{ display: 'flex', margin: '5px', justifyContent: 'space-between' }}>
                        <p style={{ margin: '0' }}>Dont't have account?</p>
                        <Link to='/signup'>signup</Link>
                    </div>
                </Box>
            </Paper>
        </Grid>
    )
}

export default Login