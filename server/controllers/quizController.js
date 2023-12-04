
const Quiz = require("../models/QuizModel")



module.exports = {
    setQuestions: async (req, res, next) => {
        console.log(req.body);
        const { question, answer, subject } = req.body
        try {
            await Quiz.create({
                question,
                options: [req.body.option_1, req.body.option_2, req.body.option_3, req.body.option_4],
                answer,
                subject
            })

        } catch (error) {
            res.status(401)
            next(error)
        }

    },

    getQuestions: async (req, res, next) => {
        try {
            let questions = await Quiz.find()
            res.status(200).json({ message: 'request successful', questions })

        } catch (error) {
            res.status(401)
            next(error)
        }
    },

    getSubWiseQuestions: async (req, res, next) => {
        const { subject, noOfQuestions } = req.params
        try {
            let questions = await Quiz.aggregate([
                { $match: { subject: subject } }, // Replace your_field and your_value with the actual field and value you want to match
                { $sample: { size: Number(noOfQuestions) } }
            ])
            if (questions.length == 0) throw new Error("data not found")
            console.log(questions);
            res.status(200).json({ message: 'request successful', questions })

        } catch (error) {
            res.status(401)
            next(error)
        }
    }
}