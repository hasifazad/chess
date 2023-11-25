const express = require("express");
const router = express.Router()
const upload = require("../middlewares/multer")


const { signupUser, loginUser, getAllUsers, getUser, updateUser, updateImage } = require("../controllers/userController");
const validateToken = require("../middlewares/validateToken");



router.post("/signup", signupUser)

router.post("/login", loginUser)

router.get("/get-users", getAllUsers)

router.get("/get-user/:userId", getUser)

router.post("/update-user/:userId", updateUser)

router.post("/update-user-image/:userId", upload, updateImage)


router.get('/validate', validateToken, getUser)

//     (req, res) => {
//     res.status(200).json({ message: 'validated successful', user: req.user })
// }


module.exports = router;