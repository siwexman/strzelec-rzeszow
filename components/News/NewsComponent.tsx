'use client';

import { useAsync } from '@/hooks/useAsync';

import Loader from '../ui/Loader';
import { Reveal } from '../ui/animation/Reveal';
import { NewsCard } from './NewsCard';
import { PostsReturned } from '@/lib/types';

export default function NewsComponent({
    getPosts,
}: {
    getPosts: () => Promise<PostsReturned>;
}) {
    const { data, loading, error } = useAsync(getPosts);

    return (
        <div className="mt-10">
            {loading ? (
                <Loader label="Ładowanie aktualności..." />
            ) : error ? (
                <p className="py-20 text-center text-sm text-red-500">
                    {error}
                </p>
            ) : !data?.posts.length ? (
                <p className="py-20 text-center text-sm text-neutral-500">
                    Brak artykułów
                </p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {data.posts.map((p, i) => (
                        <Reveal key={p.id} delay={i * 0.08}>
                            <NewsCard post={p} />
                        </Reveal>
                    ))}
                </div>
            )}
        </div>
    );
}
