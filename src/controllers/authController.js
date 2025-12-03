const { prisma } = require("../config/db");
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

const registerUserController = async (req, res) => {
    try {
        //destructure the body
        const { name, email, password } = req.body;

        //validate the body without using zod
        // if (!name || !email || !password) {
        //     return res.status(400).json({ message: 'All fields are required' });
        // }

        //Check if user exists already
        const userExists = await prisma.user.findUnique({ where: { email } });

        //If user exists, return error
        if (userExists) {
            return res.status(400).json({ error: 'User already exists with this email address' });
        }

        //Hash the password for storage
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Create the User
        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword }
        })

        //Generate JWT token
        const token = generateToken(user.id, res);
        if (!token) {
            return res.status(500).json({ error: 'Failed to generate token' });
        }

        //Return the user
        res.status(201).json({
            status: 'success',
            data: {
                user: { id: user.id, name: user.name, email: user.email },
                token
            }
        })
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ error: 'Failed to register user' });
    }
}

const loginUserController = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Validate the body without using zod
        // if (!email || !password) {
        //     return res.status(400).json({ error: 'All fields are required' });
        // }

        //Check if user exists
        const userExists = await prisma.user.findUnique({ where: { email } });

        //If user does not exist, return error
        if (!userExists) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        //verify passwords
        const isPasswordCorrect = await bcrypt.compare(password, userExists.password);
        //If passwords do not match, return error
        if (!isPasswordCorrect) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        //Generate JWT token
        const token = generateToken(userExists.id, res);
        if (!token) {
            return res.status(500).json({ error: 'Failed to generate token' });
        }

        //Return the user
        res.status(200).json({
            status: 'success',
            data: {
                user: { id: userExists.id, email: userExists.email },
                token
            }
        })
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Failed to login user' });
    }
}

const logoutUserController = async (req, res) => {
    try {
        //clear the cookie
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0)
        });

        res.status(200).json({
            status: 'success',
            message: 'Logged out successfully'
        });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ error: 'Failed to logout' });
    }
}

module.exports = { registerUserController, loginUserController, logoutUserController };