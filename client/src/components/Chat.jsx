import React, { useContext, useEffect, useRef, useState } from 'react'
import api from '../Axios'
import { Box, Button, Container, Grid, Stack, TextField } from '@mui/material';
import axios from 'axios';
import Conversation from './Conversation';
import { UserDetailsContext } from '../context/UserContext';
import Message from './Message';
import io from "socket.io-client"
import SendIcon from '@mui/icons-material/Send';
import "../styles/chat.css"

function Chat() {
    const CHAT_URL = import.meta.env.VITE_API_CHAT_URL
    
    let { user } = useContext(UserDetailsContext)
    const socket = useRef()

    const [conversation, setConversation] = useState([])
    const [text, setText] = useState('')
    const [conversationId, setConversationId] = useState()
    const [messages, setMessages] = useState([])
    const [arrMsg, setArrMsg] = useState(null)


    useEffect(() => {
        api.get("/user/get-all-users").then((response) => {
            let list = response.data.usersList.filter((a) => a._id != user.userId)
            setConversation([...list])
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    const handleConv = (convId) => {
        setConversationId(convId)
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

    }, [])

    useEffect(() => {
        arrMsg && setMessages([...messages, arrMsg])
    }, [arrMsg])

    let scrollRef = useRef()
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <>
            <Container>
                <Grid container direction='row' justifyContent='center' gap={2}>
                    <Grid item xs={12} sm={8} md={5} lg={5} bgcolor='#FFFBF5' height='500px' sx={{ position: 'relative' }} padding={3}>
                        {conversationId ? <>
                            <Box height='100%'>
                                <div className='chat-body'>

                                    {

                                        messages.map((msg, i) => <div ref={scrollRef} key={i}> <Message msg={msg} /></div>)
                                    }

                                </div>
                            </Box>
                            <Box sx={{ position: 'absolute', bottom: '0' }} width='82%'>
                                <Stack direction='row' justifyContent='center' alignItems='center' >
                                    <TextField variant="outlined" fullWidth value={text} onChange={(e) => { setText(e.target.value) }} />
                                    <Button onClick={handleText} size='large'>
                                        <SendIcon />
                                    </Button>
                                </Stack>
                            </Box>
                        </> : null}
                    </Grid>
                    <Grid item xs={12} sm={8} md={4} lg={4} bgcolor='#EBF3E8'>
                        <Conversation conv={conversation} handleConv={handleConv} />
                    </Grid>
                </Grid>
            </Container >
        </>
    )
}

export default Chat