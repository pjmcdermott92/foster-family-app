import { Bell, ChevronDown, MessageCircleMore, Search } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group';
import { SidebarTrigger } from './SidebarTrigger';

export function Navbar({ profile }: { profile: { fullName: string | null } }) {
    return (
        <nav className='h-header border-b bg-background'>
            <div className='px-2 flex h-full items-center justify-between gap-4'>
                <SidebarTrigger className='md:hidden' />
                <Link
                    href='/app'
                    className='text-xl font-bold select-none text-primary text-shadow-xs'>
                    FosterKeep
                </Link>
                <div className='max-w-4xl lg:flex-1 flex gap-2'>
                    <InputGroup className='hidden lg:flex'>
                        <InputGroupInput placeholder='Search...' type='search' />
                        <InputGroupAddon>
                            <Search />
                        </InputGroupAddon>
                    </InputGroup>

                    <div className='hidden sm:flex items-center gap-1'>
                        <Button variant='icon-rounded' className='lg:hidden'>
                            <Search />
                            <span className='sr-only'>Search...</span>
                        </Button>
                        <Button variant='icon-rounded'>
                            <MessageCircleMore />
                            <span className='sr-only'>Messages</span>
                        </Button>
                        <Button variant='icon-rounded'>
                            <Bell />
                            <span className='sr-only'>Alerts</span>
                        </Button>
                    </div>
                    <Button variant='ghost'>
                        <span className='rounded-full uppercase bg-primary text-primary-foreground size-7 flex items-center justify-center text-lg'>
                            {profile.fullName?.slice(0, 1)}
                        </span>
                        <span className='hidden lg:inline-block'>
                            {profile.fullName?.split(' ')[0]}
                        </span>
                        <ChevronDown />
                    </Button>
                </div>
            </div>
        </nav>
    );
}
