const router = require('express').Router()

const { createGame, joinGame, setMoves } = require('../controllers/gameController');
const validateToken = require('../middlewares/validateToken');

router.post('/create-game', validateToken, createGame)
router.post('/join-game', validateToken, joinGame)
router.put('/set-moves', setMoves)

module.exports = router;