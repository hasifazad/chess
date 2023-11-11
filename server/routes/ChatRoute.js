const router = require('express').Router()


const { setChat, getChat } = require('../controllers/ChatController')


router.post('/set-chat', setChat)

router.get('/get-chat/:firtPersonId/:secondPersonId', getChat)






module.exports = router;