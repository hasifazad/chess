const express = require("express");
const router = express.Router()


const { registerUser, loginUser, getUsers } = require("../controllers/userController");
const validateToken = require("../middlewares/validateToken");

router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/get-all-users", getUsers)

router.get('/validate', validateToken, (req, res) => {
    res.status(200).json({ message: 'validated successful', user: req.user })
})


module.exports = router;