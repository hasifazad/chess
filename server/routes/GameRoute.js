const router = require('express').Router()

const { createGame, joinGame, setMoves, getGame } = require('../controllers/gameController');
const validateToken = require('../middlewares/validateToken');

router.post('/create-game', validateToken, createGame)

router.put('/join-game', validateToken, joinGame)

router.put('/set-moves', setMoves)

router.get('/get-game/:gameId', getGame)

module.exports = router;