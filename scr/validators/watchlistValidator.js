const z = require('zod');

const addToWatchlistSchema = z.object({
    movieId: z.uuid({message: 'Movie ID must be a valid UUID'}),
    status: z.enum(['PLANNED', 'WATCHING', 'COMPLETED', 'DROPPED'], {message: 'status must be either PLANNED, WATCHING, COMPLETED, or DROPPED'}).optional(),
    rating: z.coerce.number().min(1).max(10, { message: 'Rating must be between 1 and 10' }),
    notes: z.string().max(500, { message: 'Notes must be less than 500 characters' }).optional(),
});

const updateWatchlistItemSchema = z.object({
    status: z.enum(['PLANNED', 'WATCHING', 'COMPLETED', 'DROPPED'], {message: 'status must be either PLANNED, WATCHING, COMPLETED, or DROPPED'}).optional(),
    rating: z.coerce.number().min(1).max(10, { message: 'Rating must be between 1 and 10' }).optional(),
    notes: z.string().max(500, { message: 'Notes must be less than 500 characters' }).optional(),
});

module.exports = { addToWatchlistSchema, updateWatchlistItemSchema };