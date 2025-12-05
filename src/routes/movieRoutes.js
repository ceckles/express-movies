const express = require('express');
const { 
    getAllMoviesController, 
    getMovieByIdController, 
    createMovieController, 
    updateMovieController, 
    deleteMovieController 
} = require('../controllers/movieController');
const authMiddleware = require('../middleware/authMiddleware');
const validateRequestMiddleware = require('../middleware/validateRequestMiddleware');
const { createMovieSchema, updateMovieSchema } = require('../validators/movieValidator');

const router = express.Router();

// GET all movies (public - no auth required)
router.get('/', getAllMoviesController);

// GET movie by id (public - no auth required)
router.get('/:id', getMovieByIdController);

// POST create movie (requires auth)
router.post('/', authMiddleware, validateRequestMiddleware(createMovieSchema), createMovieController);

// PUT update movie (requires auth, only creator can update)
router.put('/:id', authMiddleware, validateRequestMiddleware(updateMovieSchema), updateMovieController);

// DELETE movie (requires auth, only creator can delete)
router.delete('/:id', authMiddleware, deleteMovieController);

module.exports = router;