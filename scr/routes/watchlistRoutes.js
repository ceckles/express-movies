const express = require('express');
const { addToWatchlistController } = require('../controllers/watchlistController');

const router = express.Router();

router.post('/', addToWatchlistController);

module.exports = router;