import { getProfileById } from '@/features/profile/db/profile';
import { getCurrentUser } from '@/services/supabase/lib/getCurrentUser';
import { redirect } from 'next/navigation';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
    const user = await getCurrentUser();
    if (user == null) return redirect('/auth/login');

    const profile = await getProfileById(user.id);
    if (!profile) return redirect('/app');

    console.log(profile)

    return <>{children}</>;
}
