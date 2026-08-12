import Image from 'next/image';
import Link from 'next/link';

import { FaArrowRight, FaCalendar, FaClock } from 'react-icons/fa';

import type { NewsPostShort } from '@/types';
import { formatDate, readingTime } from '@/utils/format';

export function NewsCard({ post }: { post: NewsPostShort }) {
    return (
        <Link
            href={`/aktualnosci/${post.slug}`}
            className="card card-hover group flex flex-col overflow-hidden"
        >
            <div className="aspect-16/10 overflow-hidden bg-neutral-100">
                {post.image ? (
                    <Image
                        src={`/${post.image}`}
                        alt={post.title}
                        width={380}
                        height={380}
                        sizes="40vw"
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="h-full w-full bg-linear-to-br from-primary-50 to-neutral-100" />
                )}
            </div>
            <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2 text-xs">
                    {/* {post.category && (
                        <span className="badge-accent">{post.category}</span>
                    )} */}
                    <span className="flex items-center gap-1 text-neutral-400">
                        <FaCalendar size={14} />
                        {formatDate(post.publishedAt)}
                    </span>
                </div>
                <h3 className="mt-3 text-lg font-bold leading-snug text-neutral-900 group-hover:text-primary">
                    {post.title}
                </h3>
                {/* {post.excerpt && (
                    <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
                        {post.excerpt}
                    </p>
                )} */}
                <div className="mt-4 flex items-center justify-between text-xs text-neutral-400">
                    <span className="flex items-center gap-1">
                        <FaClock size={14} /> {readingTime(post.description)}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                        Czytaj <FaArrowRight size={14} />
                    </span>
                </div>
            </div>
        </Link>
    );
}
