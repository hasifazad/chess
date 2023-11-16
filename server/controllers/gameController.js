const Game = require("../models/GameModel");


module.exports = {
    //@descrp -- to create a new game
    //@route -- POST /api/game
    //@access -- private
    createGame: async (req, res, next) => {
        let chessPieceColorTwo
        if (req.body.chessPieceColor == 'w') {
            chessPieceColorTwo = 'b'
        } else {
            chessPieceColorTwo = 'w'
        }

        try {
            let gameId = await Game.create({
                first_player: {
                    id: req.body.userId,
                    chess_piece_color: req.body.chessPieceColor
                },
                second_player: {
                    id: null,
                    chess_piece_color: chessPieceColorTwo
                },
                time_duration: req.body.timeDuration,
                game_played: false

            })
            gameId.save()
            res.status(200).json({ message: 'Game create successfully', gameId: gameId._id })
        } catch (err) {
            next(err)
        }
    },


    //@descrp -- to add second player
    //@route -- PUT /api/game
    //@access -- private
    createGameLink: async (req, res, next) => {

        try {
            let response = await Game.findOne({ _id: req.body.gameCode, game_played: false });
            if (response == null) { throw new Error('invalid link') }

            Game.updateOne({ _id: req.body.gameCode }, { $set: { 'second_player.id': req.body.userId, game_played: true } }).then((response) => {

                res.json({ message: 'Successfully added second player', status: true })
            }).catch((err) => {
                next(new Error('sadfas'))
            })
        } catch (error) {
            next(error)
        }
    },

    //@descrp -- to add the moves to array
    //@route -- PUT /api/game
    //@access -- private
    setMoves: async (req, res) => {

        await Game.updateOne({ _id: req.body.gameId }, {
            $push: {
                moves: req.body.move,
                fen: req.body.fen
            }
        })


        res.status(200).json('success')
    },
}