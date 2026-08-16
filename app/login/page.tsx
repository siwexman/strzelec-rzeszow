'use client';

import { useActionState } from 'react';

import { login } from './actions';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

export default function LoginPage() {
    const [state, formAction, pending] = useActionState(login, null);

    return (
        <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
            <form
                action={formAction}
                className="card w-full max-w-sm space-y-5 p-8"
            >
                <div>
                    <h1 className="text-xl font-bold text-neutral-900">
                        Panel administratora
                    </h1>
                </div>

                {state?.error && (
                    <p className="rounded-lg bg-accent-50 px-4 py-3 text-sm text-accent-700">
                        {state.error}
                    </p>
                )}

                <div>
                    <label
                        htmlFor="username"
                        className="mb-1.5 block text-sm font-medium text-neutral-700"
                    >
                        Nazwa użytkownika
                    </label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                        autoFocus
                        className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="mb-1.5 block text-sm font-medium text-neutral-700"
                    >
                        Hasło
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    />
                </div>

                <button
                    type="submit"
                    disabled={pending}
                    className="btn-primary w-full disabled:opacity-60 cursor-pointer"
                >
                    {pending ? 'Logowanie…' : 'Zaloguj się'}
                </button>
                <Link
                    href={'/'}
                    className="flex gap-2 justify-center underline"
                >
                    <p className="text-center">Wróć do strony głównej</p>
                    <FaArrowRight className="my-auto" />
                </Link>
            </form>
        </div>
    );
}
