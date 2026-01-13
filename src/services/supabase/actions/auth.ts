'use server';
import { createAdminClient } from '../server';

export async function createUser({ email, password }: { email: string; password: string }) {
    const supabase = await createAdminClient();

    try {
        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
        });

        if (error || !data.user) {
            return { user: null, error: error?.message || 'Failed to create user' };
        }

        return { user: data.user, error: null };
    } catch (err) {
        return { user: null, err: (err as Error).message };
    }
}
