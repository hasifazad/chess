import React, { useContext, useEffect, useRef, useState } from 'react'
import api from '../Axios'
import { Avatar, Box, Button, Container, Grid, InputAdornment, Stack, TextField, Tooltip, Typography } from '@mui/material';
import axios from 'axios';
import Conversation from './Conversation';
import { UserDetailsContext } from '../context/UserContext';
import Message from './Message';
import io from "socket.io-client"
import SendIcon from '@mui/icons-material/Send';
import "../styles/chat.css"
import Loading from './Loading';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
// import '../../public/chat.gif'

function Chat() {
    const CHAT_URL = import.meta.env.VITE_API_CHAT_URL

    let { user } = useContext(UserDetailsContext)
    const socket = useRef()

    const [conversation, setConversation] = useState([])
    const [text, setText] = useState('')
    const [conversationId, setConversationId] = useState()
    const [conversationName, setConversationName] = useState()
    const [conversationImage, setConversationImage] = useState()
    const [messages, setMessages] = useState(null)
    const [arrMsg, setArrMsg] = useState(null)



    useEffect(() => {
        api.get("/user/get-users").then((response) => {
            console.log(response);
            let list = response.data.usersList.filter((a) => a._id != user.userId)
            setConversation([...list])
        }).catch((err) => {
            console.log(err);
        })
    }, [])


    const handleConv = (convId, convName, convImage) => {
        setConversationId(convId)
        setConversationName(convName)
        setConversationImage(convImage)
        let obj = {
            firstPersonId: user.userId,
            secondPersonId: convId,
        }
        api.get(`/chat/get-chat/${obj.firstPersonId}/${obj.secondPersonId}`).then((response) => {
            if (response.data.chats.length == 0) return setMessages([])
            setMessages([...response.data?.chats[0]?.chat])

        }).catch((err) => {
            console.log(err);
        })

    }

    const handleText = () => {
        if (text.length == 0) return
        let obj = {
            firstPersonId: user.userId,
            secondPersonId: conversationId,
            message: text
        }
        api.post('/chat/set-chat', obj).then((response) => {

            setText('')
        }).catch((err) => {
            console.log(err);
        })

        let msgObj = {
            sender: user.userId,
            reciver: conversationId,
            message: text
        }
        setMessages([...messages, msgObj])
        socket.current.emit('departmessage', msgObj)
    }

    useEffect(() => {
        socket.current = io(`${CHAT_URL}`)

        socket.current.on("connect", () => {
            socket.current.emit('userjoining', {
                userId: user.userId,
                socketId: socket.current.id
            })

        })

        socket.current.on('arrivalmessage', (msgObj) => {

            setArrMsg(msgObj)
        })

        return () => {
            socket.current.disconnect()
        }

    }, [])

    useEffect(() => {
        arrMsg && setMessages([...messages, arrMsg])
    }, [arrMsg])

    let scrollRef = useRef()
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const conversationScrollRef = useRef()
    const onHandleSearch = (e) => {
        conversationScrollRef.current?.scrollTo(0, 0)
        console.log(e.target.value);
        let a = []
        let c = conversation.filter((obj) => {
            if (obj.email.includes(e.target.value)) {
                return obj
            } else {
                a.push(obj)
            }
        })
        setConversation([...c, ...a])
    }
    return (
        <>
            <Container>
                <Grid container direction='row' justifyContent='center' gap={2}>
                    <Grid item xs={12} sm={8} md={5} lg={5} bgcolor='#FFFBF5' height='550px' sx={{ position: 'relative' }} padding={3}>
                        <Box display='flex' gap={2}
                            alignItems='center'
                            justifyContent='start' border={1} padding={1} >
                            <Avatar src={conversationImage}>
                                <PersonIcon />
                            </Avatar>
                            <Typography align='center' >{conversationName ? conversationName : 'select a person from left'}</Typography>
                        </Box>
                        {conversationId ? <>

                            <Box height='90%'>
                                {!messages ? <Loading /> :
                                    <div className='chat-body'>
                                        {

                                            messages.map((msg, i) => <div ref={scrollRef} key={i}> <Message msg={msg} /></div>)
                                        }

                                    </div>
                                }
                            </Box>
                            <Box sx={{ position: 'absolute', bottom: '0' }} width='82%'>
                                <Stack direction='row' justifyContent='center' alignItems='center' >
                                    <TextField variant="outlined" fullWidth value={text} onChange={(e) => { setText(e.target.value) }} />
                                    <Button onClick={handleText} size='large'>
                                        <SendIcon />
                                    </Button>
                                </Stack>
                            </Box>
                        </> : <>
                            <Box height='80%' display='flex' justifyContent='center' alignItems='center'>
                                <Typography textAlign='center' color='#C0C0C0' variant='h3'>Start Conversation</Typography>
                            </Box>


                        </>
                        }

                    </Grid>
                    <Grid item xs={12} sm={8} md={4} lg={4} bgcolor='#EBF3E8' height='550px' >
                        <Box padding={1}>
                            <TextField size="small" fullWidth sx={{}}
                                onChange={onHandleSearch}
                                placeholder='Search'
                                InputProps={{
                                    sx: { borderRadius: '20px' },
                                    endAdornment: (

                                        <InputAdornment position="end">

                                            <SearchIcon />

                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Box>
                        <Box sx={{ overflowY: 'scroll', height: '90%' }} ref={conversationScrollRef}>
                            <Conversation conv={conversation} handleConv={handleConv} />

                        </Box>
                    </Grid>
                </Grid>
            </Container >
        </>
    )
}

export default Chat