const { prisma } = require('../config/db');

const getAllMoviesController = async (req, res) => {
    try {
        const movies = await prisma.movie.findMany({
            include: {
                creator: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.status(200).json({
            status: 'success',
            data: movies
        });
    } catch (error) {
        console.error('Get all movies error:', error);
        return res.status(500).json({ error: 'Failed to retrieve movies' });
    }
};

const getMovieByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        const movie = await prisma.movie.findUnique({
            where: { id },
            include: {
                creator: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.status(200).json({
            status: 'success',
            data: movie
        });
    } catch (error) {
        console.error('Get movie by id error:', error);
        return res.status(500).json({ error: 'Failed to retrieve movie' });
    }
};

const createMovieController = async (req, res) => {
    try {
        const { title, overview, releaseYear, genres, runtime, posterUrl } = req.body;

        const movie = await prisma.movie.create({
            data: {
                title,
                overview: overview || null,
                releaseYear,
                genres: genres || [],
                runtime: runtime || null,
                posterUrl: posterUrl || null,
                createdBy: req.user.id
            },
            include: {
                creator: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        res.status(201).json({
            status: 'success',
            data: movie
        });
    } catch (error) {
        console.error('Create movie error:', error);
        return res.status(500).json({ error: 'Failed to create movie' });
    }
};

const updateMovieController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, overview, releaseYear, genres, runtime, posterUrl } = req.body;

        // Find movie and verify ownership
        const movie = await prisma.movie.findUnique({
            where: { id }
        });

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        // Ensure only creator can update
        if (movie.createdBy !== req.user.id) {
            return res.status(403).json({ error: 'Not allowed to update this movie' });
        }

        // Build update data object, only including provided fields
        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (overview !== undefined) updateData.overview = overview || null;
        if (releaseYear !== undefined) updateData.releaseYear = releaseYear;
        if (genres !== undefined) updateData.genres = genres;
        if (runtime !== undefined) updateData.runtime = runtime || null;
        if (posterUrl !== undefined) updateData.posterUrl = posterUrl || null;

        const updatedMovie = await prisma.movie.update({
            where: { id },
            data: updateData,
            include: {
                creator: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });

        res.status(200).json({
            status: 'success',
            data: updatedMovie
        });
    } catch (error) {
        if (error.code === 'P2025') { // Record not found
            return res.status(404).json({ error: 'Movie not found' });
        }
        console.error('Update movie error:', error);
        return res.status(500).json({ error: 'Failed to update movie' });
    }
};

const deleteMovieController = async (req, res) => {
    try {
        const { id } = req.params;

        // Find movie and verify ownership
        const movie = await prisma.movie.findUnique({
            where: { id }
        });

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        // Ensure only creator can delete
        if (movie.createdBy !== req.user.id) {
            return res.status(403).json({ error: 'Not allowed to delete this movie' });
        }

        await prisma.movie.delete({
            where: { id }
        });

        res.status(200).json({
            status: 'success',
            message: 'Movie deleted successfully'
        });
    } catch (error) {
        if (error.code === 'P2025') { // Record not found
            return res.status(404).json({ error: 'Movie not found' });
        }
        console.error('Delete movie error:', error);
        return res.status(500).json({ error: 'Failed to delete movie' });
    }
};

module.exports = {
    getAllMoviesController,
    getMovieByIdController,
    createMovieController,
    updateMovieController,
    deleteMovieController
};

