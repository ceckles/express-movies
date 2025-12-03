const { prisma } = require('../config/db');

const addToWatchlistController = async (req, res) => {
    const { movieId, status, rating, notes, userId } = req.body;

    //validated body
    if (!movieId || !status || !rating || !notes) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    //check if movie exists
    const movieExists = await prisma.movie.findUnique({ where: { id: movieId } });
    if (!movieExists) {
        return res.status(404).json({ error: 'Movie not found' });
    }

    //Check if already in watchlist
    const movieInWatchlist = await prisma.watchlistItem.findFirst({
        where: {
            userId: userId,
            movieId: movieId
        }
    });
    if (movieInWatchlist) {
        return res.status(400).json({ error: 'Movie already in watchlist' });
    }

    //Create watchlist item
    const watchlistItem = await prisma.watchlistItem.create({
        data: {
            userId,
            movieId,
            status: status || "PLANNED",
            rating: rating || null,
            notes: notes || null
        }
    })
    //Validate watchlist item creation
    if (!watchlistItem) {
        return res.status(500).json({ error: 'Failed to add movie to watchlist' });
    }

    //Return the watchlist item
    res.status(201).json({
        status: 'success',
        data: watchlistItem
    })

}

module.exports = { addToWatchlistController };