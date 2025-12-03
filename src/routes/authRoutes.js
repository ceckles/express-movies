const express = require('express'); 
const { registerUserController, loginUserController, logoutUserController } = require('../controllers/authController');
const validateRequest = require('../middleware/validateRequestMiddleware');
const { registerUserSchema, loginUserSchema } = require('../validators/authValidator');

const router = express.Router();

router.post('/register', validateRequest(registerUserSchema), registerUserController);
router.post('/login', validateRequest(loginUserSchema), loginUserController);
router.post('/logout', logoutUserController);

module.exports = router;