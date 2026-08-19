import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { FaArrowLeft, FaCalendar } from 'react-icons/fa';

import { Gallery } from '@/components/News/Gallery';
import { Attachments } from '@/components/News/Attachments';
import { Reveal } from '@/components/ui/animation/Reveal';
import { getPostBySlug } from '@/lib/queries';
import { formatDate, stripHtml } from '@/utils/format';
import { getPostAttachments } from '@/lib/wp-admin';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return { title: 'Nie znaleziono artykułu' };
    }

    return {
        title: post.title.rendered,
        description: stripHtml(post.excerpt.rendered),
    };
}

export default async function NewsDetailPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <section className="section">
            <div className="container-content">
                <Reveal>
                    <Link
                        href="/aktualnosci"
                        className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-primary"
                    >
                        <FaArrowLeft size={14} /> Powrót do aktualności
                    </Link>

                    <p className="eyebrow mt-6">Aktualności</p>
                    <h1 className="mt-2 max-w-3xl text-3xl font-bold sm:text-4xl lg:text-5xl">
                        {post.title.rendered}
                    </h1>
                    <span className="mt-3 flex items-center gap-2 text-sm text-neutral-500">
                        <FaCalendar size={14} />
                        {formatDate(post.date)}
                    </span>
                </Reveal>
            </div>

            <div className="container-content mt-10 max-w-3xl">
                <Reveal delay={0.1}>
                    <div
                        className="prose-content"
                        dangerouslySetInnerHTML={{
                            __html: post.content.rendered,
                        }}
                    />
                </Reveal>
            </div>

            {post.images.length > 0 && (
                <div className="container-content mt-14">
                    <Reveal delay={0.15}>
                        <h2 className="text-xl font-bold">Galeria</h2>
                        <div className="mt-6">
                            <Gallery images={post.images} />
                        </div>
                    </Reveal>
                </div>
            )}

            {post.attachments && post.attachments.length > 0 && (
                <div className="container-content mt-14 max-w-3xl">
                    <Reveal delay={0.2}>
                        <h2 className="text-xl font-bold">Załączniki</h2>
                        <div className="mt-6">
                            <Attachments files={post.attachments} />
                        </div>
                    </Reveal>
                </div>
            )}
        </section>
    );
}
