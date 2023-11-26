import React, { useContext, useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { Chess } from "chess.js"
import { Chessboard } from "react-chessboard"
import GameLoading from './GameLoading'
import { UserDetailsContext } from '../context/UserContext'
import { useParams } from 'react-router-dom'
import api from '../Axios';
import { Box, Grid, Typography } from '@mui/material'
import GameOverMessage from './GameOverMessage'
import { useUnload } from '../customhooks/onLoad'
import Timer from './Timer'
import DenseTable from './DenseTable'


function ChessBoard() {

    useUnload((e) => {
        e.preventDefault();
        e.returnValue = 'hello';
    });

    const CHESS_URL = import.meta.env.VITE_API_CHESS_URL

    let { user } = useContext(UserDetailsContext)
    let { gameId } = useParams()


    let socket = useRef()
    let game = useRef(new Chess())

    const [position, setPosition] = useState('start')
    const [fen, setFen] = useState([]);
    const [allMoves, setAllMoves] = useState([]);
    const [color, setColor] = useState({});
    const [duration, setDuration] = useState('');

    const [gameLoading, setGameLoading] = useState(true);
    const [nextMove, setNextMove] = useState(false);
    const [turn, setTurn] = useState('w')
    const [gameOver, setGameOver] = useState(false)
    const [gameOverData, setGameOverData] = useState()
    const [time, setTime] = useState()
    const [start, setStart] = useState(false)
    const [invalid, setInvalid] = useState(false)


    function drop(sourceSquare, targetSquare) {
        if (nextMove) {
            const move = {
                from: sourceSquare,
                to: targetSquare,
            }
            const gameCopy = game.current;
            let mov = gameCopy.move(move)
            if (game.current.isGameOver()) {
                setGameOver(true)
                if (mov?.color == 'w') {
                    console.log('whitewins');
                    setGameOverData('white win')
                } else {
                    setGameOverData('black win')
                    console.log('blackwins');
                }
            }
            setPosition(gameCopy.fen())
            setFen([...fen, gameCopy.fen()])
            setAllMoves([...allMoves, move])
            setTurn(gameCopy.turn())

            let moveObj = {
                userId: user.userId,
                gameId,
                move,
                fen: gameCopy.fen(),
                turn: gameCopy.turn(),
            }


            socket.current.emit('setmove', moveObj)

            api.put('/game/set-moves', moveObj).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            })

            setNextMove(false)
        }
    }



    useEffect(() => {
        let data = {
            gameId,
            userId: user.userId
        }
        let clr;
        api.put('/game/join-game', data).then((response) => {
            clr = response.data.gameData.first_player.chess_piece_color

            if (clr == 'w' && response.data.gameData.created_by == user.userId) {
                setColor({ y: 'white', o: 'black' })
                setNextMove(true)
            } else if (clr == 'b' && response.data.gameData.created_by != user.userId) {
                setColor({ y: 'black', o: 'white' })
                setNextMove(true)
            }


            setDuration(response.data.gameData.time_duration)


            socket.current = io(`${CHESS_URL}`)

            socket.current.on("connect", () => {
                socket.current.emit('playerjoining', {
                    gameId: gameId,
                    userId: user.userId,
                    chessPieceColor: clr,
                    id: socket.current.id
                })

            })

            socket.current.on('playerjoined', (res) => {
                if (res.chessPieceColor == 'w' && res.userId != user.userId) {
                    setColor({ y: 'black', o: 'white' })
                } else {
                    setColor({ y: 'white', o: 'black' })
                }
                setGameLoading(false)
                setStart(true)
            })

            socket.current.on('getmove', (move) => {
                let gameCopyTwo = game.current;
                let mov = gameCopyTwo.move(move.move)
                if (game.current.isGameOver()) {
                    setGameOver(true)
                    if (mov?.color == 'w') {
                        console.log('whitewins');
                        setGameOverData('white win')
                    } else {
                        setGameOverData('black win')
                        console.log('blackwins');
                    }
                }
                setPosition(gameCopyTwo.fen())
                setFen([...fen, gameCopyTwo.fen()])
                setAllMoves([...allMoves, move.move])
                setTurn(gameCopyTwo.turn())
                setNextMove(true)
            })

        }).catch((err) => {
            console.log(err);
            setInvalid(true)
        })

        return () => {
            if (invalid) {
                socket.current.emit('cancelgame', { gameId });
                socket.current.disconnect()

            }
        }

    }, [])


    if (invalid) return <GameOverMessage data='Invalid code' />

    if (gameLoading) return <GameLoading />;

    if (gameOver) return <GameOverMessage data={gameOverData} />;

    return (
        <>
            <Grid container
                direction='row'
                columns={12}
                justifyContent='center'
                alignItems='center'
                height='88vh'>
                <Grid item xs={12} sm={10} md={8} lg={5}>
                    <Box display='flex' justifyContent='space-between'>
                        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                            <Typography>you : {color?.y}</Typography>
                            <Timer expiryTimestamp={start ? Date.now() + (1000 * 60 * Number(duration)) : null} state={nextMove} />
                        </Box>
                        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                            <Typography>opponent : {color?.o}</Typography>
                            <Timer expiryTimestamp={start ? Date.now() + (1000 * 60 * Number(duration)) : null} state={!nextMove} />
                        </Box>
                    </Box>
                    <Chessboard position={position} onPieceDrop={drop} />
                </Grid>

                <Grid item xs={12} sm={8} md={8} lg={4}>
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Timer expiryTimestamp={!gameLoading ? time : 0} state={nextMove} />
                    </Box>
                    {/* <DenseTable data={allMoves} /> */}
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Timer expiryTimestamp={!gameLoading ? time : 0} state={!nextMove} />
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default ChessBoard