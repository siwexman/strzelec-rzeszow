import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
    title: {
        default: 'Strzelec Rzeszów',
        template: '%s — Strzelec Rzeszów',
    },
    description:
        'Organizacja patriotyczna, paramilitarna i wychowawcza kształtująca odpowiedzialnych obywateli.',
    openGraph: {
        title: 'Strzelec Rzeszów',
        description:
            'Organizacja patriotyczna, paramilitarna i wychowawcza kształtująca odpowiedzialnych obywateli.',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Strzelec Rzeszów',
        description:
            'Organizacja patriotyczna, paramilitarna i wychowawcza kształtująca odpowiedzialnych obywateli.',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pl">
            <body>
                <div className="flex min-h-screen flex-col">
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
