const express = require("express");
const router = express.Router()
const upload = require("../middlewares/multer")

const { setQuestions, getQuestions, getSubWiseQuestions } = require("../controllers/quizController")


router.post('/set-questions', setQuestions)

router.get('/get-questions', getQuestions)

router.get('/get-questions/:subject/:noOfQuestions', getSubWiseQuestions)






module.exports = router;