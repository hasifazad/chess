// chat-socket

const server = require('socket.io')


const io = server(8901, {
    cors: {
        origin: '*'
    }
})

let allUsers = []
const addUser = (userObj) => {
    !allUsers.some((user) => user.userId == userObj.userId) && allUsers.push(userObj)
}
const removeUser = (socketId) => {
    allUsers = allUsers.filter((user) => user.socketId != socketId)
}

const findReciever = (recieverId) => {
    let rec = allUsers.find((user) => user.userId == recieverId)
    if (rec) {
        return rec.socketId
    }
}


io.on("connect", (socket) => {
    console.log('socket connected');

    socket.on('userjoining', (userObj) => {
        addUser(userObj)
        // console.log(allUsers);
    })

    socket.on('departmessage', (msgObj) => {
        // console.log(msgObj);
        let recieverId = findReciever(msgObj.reciver)
        console.log(recieverId);
        io.to(recieverId).emit('arrivalmessage', msgObj)
    })


    socket.on('disconnect', () => {
        console.log('socket disconnected');
        removeUser(socket.id)
        // console.log(allUsers);
    })
})