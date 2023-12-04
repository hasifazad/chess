import { Avatar, Box, Button, Container, Grid, InputLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import api from "../Axios"
import { useParams } from 'react-router-dom'
import SnackBar from './SnackBar'

function ProfileSettings() {

    const { userId } = useParams()

    const [user, setUser] = useState({})
    const [pic, setPic] = useState()
    const [image, setImage] = useState()
    let [profileUpdated, setProfileUpdated] = useState(false)
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        country: '',
        city: '',
        mobile: ''
    })

    useState(() => {
        api.get(`/user/get-user/${userId}`).then((response) => {
            console.log('hello');
            console.log(response.data);
            setFormData({ ...response.data.user })
            setPic(response.data.user.image)
        }).catch((err) => {
            console.log(err);
        })
    }, [profileUpdated])


    const onHandleChangeText = (e) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value
        })
    }
    const onHandleSubmitText = () => {
        let fData = new FormData();

        const entries = Object.entries(formData);
        for (const [key, val] of entries) {
            fData.append(key, val);
        }

        api.post(`/user/update-user/${userId}`, fData,
            { headers: { 'Content-Type': 'application/json' } }
        ).then((response) => {
            setProfileUpdated(true)
            setTimeout(() => {
                setProfileUpdated(false)
            }, 2500)
        }).catch((err) => {
            console.log(err);
        })
    }

    const onHandleChangeImage = (e) => {
        let result = new FileReader()
        result.onload = (e) => {
            setPic(e.target.result)
        }
        result.readAsDataURL(e.target.files[0])
        setImage(e.target.files[0])

    }

    // let BASE_URL = import.meta.env.VITE_API_BASE_URL

    const onHandleSubmitImage = () => {
        console.log(image);
        let file = new FormData()
        file.append('image', image)

        api.post(`/user/update-user-image/${userId}`, file,
            // { headers: { 'Content-Type': 'multipart/form-data' } }
        ).then((response) => {
            console.log(response);
            setProfileUpdated(true)
            setTimeout(() => {
                setProfileUpdated(false)
            }, 2500)
        }).catch((err) => {
            console.log(err);
        })
    }


    return (
        <>
            {profileUpdated ? <SnackBar open={profileUpdated} /> : null}
            <Container >
                <Box display='flex' justifyContent='center'>
                    <Grid container md={8} border={1} borderColor='GrayText' borderRadius={4} marginTop={5}>
                        <Grid item md={12} display='flex' justifyContent='' paddingX={10} paddingY={3}>
                            <Grid container display='flex' justifyContent='center' alignItems='center'>
                                <Grid item xs={12} md={4} display='flex' justifyContent='center'>
                                    {/* <Avatar sx={{ height: '150px', width: '150px' }}></Avatar> */}

                                    <Avatar src={pic ? pic : null} sx={{ height: '150px', width: '150px' }} />
                                </Grid>
                                <Grid item xs={12} md={6} gap={1} display='flex' flexDirection='column' justifyContent='space-evenly' alignItems='top'>
                                    <Typography variant='h4'>{formData?.username}</Typography>
                                    <InputLabel sx={{ position: 'relative', width: '150px' }}>
                                        <Button variant='outlined' fullWidth sx={{ position: 'absolute' }}  >upload</Button>
                                        <TextField size='small' type="file" name='image' sx={{ width: '150px', opacity: 0 }} onChange={onHandleChangeImage} />
                                    </InputLabel>
                                    <Button variant='outlined' sx={{ width: '150px' }} onClick={onHandleSubmitImage}>submit</Button>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item gap={2} xs={12} md={6} display='flex' flexDirection='column' alignItems='center' justifyContent='center' >
                            <Box>
                                <InputLabel>First name</InputLabel>
                                <TextField value={formData?.firstname} fullWidth size='small' name='firstname' onChange={onHandleChangeText} />
                            </Box>
                            <Box>
                                <InputLabel>Last name</InputLabel>
                                <TextField value={formData?.lastname} fullWidth size='small' name='lastname' onChange={onHandleChangeText} />
                            </Box>
                            <Box>
                                <InputLabel>Email</InputLabel>
                                <TextField value={formData?.email} fullWidth disabled size='small' name='email' />
                            </Box>

                        </Grid>
                        <Grid item gap={2} xs={12} md={6} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                            <Box>
                                <InputLabel>Country</InputLabel>
                                <TextField value={formData?.country} fullWidth size='small' name='country' onChange={onHandleChangeText} />
                            </Box>
                            <Box>
                                <InputLabel>City</InputLabel>
                                <TextField value={formData?.city} fullWidth size='small' name='city' onChange={onHandleChangeText} />
                            </Box>
                            <Box>
                                <InputLabel>Mobile</InputLabel>
                                <TextField value={formData?.mobile} fullWidth size='small' name='mobile' onChange={onHandleChangeText} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} display='flex' flexDirection='column' alignItems='center' justifyContent='center' padding={3}>
                            <Button variant='outlined' onClick={onHandleSubmitText}>save settings</Button>
                        </Grid>
                    </Grid>

                </Box>
            </Container>
        </>
    )
}

export default ProfileSettings