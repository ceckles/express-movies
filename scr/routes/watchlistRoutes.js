const express = require('express');
const { addToWatchlistController, deleteFromWatchlistController, updateWatchlistItemController } = require('../controllers/watchlistController');
const authMiddleware = require('../middleware/authMiddleware');
const validateRequestMiddleware = require('../middleware/validateRequestMiddleware');
const { addToWatchlistSchema } = require('../validators/watchlistValidator');

const router = express.Router();
//Apply authentication middleware to all routes in watchlistRoutes
//router.use(authMiddleware);

//Added authMiddleware to watchlist post route
router.post('/', authMiddleware, validateRequestMiddleware(addToWatchlistSchema), addToWatchlistController);
router.delete('/:id', authMiddleware, deleteFromWatchlistController);
router.put('/:id', authMiddleware, updateWatchlistItemController);

module.exports = router;