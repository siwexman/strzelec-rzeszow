'use client';

import { NewsPostShort } from '@/types';

import Loader from '../ui/Loader';
import { Reveal } from '../ui/animation/Reveal';
import { NewsCard } from './NewsCard';

import { useAsync } from '@/hooks/useAsync';
import { NEWS_DATA } from '@/data/data';

async function fetchNewestNews(): Promise<NewsPostShort[]> {
    return [...NEWS_DATA]
        .sort((a, b) => {
            if (a.publishedAt > b.publishedAt) return -1;
            if (a.publishedAt < b.publishedAt) return 1;
            return 0;
        })
        .slice(0, 3);
}

export default function NewsComponent() {
    const { data, loading, error } = useAsync(fetchNewestNews);

    return (
        <div className="mt-10">
            {loading ? (
                <Loader label="Ładowanie aktualności..." />
            ) : error ? (
                <p className="py-20 text-center text-sm text-red-500">
                    {error}
                </p>
            ) : !data?.length ? (
                <p className="py-20 text-center text-sm text-neutral-500">
                    Brak artykułów
                </p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {data.map((p, i) => (
                        <Reveal key={p.id} delay={i * 0.08}>
                            <NewsCard post={p} />
                        </Reveal>
                    ))}
                </div>
            )}
        </div>
    );
}
