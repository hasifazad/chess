const router = require('express').Router()

const { createGame, createGameLink, setMoves } = require('../controllers/gameController');
const validateToken = require('../middlewares/validateToken');

router.post('/create-game', validateToken, createGame)
router.post('/create-game-link', validateToken, createGameLink)
router.put('/set-moves', setMoves)

module.exports = router;