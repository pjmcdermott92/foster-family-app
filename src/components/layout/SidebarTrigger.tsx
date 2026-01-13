'use client';
import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { useSidebar } from '../ui/sidebar';

export function SidebarTrigger({ className }: { className?: string }) {
    const { toggleSidebar } = useSidebar();

    return (
        <Button variant='icon-rounded' onClick={toggleSidebar} className={className}>
            <Menu />
        </Button>
    );
}
