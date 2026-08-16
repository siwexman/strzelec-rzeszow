import Image from 'next/image';
import Link from 'next/link';

import { getAllPosts } from '@/lib/queries';
import { formatDate } from '@/utils/format';
import { DeletePostButton } from '@/components/dashboard/DeletePostButton';

export default async function DashboardPage() {
    const { posts } = await getAllPosts(1, 10);

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-neutral-900">Ostatnie aktualności</h1>
                <Link href="/dashboard/posts/new" className="btn-primary">
                    + Nowy wpis
                </Link>
            </div>

            {posts.length === 0 ? (
                <p className="py-16 text-center text-sm text-neutral-500">
                    Brak opublikowanych wpisów.
                </p>
            ) : (
                <div className="space-y-3">
                    {posts.map(post => {
                        const image =
                            post._embedded && post._embedded['wp:featuredmedia']
                                ? post._embedded['wp:featuredmedia'][0]
                                : post.images?.[0];

                        return (
                            <div
                                key={post.id}
                                className="card flex items-center gap-4 p-4"
                            >
                                <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                                    {image ? (
                                        <Image
                                            src={image.source_url}
                                            alt={image.alt_text}
                                            width={96}
                                            height={64}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : null}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h2 className="truncate font-semibold text-neutral-900">
                                        {post.title.rendered}
                                    </h2>
                                    <p className="text-sm text-neutral-500">
                                        {formatDate(post.date)}
                                    </p>
                                </div>
                                <div className="flex shrink-0 items-center gap-2">
                                    <Link
                                        href={`/dashboard/posts/${post.id}/edit`}
                                        className="btn-outline"
                                    >
                                        Edytuj
                                    </Link>
                                    <DeletePostButton id={post.id} title={post.title.rendered} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
