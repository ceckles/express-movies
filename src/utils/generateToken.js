const jwt = require('jsonwebtoken');

const generateToken = (userId, res) => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        const payload = { id: userId };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        //set the token as a cookie
        res.cookie('jwt', token, {
            httpOnly: true, //only the server can access the cookie
            secure: process.env.NODE_ENV === 'production', //only set if in production
            sameSite: 'strict', //prevent CSRF attacks
            maxAge: (1000 * 60 * 60 * 24) * 7, //expires in 7 days (in milliseconds)
        })

        return token;
    } catch (error) {
        throw error; // Let the controller handle errors
    }
}

module.exports = generateToken;