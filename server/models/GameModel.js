const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema(
    {
        first_player: {
            id: { type: mongoose.SchemaTypes.ObjectId },
            chess_piece_color: { type: String }
        },
        second_player: {
            id: { type: mongoose.SchemaTypes.ObjectId },
            chess_piece_color: { type: String }
        },
        moves: {
            type: []
        },
        fen: {
            type: []
        },
        time_duration: {
            type: Number
        },
        game_played: {
            type: Boolean
        }
    },
    { timestamps: true }
)



module.exports = mongoose.model('Game', gameSchema)