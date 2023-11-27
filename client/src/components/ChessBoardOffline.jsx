import { Box, Grid } from '@mui/material'
import { Chess } from 'chess.js'
import React, { useEffect, useRef, useState } from 'react'
import { Chessboard } from 'react-chessboard'
import DenseTable from './DenseTable'
import Timer from './Timer'
import GameOverMessage from './GameOverMessage'
import FloatingButton from './FloatingButton'
import { useNavigate } from 'react-router-dom'
import { useUnload } from '../customhooks/onLoad'





function ChessBoardOffline() {
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

  // useUnload((e) => {
  //   e.preventDefault();
  //   e.returnValue = 'hello';
  // });

  if (gameOver?.status) return <GameOverMessage data={gameOver.message} />

  return (
    <>
      {/* <Box position='relative'> */}
      <Grid container
        direction='row'
        columns={12}
        spacing={2}
        justifyContent='center'
        height='88vh'
      >
        <Grid item xs={12} sm={10} md={8} lg={5}>
          <Box display='flex' justifyContent='space-between'>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <Timer expiryTimestamp={Date.now() + (1000 * 60 * 10)} state={true} />
            </Box>
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <Timer expiryTimestamp={Date.now() + (1000 * 60 * 10)} state={true} />
            </Box>
          </Box>
          <Chessboard position={position} onPieceDrop={drop} />
        </Grid>

        <Grid item xs={12} sm={8} md={8} lg={4}>
          <Box display='flex' justifyContent='space-between'>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Timer expiryTimestamp={Date.now() + (1000 * 60 * 10)} state={true} />
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Timer expiryTimestamp={Date.now() + (1000 * 60 * 10)} state={true} />
            </Box>
          </Box>
          <DenseTable data={moves} />
        </Grid>
      </Grid >


      {/* </Box> */}
    </>
  )
}

export default ChessBoardOffline