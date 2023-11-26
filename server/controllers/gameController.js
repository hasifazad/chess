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
                created_by: req.body.userId,
                first_player: {
                    id: null,
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
    joinGame: async (req, res, next) => {
        console.log(req.body);

        try {
            let response = await Game.findOne({ _id: req.body.gameId, game_played: false });
            if (response == null) throw new Error('invalid link');

            if (response.created_by == req.body.userId) {

                await Game.updateOne({ _id: req.body.gameId }, { $set: { 'first_player.id': req.body.userId } })


            } else {

                await Game.updateOne({ _id: req.body.gameId }, { $set: { 'second_player.id': req.body.userId } })


            }
            let data = await Game.findOne({ _id: req.body.gameId })
            if (data.first_player.id != null && data.second_player.id != null) {
                let gameData = await Game.findOneAndUpdate({ _id: req.body.gameId }, {
                    $set: {
                        game_played: true
                    }
                }, { returnDocument: 'after' })
                console.log(gameData);
                res.json({ message: 'Successfully added two players', status: true, gameData })
            } else {
                res.json({ message: 'Successfully added one player', status: false, gameData: data })
            }


            // if (response.first_player.id == req.body.userId) {
            //     return res.json({ message: 'Successfully added second player', status: true })
            // }

            // Game.updateOne({ _id: req.body.gameCode }, { $set: { 'second_player.id': req.body.userId, game_played: true } }).then((response) => {

            //     res.json({ message: 'Successfully added second player', status: true })
            // }).catch((err) => {
            //     next(new Error('sadfas'))
            // })
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

    getGame: async (req, res, next) => {
        console.log(req.params);
        try {
            let response = await Game.findOne({ _id: req.params.gameId })
            res.status(200).json({ message: 'request successful', response })
        } catch (error) {
            next(error)
        }
    }
}