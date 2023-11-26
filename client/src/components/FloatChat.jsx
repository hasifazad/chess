// import zIndex from '@mui/material/styles/zIndex'
import { Box, Button, Fab, Paper, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, { useContext, useEffect, useRef, useState } from 'react'
import Message from './Message';
import { UserDetailsContext } from '../context/UserContext';
import api from '../Axios';
import io from "socket.io-client"
import { useParams } from 'react-router-dom';

function FloatChat() {

    const CHAT_URL = import.meta.env.VITE_API_CHAT_URL

    let { user } = useContext(UserDetailsContext)
    let { gameId } = useParams()
    const style = {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 90,
        left: 'auto',
        position: 'fixed',
        zIndex: '99',
        backgroundColor: '#FDF7E4',
        // border: '1px solid',
        borderRadius: '15px',
        paddingTop: '20px'
    };

    const [messages, setMessages] = useState([])
    const [text, setText] = useState([])
    const [arrMsg, setArrMsg] = useState([])
    const [secondPlayer, setSecondPlayer] = useState('')
    const scrollRef = useRef()
    const socket = useRef()

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    useEffect(() => {
        api.get(`/game/get-game/${gameId}`).then((response) => {
            console.log(response);
            let secondPlayer;
            if (response.data.response.first_player.id == user.userId) {
                setSecondPlayer(response.data.response.second_player.id)
                secondPlayer = response.data.response.second_player.id
            } else {
                setSecondPlayer(response.data.response.first_player.id)
                secondPlayer = response.data.response.first_player.id

            }


            let obj = {
                firstPersonId: user.userId,
                secondPersonId: secondPlayer,
            }
            api.get(`/chat/get-chat/${obj.firstPersonId}/${obj.secondPersonId}`).then((response) => {
                if (response.data.chats.length == 0) return setMessages([])
                setMessages([...response.data?.chats[0]?.chat])
                console.log(response.data.chats.length);
            }).catch((error) => {
                console.log(error);
            })
            socket.current = io(`${CHAT_URL}`)

            socket.current.on("connect", () => {
                socket.current.emit('userjoining', {
                    userId: user.userId,
                    socketId: socket.current.id
                })
            })

            socket.current.on('arrivalmessage', (msgObj) => {
                console.log(msgObj);
                setArrMsg(msgObj)
            })
        }).catch((err) => {

            console.log(err);
        })

        return () => {
            socket.current.disconnect()
        }
    }, [])

    useEffect(() => {
        arrMsg && setMessages([...messages, arrMsg])
    }, [arrMsg])

    const onhandleSendText = () => {
        // console.log(secondPlayer);
        if (text.length == 0) return
        let obj = {
            firstPersonId: user.userId,
            secondPersonId: secondPlayer,
            message: text
        }
        api.post('/chat/set-chat', obj).then((response) => {

            setText('')
        }).catch((err) => {
            console.log(err);
        })

        let msgObj = {
            sender: user.userId,
            reciver: secondPlayer,
            message: text
        }
        console.log(msgObj);
        setMessages([...messages, msgObj])
        socket.current.emit('departmessage', msgObj)
    }


    return (
        <>

            <Box style={style} height={380} width={300}>
                <Box className='chat-body' sx={{ overflowY: 'scroll', height: '85%' }}>

                    {

                        messages.map((msg, i) => <div ref={scrollRef} key={i}> <Message msg={msg} /></div>)
                    }
                </Box>
                <Box sx={{ position: 'absolute', bottom: '0px' }} display='flex' alignItems='center' justifyContent='center' height='50px' width='100%'>
                    <TextField size='small' placeholder='Type message...' value={text} onChange={(e) => { setText(e.target.value) }} />
                    <Button onClick={onhandleSendText}>
                        <SendIcon />
                    </Button>
                </Box>

            </Box>

        </>

    )
}

export default FloatChat