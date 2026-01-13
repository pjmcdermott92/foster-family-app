import { AppSidebar } from '@/components/layout/AppSidebar';
import { Navbar } from '@/components/layout/Navbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { getProfileById } from '@/features/profile/db/profile';
import { getCurrentUser } from '@/services/supabase/lib/getCurrentUser';
import { redirect } from 'next/navigation';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
    const user = await getCurrentUser();
    if (user == null) return redirect('/auth/login');

    const profile = await getProfileById(user.id);
    if (!profile) return redirect('/app');

    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width': '150px',
                    '--sidebar-width-mobile': '150rem',
                } as React.CSSProperties
            }>
            <AppSidebar />
            <main className='w-full bg-secondary'>
                <Navbar profile={profile} />
                {children}
            </main>
        </SidebarProvider>
    );
}
