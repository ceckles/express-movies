const express = require('express'); 
const { registerUserController } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUserController);

module.exports = router;