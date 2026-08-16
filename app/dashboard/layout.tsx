import Link from 'next/link';
import { redirect } from 'next/navigation';

import { getSession } from '@/lib/session';
import { logout } from '@/app/login/actions';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getSession();
    if (!session) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-neutral-50">
            <header className="border-b border-neutral-200 bg-white">
                <div className="container-content flex items-center justify-between py-4">
                    <Link href="/dashboard" className="font-display text-lg font-bold text-neutral-900">
                        Panel
                    </Link>
                    <nav className="flex items-center gap-3">
                        <span className="text-sm text-neutral-500">{session.displayName}</span>
                        <Link href="/dashboard/posts/new" className="btn-outline">
                            Nowy wpis
                        </Link>
                        <form action={logout}>
                            <button type="submit" className="btn-ghost">
                                Wyloguj
                            </button>
                        </form>
                    </nav>
                </div>
            </header>
            <main className="container-content py-10">{children}</main>
        </div>
    );
}
