const Chat = require("../models/ChatModel");


module.exports = {
    setChat: async (req, res, next) => {

        try {
            let chatExist = await Chat.find({ person: { $all: [req.body.firstPersonId, req.body.secondPersonId] } })
            if (chatExist.length == 0) {
                let chat = await Chat.create({
                    person: [req.body.firstPersonId, req.body.secondPersonId],
                    chat: [{
                        sender: req.body.firstPersonId,
                        reciver: req.body.secondPersonId,
                        message: req.body.message
                    }]

                })
                chat.save()

            } else {
                await Chat.updateOne({ person: { $all: [req.body.firstPersonId, req.body.secondPersonId] } }, {
                    $push: {
                        chat: {
                            sender: req.body.firstPersonId,
                            reciver: req.body.secondPersonId,
                            message: req.body.message
                        }

                    }
                })
            }
            res.status(200).json({ message: 'text sended successfully' })

        } catch (error) {
            next(error)
        }
    },

    getChat: async (req, res, next) => {
        try {
            let chats = await Chat.find({ person: { $all: [req.params.firtPersonId, req.params.secondPersonId] } })
            console.log(chats);
            // if (chats.length !== 0) {
            res.status(200).json({ message: 'request successful', chats })
            // }
            // else {
            //     throw new Error('chats not found')
            // }
        } catch (error) {
            res.status(401)
            next(error)
        }
    }
}