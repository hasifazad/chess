import React, { useContext, useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { Chess } from "chess.js"
import { Chessboard } from "react-chessboard"
import GameLoading from './GameLoading'
import { UserDetailsContext } from '../context/UserContext'
import { useParams } from 'react-router-dom'
import api from '../Axios';
import { Grid } from '@mui/material'
import GameOverMessage from './GameOverMessage'
import { useUnload } from '../customhooks/onLoad'
import Timer from './Timer'


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
    const [gameLoading, setGameLoading] = useState(true);
    const [nextMove, setNextMove] = useState(false);
    const [turn, setTurn] = useState('w')
    const [gameOver, setGameOver] = useState(false)
    const [gameOverData, setGameOverData] = useState()
    const [time, setTime] = useState()

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
                gameId: gameId.split('-')[0],
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
        socket.current = io(`${CHESS_URL}`)


        socket.current.on("connect", () => {
            socket.current.emit('playerjoining', {
                gameId: gameId.split('-')[0],
                userId: user.userId,
                chessPieceColor: gameId.split('-')[1],
                id: socket.current.id
            })

        })

        socket.current.on('playerjoined', (h) => {
            setGameLoading(false)

            let time = new Date();
            let a = gameId.split('-')[2]
            let t = time.setSeconds(time.getSeconds() + (Number(a) * 600)); // 10 minutes timer
            setTime(t)
            console.log(t);
        })

        socket.current.on('getmove', (move) => {
            console.log(move);
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

        if (gameId.split('-')[1] == turn) {
            setNextMove(true)
        } else {
            setNextMove(false)
        }



        return () => {
            console.log('enddddddddddd');
            // alert('You lost the game')
            socket.current.emit('cancelgame', { gameId: gameId.split('-')[0] });
            socket.current.disconnect()
        }

    }, [])

    // useEffect(() => {

    // }, [gameOver])

    // useEffect(() => {
    // if (gameId.split('-')[1] == turn) {
    //     setNextMove(true)
    // } else {
    //     setNextMove(false)
    // }
    // }, [])
    // console.log(nextMove);


    if (gameLoading) return <GameLoading />;

    if (gameOver) return <GameOverMessage data={gameOverData} />;

    return (
        <>
            <Grid container direction='row' columns={12} justifyContent='center' alignItems='center' height='88vh'>
                <Grid item xs={12} sm={10} md={8} lg={5}>
                    <Timer expiryTimestamp={time} />
                    <Chessboard position={position} onPieceDrop={drop} />
                </Grid>
            </Grid>
        </>
    )
}

export default ChessBoard