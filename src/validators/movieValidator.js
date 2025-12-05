const z = require('zod');

const createMovieSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }),
    overview: z.string().optional(),
    releaseYear: z.coerce.number().int().min(1888).max(new Date().getFullYear() + 10, { message: 'Release year must be a valid year' }),
    genres: z.array(z.string()).optional().default([]),
    runtime: z.coerce.number().int().positive().optional(),
    posterUrl: z.string().url({ message: 'Poster URL must be a valid URL' }).optional().or(z.literal('')),
});

const updateMovieSchema = z.object({
    title: z.string().min(1, { message: 'Title is required' }).optional(),
    overview: z.string().optional(),
    releaseYear: z.coerce.number().int().min(1888).max(new Date().getFullYear() + 10, { message: 'Release year must be a valid year' }).optional(),
    genres: z.array(z.string()).optional(),
    runtime: z.coerce.number().int().positive().optional(),
    posterUrl: z.string().url({ message: 'Poster URL must be a valid URL' }).optional().or(z.literal('')),
});

module.exports = { createMovieSchema, updateMovieSchema };

