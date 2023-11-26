// chess-socket

const server = require('socket.io')


const io = server(8902, {
    cors: {
        origin: '*'
    }
})




let usersConnected = []
const addUser = (userConnectionId) => {
    !usersConnected.some((user) => user === userConnectionId) && usersConnected.push(userConnectionId)
}
const removeUser = (userConnectionId) => {
    usersConnected = usersConnected.filter((user) => user !== userConnectionId)
}

let temp = []
let gamesConnected = []
const addGames = (gameObj) => {
    let Obj = temp.find((game) => game.gameId == gameObj.gameId)
    if (!Obj) {
        let a = {
            gameId: gameObj.gameId,
            playerOne: {
                id: gameObj.userId,
                color: gameObj.chessPieceColor,
                socketId: gameObj.id
            }
        }
        temp.push(a)
        return false
    } else {
        let b = {
            ...Obj,
            playerTwo: {
                id: gameObj.userId,
                color: gameObj.chessPieceColor,
                socketId: gameObj.id
            }
        }
        temp = temp.filter((game) => { game.gameId != gameObj.gameId })
        gamesConnected.push(b)
        return { s: [b.playerOne.socketId, b.playerTwo.socketId] }
    }
}

const getPlayerTwo = (obj) => {
    let a = gamesConnected.find((game) => game.gameId == obj.gameId);
    if (a.playerOne.id == obj.userId) {
        return a.playerTwo.socketId
    } else {
        return a.playerOne.socketId
    }
}

const abortGame = (gameId) => {
    gamesConnected = gamesConnected.filter((game) => game.gameId != gameId)
}


io.on("connect", (socket) => {
    console.log('socket connected');
    addUser(socket.id)



    socket.on('playerjoining', (gameObj) => {
        let r = addGames(gameObj)
        if (r) {

            for (i = 0; i < 2; i++) {
                io.to(r.s[i]).emit('playerjoined', gameObj)
            }
        }
    })




    socket.on('setmove', (moveObj) => {
        io.to(getPlayerTwo(moveObj)).emit('getmove', moveObj)
    })


    socket.on('cancelgame', ({ gameId }) => {
        abortGame(gameId)
    })


    socket.on('disconnect', () => {
        console.log('chess socket disconnected')
        removeUser(socket.id)
    })
})
