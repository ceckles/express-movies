const z = require('zod');

const registerUserSchema = z.object({
    name: z.string().min(1, {message: 'Name is required'}),
    email: z.email({message: 'Email must be a valid email address'}),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {message: 'Password must be at least 8 characters long Aa-Zz 0-9 !@#$%^&*()'}),
});

const loginUserSchema = z.object({
    email: z.email({message: 'Email must be a valid email address'}),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {message: 'Password must be at least 8 characters long Aa-Zz 0-9 !@#$%^&*()'}),
});

module.exports = { registerUserSchema, loginUserSchema };