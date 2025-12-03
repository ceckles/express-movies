const express = require('express');
const { addToWatchlistController } = require('../controllers/watchlistController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
//Apply authentication middleware to all routes in watchlistRoutes
router.use(authMiddleware);

router.post('/', addToWatchlistController);

module.exports = router;