import type { Metadata } from 'next';
import './globals.css';

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

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pl">
            <body>{children}</body>
        </html>
    );
}
