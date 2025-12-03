const { prisma } = require('../config/db');

const addToWatchlistController = async (req, res) => {
    const { movieId, status, rating, notes } = req.body;

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
            userId: req.user.id,
            movieId: movieId
        }
    });
    if (movieInWatchlist) {
        return res.status(400).json({ error: 'Movie already in watchlist' });
    }

    try {
        const watchlistItem = await prisma.watchlistItem.create({
            data: {
                userId: req.user.id,
                movieId,
                status: status || "PLANNED",
                rating: rating || null,
                notes: notes || null
            }
        })

        res.status(201).json({
            status: 'success',
            data: watchlistItem
        })
    } catch (error) {
        if (error.code === 'P2002') { // Unique constraint
            return res.status(400).json({ error: 'Movie already in watchlist' });
        }
        return res.status(500).json({ error: 'Failed to add movie to watchlist' });
    }
}

const deleteFromWatchlistController = async (req, res) => {
    // Find watchlist item and verify ownership
    const watchlistItem = await prisma.watchlistItem.findUnique({
        where: { id: req.params.id },
    });

    if (!watchlistItem) {
        return res.status(404).json({ error: "Watchlist item not found" });
    }

    // Ensure only owner can delete
    if (watchlistItem.userId !== req.user.id) {
        return res
            .status(403)
            .json({ error: "Not allowed to update this watchlist item" });
    }

    try {
        await prisma.watchlistItem.delete({
            where: { id: req.params.id },
        });

        res.status(200).json({
            status: "success",
            message: "Movie removed from watchlist",
        });
    } catch (error) {
        if (error.code === 'P2025') { // Record not found
            return res.status(404).json({ error: "Watchlist item not found" });
        }
        return res.status(500).json({ error: 'Failed to delete watchlist item' });
    }
};

module.exports = { addToWatchlistController, deleteFromWatchlistController };