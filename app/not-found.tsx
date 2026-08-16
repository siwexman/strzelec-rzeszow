import Link from 'next/link';
import { FaArrowLeft, FaEnvelope, FaHome } from 'react-icons/fa';

import { Reveal } from '@/components/ui/animation/Reveal';

export default function NotFound() {
    return (
        <section className="section flex min-h-[70vh] items-center">
            <div className="container-content text-center">
                <Reveal>
                    <p className="eyebrow">Błąd 404</p>
                    <h1 className="mt-2 text-6xl font-bold text-primary sm:text-7xl lg:text-8xl">
                        404
                    </h1>
                    <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                        Nie znaleziono strony
                    </h2>
                    <p className="mx-auto mt-3 max-w-xl text-lg text-neutral-600">
                        Strona, której szukasz, mogła zostać przeniesiona lub
                        usunięta. Sprawdź adres URL albo wróć na stronę
                        główną.
                    </p>
                </Reveal>

                <Reveal delay={0.1}>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <Link href="/" className="btn-primary">
                            <FaHome />
                            Strona główna
                        </Link>
                        <Link href="/kontakt" className="btn-outline">
                            <FaEnvelope />
                            Kontakt
                        </Link>
                    </div>
                    <Link
                        href="/aktualnosci"
                        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-primary"
                    >
                        <FaArrowLeft />
                        Zobacz aktualności
                    </Link>
                </Reveal>
            </div>
        </section>
    );
}
