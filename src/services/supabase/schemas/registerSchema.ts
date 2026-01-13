import { z } from 'zod';

export const registerSchema = z
    .object({
        fullName: z.string().min(1, 'Please enter your full name'),
        email: z.email('Please enter a valid email address'),
        password: z
            .string()
            .min(6, 'Password must be at least 6 characters')
            .max(20, 'Password must be less than 20 characters'),
        repeatPassword: z.string('Please confirm your password'),
    })
    .superRefine((data, ctx) => {
        if (data.password !== data.repeatPassword) {
            ctx.addIssue({
                code: 'custom',
                message: 'Passwords do not match',
                path: ['repeatPassword'],
            });
        }
    });
