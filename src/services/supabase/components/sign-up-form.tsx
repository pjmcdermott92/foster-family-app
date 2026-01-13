'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoadingSwap } from '@/components/ui/loading-swap';
import { createProfile } from '@/features/profile/actions/createProfile';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export function SignUpForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
    const fullNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const repeatPasswordRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const res = await createProfile({
                email: emailRef.current?.value ?? '',
                password: passwordRef.current?.value ?? '',
                repeatPassword: repeatPasswordRef.current?.value ?? '',
                fullName: fullNameRef.current?.value ?? '',
            });

            if (!res.success) throw new Error(res.message);

            router.push('/auth/sign-up-success');
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
                    <CardTitle className='text-2xl'>Sign up</CardTitle>
                    <CardDescription>Create a new account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSignUp}>
                        <div className='flex flex-col gap-6'>
                            <div className='grid gap-2'>
                                <Label htmlFor='fullName'>Full Name</Label>
                                <Input
                                    ref={fullNameRef}
                                    id='fullName'
                                    type='text'
                                    placeholder='John Smith'
                                    required
                                />
                            </div>
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
                                </div>
                                <Input ref={passwordRef} id='password' type='password' required />
                            </div>
                            <div className='grid gap-2'>
                                <div className='flex items-center'>
                                    <Label htmlFor='repeat-password'>Repeat Password</Label>
                                </div>
                                <Input
                                    ref={repeatPasswordRef}
                                    id='repeat-password'
                                    type='password'
                                    required
                                />
                            </div>
                            {error && <p className='text-sm text-red-500'>{error}</p>}
                            <Button type='submit' className='w-full' disabled={isLoading}>
                                <LoadingSwap isLoading={isLoading}>Sign Up</LoadingSwap>
                            </Button>
                        </div>
                        <div className='mt-4 text-center text-sm'>
                            Already have an account?{' '}
                            <Link href='/auth/login' className='underline underline-offset-4'>
                                Login
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
