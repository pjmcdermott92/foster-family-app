'use server';
import { registerSchema } from '@/services/supabase/schemas/registerSchema';
import { createProfile as createProfileDb } from '../db/profile';
import { createUser } from '@/services/supabase/actions/auth';

interface CreateProfileInput {
    fullName: string;
    email: string;
    password: string;
    repeatPassword: string;
    role?: string;
}

export async function createProfile(unsafeData: CreateProfileInput) {
    const { success, data, error } = registerSchema.safeParse(unsafeData);

    if (!success) {
        const fieldErrors = error.flatten().fieldErrors;
        return {
            success: false,
            message: 'Please check the fields and try again',
            errors: fieldErrors,
            data: null,
        };
    }

    const { email, password, fullName, role } = data;

    const result = await createUser({ email: email.toLowerCase(), password });

    if (result.error || !result.user) {
        console.log(result.error);
        return {
            success: false,
            message: 'Failed to create user',
            errors: null,
            data: null,
        };
    }

    const profile = await createProfileDb({
        id: result.user.id,
        fullName,
        email: email.toLowerCase(),
        role,
    });

    return { success: true, data: profile, message: undefined, errors: undefined };
}
