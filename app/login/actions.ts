'use server';

import { redirect } from 'next/navigation';

import { authenticateWithPassword } from '@/lib/wp-admin';
import { createSession, destroySession } from '@/lib/session';

export type LoginState = { error: string } | null;

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
    const username = formData.get('username')?.toString().trim();
    const password = formData.get('password')?.toString();

    if (!username || !password) {
        return { error: 'Podaj nazwę użytkownika i hasło.' };
    }

    const result = await authenticateWithPassword(username, password);
    if (!result) {
        return { error: 'Nieprawidłowa nazwa użytkownika lub hasło.' };
    }

    await createSession({
        username,
        appPassword: result.appPassword,
        displayName: result.displayName,
    });
    redirect('/dashboard');
}

export async function logout(): Promise<void> {
    await destroySession();
    redirect('/login');
}
