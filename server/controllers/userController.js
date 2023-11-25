const User = require("../models/UserModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
var admin = require("firebase-admin");
const emailValidator = require("deep-email-validator")
const Verifier = require("email-verifier");

var serviceAccount = require("../firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://fir-d093e.appspot.com"
});

module.exports = {
    //@descrp -- to register a user
    //@route -- POST /api/user/signup
    //@access -- public
    signupUser: async (req, res, next) => {

        const { username, email, password } = req.body;
        try {
            if (!username || !email || !password) {
                res.status(400)
                throw new Error("All fields are mandotory")
            }
            // let emailValidated = await emailValidator.validate(email)
            // console.log(emailValidated);



            // let verifier = new Verifier("at_rY6II9akNymZf3gYu4aoeWLJVlgz0");
            // verifier.verify(email, (err, data) => {
            //     if (err) throw err;
            //     console.log(data);
            // })
            // return res.status(200)

            const userExist = await User.findOne({ email })
            if (userExist) {
                // console.log(userExist)
                res.status(400);
                throw new Error("Email already exist")
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
    //@route -- POST /api/user/login
    //@access -- public
    loginUser: async (req, res, next) => {
        const { email, password } = req.body;
        try {
            if (!email || !password) {
                res.status(400);
                throw new Error("All fields are mandatory")

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
                throw new Error("Wrong password or email");
            };
        } catch (err) {
            if (err.name == 'ValidationError') res.status(400)
            next(err)
        }
    },


    //@descrp -- to get all users
    //@route -- GET /api/user/get-users
    //@access -- public
    getAllUsers: async (req, res, next) => {
        try {
            let usersList = await User.find({}, { _id: 1, username: 1, email: 1, image: 1 })
            res.status(200).json({ message: "request successful", usersList })
        } catch (err) {
            next(err);
        }
    },

    //@descrp -- to get specific user with user id
    //@route -- GET /api/user/get-user/:userId
    //@access -- public
    getUser: async (req, res, next) => {
        try {
            let user = await User.findOne({ _id: req.params.userId }, { password: 0 })
            res.status(200).json({ message: "request successful", user })
        } catch (error) {
            next(error)
        }
    },

    //@descrp -- to update specific user with user id
    //@route -- POST /api/user/update-user/:userId
    //@access -- public
    updateUser: async (req, res, next) => {
        try {
            let user = await User.updateOne({ _id: req.params.userId },
                {
                    $set: {
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        country: req.body.country,
                        city: req.body.city,
                        mobile: req.body.mobile,
                    }
                })
            res.status(200).json({ message: "user profile updated successfully" })

        } catch (error) {
            console.log(error);
        }

    },

    updateImage: async (req, res, next) => {
        console.log(req.file);
        // console.log(req.body);

        var bucket = admin.storage().bucket();

        const uniqueFileName = req.params.userId + '.jpg';
        const file = bucket.file(uniqueFileName);

        const stream = file.createWriteStream({
            metadata: {
                contentType: req.file.mimetype,
            },
        });

        stream.on('error', (err) => {
            console.error(err);

        });

        stream.on('finish', async () => {

            const downloadUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;

            const signedUrl = await file.getSignedUrl({
                action: 'read',
                expires: '01-01-2024',
            });
            // console.log(downloadUrl);
            // console.log(file);
            try {
                await User.updateOne({ _id: req.params.userId },
                    { $set: { image: signedUrl[0] } }
                )
            } catch (error) {
                next(error)
            }

        })
        stream.end(req.file.buffer);
        res.status(200).json({ message: 'Image updated successfully' })



        // bucket.upload(req.file.buffer).then((response) => {
        //     console.log(response);
        // }).catch((error) => {
        //     console.log(error);
        // })
    }
}