const { prisma } = require("../config/db");
const bcrypt = require('bcryptjs');

const registerUserController = async (req, res) => {
    //destructure the body
    const { name, email, password } = req.body;

    //validate the body
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

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

    //Validate user creation
    if(!user){
        return res.status(500).json({ error: 'Failed to create user' });
    }

    //Return the user
    res.status(201).json({
        status: 'success',
        data: {
            user: { id: user.id, name: user.name, email: user.email }
        }
    })
}

module.exports = { registerUserController };