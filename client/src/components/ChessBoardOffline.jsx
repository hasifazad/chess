import { Grid } from '@mui/material'
import { Chess } from 'chess.js'
import React, { useRef, useState } from 'react'
import { Chessboard } from 'react-chessboard'
import DenseTable from './DenseTable'
import Timer from './Timer'

function ChessBoardOffline() {

  let game = useRef(new Chess())

  const [position, setPosition] = useState('start')
  const [moves, setMoves] = useState([])
  const [turn, setTurn] = useState('w')

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
      } else {
        console.log('blackwins');
      }
    }


    console.log('game', game.current.isGameOver());
    setPosition(game.current.fen())
    setMoves([...moves, mov])
    setTurn(game.current.turn())

  }
  // console.log(game.current.fen());
  const time = new Date();
  time.setSeconds(time.getSeconds() + 10); // 10 minutes timer
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
          <Chessboard position={position} onPieceDrop={drop} />
        </Grid>
        <Grid item xs={12} sm={8} md={8} lg={4}>
          <Timer expiryTimestamp={time} color={moves[moves.length - 1]?.color} />
          <DenseTable data={moves} />
          <Timer expiryTimestamp={time} color={moves[moves.length - 1]?.color == 'w' ? 'b' : 'w'} />
        </Grid>
      </Grid>

    </>
  )
}

export default ChessBoardOffline