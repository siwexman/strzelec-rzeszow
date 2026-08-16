import { notFound, redirect } from 'next/navigation';

import { PostForm } from '@/components/dashboard/PostForm';
import { updatePost } from '@/app/dashboard/actions';
import { getSession } from '@/lib/session';
import { getPostById, getPostAttachments } from '@/lib/wp-admin';

type Props = {
    params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: Props) {
    const session = await getSession();
    if (!session) {
        redirect('/login');
    }

    const { id } = await params;
    const post = await getPostById(session, Number(id));

    if (!post) {
        notFound();
    }

    const featuredImage = post._embedded?.['wp:featuredmedia']?.[0];
    const attachments = await getPostAttachments(session, post.id);
    const gallery = attachments.filter(a => a.id !== post.featured_media);

    return (
        <div>
            <h1 className="mb-6 text-2xl font-bold text-neutral-900">Edytuj wpis</h1>
            <PostForm
                action={updatePost}
                submitLabel="Zapisz zmiany"
                initial={{
                    id: post.id,
                    slug: post.slug,
                    title: post.title.rendered,
                    content: post.content.rendered,
                    status: post.status,
                    featuredImage,
                    gallery,
                }}
            />
        </div>
    );
}
