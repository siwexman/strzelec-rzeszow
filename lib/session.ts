'use server';

import {
    createCipheriv,
    createDecipheriv,
    createHash,
    randomBytes,
} from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'session';
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

export type Session = {
    username: string;
    appPassword: string;
    displayName: string;
    expires: number;
};

function getKey(): Buffer {
    const secret = process.env.SESSION_SECRET;
    if (!secret) {
        throw new Error('SESSION_SECRET is not set');
    }
    return createHash('sha256').update(secret).digest();
}

export async function createSession(
    data: Omit<Session, 'expires'>,
): Promise<void> {
    const session: Session = { ...data, expires: Date.now() + SESSION_TTL_MS };

    const iv = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', getKey(), iv);
    const ciphertext = Buffer.concat([
        cipher.update(JSON.stringify(session), 'utf8'),
        cipher.final(),
    ]);
    const authTag = cipher.getAuthTag();

    const value = [iv, authTag, ciphertext]
        .map(b => b.toString('base64'))
        .join('.');

    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, value, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        expires: new Date(session.expires),
    });
}

export async function destroySession(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

export async function getSession(): Promise<Session | null> {
    const cookieStore = await cookies();
    const value = cookieStore.get(COOKIE_NAME)?.value;
    if (!value) return null;

    const parts = value.split('.');
    if (parts.length !== 3) return null;
    const [ivB64, authTagB64, ciphertextB64] = parts;

    try {
        const decipher = createDecipheriv(
            'aes-256-gcm',
            getKey(),
            Buffer.from(ivB64, 'base64'),
        );
        decipher.setAuthTag(Buffer.from(authTagB64, 'base64'));
        const plaintext = Buffer.concat([
            decipher.update(Buffer.from(ciphertextB64, 'base64')),
            decipher.final(),
        ]).toString('utf8');

        const session: Session = JSON.parse(plaintext);
        if (Date.now() > session.expires) return null;

        return session;
    } catch {
        return null;
    }
}
