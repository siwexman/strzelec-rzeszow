import type { Metadata } from 'next';

import NewsList from '@/components/News/NewsList';
import { Reveal } from '@/components/ui/animation/Reveal';

export const metadata: Metadata = {
    title: 'Aktualności',
    description:
        'Najnowsze informacje z życia Jednostki Strzeleckiej 2021 im. płk Leopolda Lisa-Kuli w Rzeszowie.',
};

export default function News() {
    return (
        <>
            <section className="section">
                <div className="container-content pb-2">
                    <Reveal>
                        <p className="eyebrow">Aktualności</p>
                        <h1 className="mt-2 max-w-3xl text-3xl font-bold sm:text-4xl lg:text-5xl">
                            Aktualności i wydarzenia
                        </h1>
                        <p className="mt-3 max-w-2xl text-lg text-neutral-600">
                            Najnowsze informacje z życia Jednostki Strzeleckiej
                            2021 w Rzeszowie.
                        </p>
                    </Reveal>
                </div>

                <div className="container-content">
                    <NewsList />
                </div>
            </section>
        </>
    );
}
