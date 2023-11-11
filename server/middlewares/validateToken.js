const jwt = require("jsonwebtoken");


const validateToken = (req, res, next) => {
    let token, user;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    try {
        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {

                if (err) {
                    res.status(401);
                    throw new Error("user is not authorised");
                }
                req.user = decoded.user
                next()
            })
        } else {
            console.log('asdsa');
            res.status(400)
            throw new Error("user is not authorised");
        }

    } catch (err) {
        next(err)
    }
}

module.exports = validateToken;