const jwt = require('jsonwebtoken');
const { prisma } = require('../config/db');

//JWT Authentication Middleware
const authMiddleware = async (req, res, next) => {
    console.log('Authenticating request...');

    //Get token from cookies
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]; //ignore 'Bearer' prefix
    } else if (req.cookies?.jwt) {
        token = req.cookies.jwt;
    } else {
        return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    try {
        //Verify token and get user id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized - User not found' });
        }

        //Attach user to request object
        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }

}

module.exports = authMiddleware;