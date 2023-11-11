const User = require("../models/UserModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { async } = require("q");




module.exports = {
    //@descrp -- to register a user
    //@route -- POST /api/users
    //@access -- public
    registerUser: async (req, res, next) => {

        const { username, email, password } = req.body;
        try {
            if (!username || !email || !password) {
                res.status(400)
                throw new Error("all fields are mandotory")
            }

            const userExist = await User.findOne({ email })
            if (userExist) {
                // console.log(userExist)
                res.status(400);
                throw new Error("User already exist")
            }

            const hashPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                username,
                email,
                password: hashPassword
            })

            if (user) {
                res.json({ message: "Register the user successfully", _id: user._id, email: user.email })
            } else {
                res.status(400)
                throw new Error(user)
            }
        } catch (err) {
            if (err.name == 'ValidationError') res.status(400)
            next(err)
        }

    },

    //@descrp -- to login a user
    //@route -- POST /api/users
    //@access -- public
    loginUser: async (req, res, next) => {
        const { email, password } = req.body;
        try {
            if (!email || !password) {
                res.status(400);
                throw new Error("all fields are mandatory")

            }
            const userExist = await User.findOne({ email });

            if (userExist && await bcrypt.compare(password, userExist.password)) {
                const accessToken = jwt.sign(
                    {
                        user: {
                            username: userExist.username,
                            email: userExist.email,
                            userId: userExist._id
                        }
                    },
                    process.env.ACCESS_TOKEN_SECERT,
                    {
                        expiresIn: '100m'
                    }
                )
                const user = {
                    username: userExist.username,
                    userId: userExist._id,
                    accessToken
                }

                res.status(200).json({ message: "Login the user hello", user })
            } else {
                res.status(401);
                throw new Error("sdsadsad");
            };
        } catch (err) {
            if (err.name == 'ValidationError') res.status(400)
            next(err)
        }
    },

    getUsers: async (req, res, next) => {
        try {
            let usersList = await User.find({}, { _id: 1, username: 1, email: 1 })
            res.status(200).json({ message: "request successful", usersList })
        } catch (err) {
            next(err);
        }
    }
}