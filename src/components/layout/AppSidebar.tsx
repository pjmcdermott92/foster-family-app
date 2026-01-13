import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '../ui/sidebar';

export function AppSidebar() {
    return (
        <Sidebar collapsible='icon'>
            <SidebarHeader />
            <SidebarContent>SIDEBAR</SidebarContent>
            <SidebarFooter />
        </Sidebar>
    );
}
