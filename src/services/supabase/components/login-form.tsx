'use client';

import { cn } from '@/lib/utils';
import { createClient } from '@/services/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { LoadingSwap } from '@/components/ui/loading-swap';

export function LoginForm({
    className,
    redirectUrl,
    ...props
}: React.ComponentPropsWithoutRef<'div'> & { redirectUrl?: string }) {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const supabase = createClient();
        setIsLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: emailRef.current?.value ?? '',
                password: passwordRef.current?.value ?? '',
            });
            if (error) throw error;
            router.push(redirectUrl ?? '/app');
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className='text-2xl'>Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin}>
                        <div className='flex flex-col gap-6'>
                            <div className='grid gap-2'>
                                <Label htmlFor='email'>Email</Label>
                                <Input
                                    ref={emailRef}
                                    id='email'
                                    type='email'
                                    placeholder='john@example.com'
                                    required
                                />
                            </div>
                            <div className='grid gap-2'>
                                <div className='flex items-center'>
                                    <Label htmlFor='password'>Password</Label>
                                    <Link
                                        href='/auth/forgot-password'
                                        className='ml-auto inline-block text-sm underline-offset-4 hover:underline'>
                                        Forgot your password?
                                    </Link>
                                </div>
                                <Input ref={passwordRef} id='password' type='password' required />
                            </div>
                            {error && <p className='text-sm text-red-500'>{error}</p>}
                            <Button type='submit' className='w-full' disabled={isLoading}>
                                <LoadingSwap isLoading={isLoading}>Log In</LoadingSwap>
                            </Button>
                        </div>
                        <div className='mt-4 text-center text-sm'>
                            Don&apos;t have an account?{' '}
                            <Link href='/auth/sign-up' className='underline underline-offset-4'>
                                Sign up
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
