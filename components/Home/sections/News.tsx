import Link from 'next/link';

import { FaArrowRight } from 'react-icons/fa';

import { SectionHeading } from '@/components/layout/SectionHeading';
import { Reveal } from '@/components/ui/animation/Reveal';
import { NewsCard } from '@/components/News/NewsCard';

import { NEWS_DATA } from '@/data/data';

export default function News() {
    const newestPosts = NEWS_DATA.sort((a, b) => {
        const aDate = a.publishedAt;
        const bDate = b.publishedAt;

        if (aDate > bDate) {
            return -1;
        }

        if (aDate < bDate) {
            return 1;
        }

        return 0;
    }).slice(0, 3);

    return (
        <section className="section">
            <div className="container-content">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <SectionHeading
                        eyebrow="Aktualności"
                        title="Najnowsze wiadomości"
                    />
                    <Link href="/aktualnosci" className="btn-ghost">
                        Wszystkie <FaArrowRight size={16} />
                    </Link>
                </div>
                <div className="mt-10">
                    {/* {news.loading ? (
                        <Spinner />
                    ) : news.error ? (
                        <ErrorState message={news.error} />
                    ) : !news.data?.length ? (
                        <EmptyState title="Brak artykułów" />
                    ) : ( */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {newestPosts.map((p, i) => (
                            <Reveal key={p.id} delay={i * 0.08}>
                                <NewsCard post={p} />
                            </Reveal>
                        ))}
                    </div>
                    {/* )} */}
                </div>
            </div>
        </section>
    );
}
