const express = require('express');
const { addToWatchlistController, deleteFromWatchlistController, updateWatchlistItemController } = require('../controllers/watchlistController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
//Apply authentication middleware to all routes in watchlistRoutes
//router.use(authMiddleware);

//Added authMiddleware to watchlist post route
router.post('/', authMiddleware, addToWatchlistController);
router.delete('/:id', authMiddleware, deleteFromWatchlistController);
router.put('/:id', authMiddleware, updateWatchlistItemController);

module.exports = router;