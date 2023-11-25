import { Box, Grid } from '@mui/material'
import { Chess } from 'chess.js'
import React, { useEffect, useRef, useState } from 'react'
import { Chessboard } from 'react-chessboard'
import DenseTable from './DenseTable'
import Timer from './Timer'
import GameOverMessage from './GameOverMessage'
import { useNavigate } from 'react-router-dom'
import { useUnload } from '../customhooks/onLoad'





function ChessBoardOffline() {
  console.log('fgdfgd');
  let navigate = useNavigate()

  let game = useRef(new Chess())

  const [position, setPosition] = useState('start')
  const [moves, setMoves] = useState([])
  const [turn, setTurn] = useState('w')
  const [gameOver, setGameOver] = useState({ status: false, message: '' })


  const drop = (sourceSquare, targetSquare) => {
    const move = {
      from: sourceSquare,
      to: targetSquare,
    }
    let mov = game.current.move(move)
    // console.log(game.current.fen());
    // const gameCopy = game.current;
    if (game.current.isGameOver()) {
      if (mov?.color == 'w') {
        console.log('whitewins');
        setGameOver({
          status: true,
          message: 'white win the game'
        })
      } else {
        console.log('blackwins');
        setGameOver({
          status: true,
          message: 'black win the game'
        })
      }
    }


    console.log('game', game.current.isGameOver());
    setPosition(game.current.fen())
    setMoves([...moves, mov])
    setTurn(game.current.turn())

  }

  useUnload((e) => {
    e.preventDefault();
    e.returnValue = 'hello';
  });




  // console.log(game.current.fen());
  const time = new Date();
  let a = time.setSeconds(time.getSeconds() + 100); // 10 minutes timer
  console.log(a)

  if (gameOver?.status) return <GameOverMessage data={gameOver.message} />

  return (
    <>
      <Grid container
        direction='row'
        columns={12}
        spacing={2}
        justifyContent='center'
        height='88vh'
        marginTop={0.5}
      >
        <Grid item xs={12} sm={10} md={8} lg={5}>
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <Timer expiryTimestamp={a} color={moves[moves.length - 1]?.color} />
          </Box>
          <Chessboard position={position} onPieceDrop={drop} />
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <Timer expiryTimestamp={time} color={moves[moves.length - 1]?.color == 'w' ? 'b' : 'w'} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={8} lg={4}>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Timer expiryTimestamp={time} color={moves[moves.length - 1]?.color} />
          </Box>
          <DenseTable data={moves} />
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Timer expiryTimestamp={time} color={moves[moves.length - 1]?.color == 'w' ? 'b' : 'w'} />
          </Box>
        </Grid>
      </Grid>

    </>
  )
}

export default ChessBoardOffline