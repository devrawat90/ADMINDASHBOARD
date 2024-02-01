const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.SECRET_KEY;
const verifyToken = (req, res, next) => {

    const token = req.header("auth-token")

    if (!token) {
        return res.status(401).send({ msg: "No token, authorization" }
        )
    }
    try {

        const data = jwt.verify(token, secretKey)
        req.user = data.user
        next()

    } catch (error) {
        return res.status(401).send({ msg: "No token, authorization" })

    }

    // const bearerHeader = req.headers["authorization"]
    // if (typeof bearerHeader !== 'undefined') {
    //     const bearer = bearerHeader.split(" ");
    //     token = bearer[1];
    //     req.token = token
    //     next()
    // } else {
    //     res.json({ message: "token is not valid" })
    // }
}



module.exports = verifyToken