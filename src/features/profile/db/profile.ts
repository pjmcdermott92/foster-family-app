import { prisma } from '@/lib/prisma';

export async function createProfile({
    id,
    fullName,
    email,
    phoneNumber,
    role = 'foster-parent',
}: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber?: string;
    role?: string;
}) {
    return await prisma.profile.upsert({
        where: { id },
        update: {},
        create: {
            id,
            fullName,
            email,
            phoneNumber,
            role,
        },
    });
}

export async function getProfileById(id: string) {
    return await prisma.profile.findFirst({
        where: { id },
    });
}
