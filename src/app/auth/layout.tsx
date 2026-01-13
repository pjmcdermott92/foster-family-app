import { getCurrentUser } from '@/services/supabase/lib/getCurrentUser';
import { redirect } from 'next/navigation';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const user = await getCurrentUser();
    if (user) return redirect('/app');

    return children;
}
