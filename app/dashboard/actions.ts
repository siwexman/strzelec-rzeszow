'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { getSession } from '@/lib/session';
import {
    createWPPost,
    updateWPPost,
    deleteWPPost,
    uploadWPMedia,
    deleteWPMedia,
    getPostAttachments,
    type PostStatus,
} from '@/lib/wp-admin';

export type FormState = { error: string } | null;

const MAX_GALLERY_IMAGES = 25;

function readStatus(formData: FormData): PostStatus {
    return formData.get('status')?.toString() === 'draft' ? 'draft' : 'publish';
}

function readFiles(formData: FormData, field: string): File[] {
    return formData
        .getAll(field)
        .filter((f): f is File => f instanceof File && f.size > 0);
}

export async function createPost(_prevState: FormState, formData: FormData): Promise<FormState> {
    const session = await getSession();
    if (!session) {
        return { error: 'Sesja wygasła. Zaloguj się ponownie.' };
    }

    const title = formData.get('title')?.toString().trim();
    if (!title) {
        return { error: 'Tytuł jest wymagany.' };
    }

    const content = formData.get('content')?.toString() ?? '';
    const status = readStatus(formData);
    const featured = formData.get('featured');
    const gallery = readFiles(formData, 'gallery').slice(0, MAX_GALLERY_IMAGES);
    const attachments = readFiles(formData, 'attachments');

    try {
        const post = await createWPPost(session, { title, content, status });

        if (featured instanceof File && featured.size > 0) {
            const media = await uploadWPMedia(session, featured, { post: post.id, title });
            await updateWPPost(session, post.id, { featured_media: media.id });
        }

        for (const file of gallery) {
            await uploadWPMedia(session, file, { post: post.id });
        }

        for (const file of attachments) {
            await uploadWPMedia(session, file, { post: post.id });
        }
    } catch (err) {
        return {
            error: err instanceof Error ? err.message : 'Nie udało się utworzyć wpisu.',
        };
    }

    revalidatePath('/dashboard');
    revalidatePath('/aktualnosci');
    redirect('/dashboard');
}

export async function updatePost(_prevState: FormState, formData: FormData): Promise<FormState> {
    const session = await getSession();
    if (!session) {
        return { error: 'Sesja wygasła. Zaloguj się ponownie.' };
    }

    const id = Number(formData.get('id'));
    const title = formData.get('title')?.toString().trim();
    if (!id || !title) {
        return { error: 'Tytuł jest wymagany.' };
    }

    const content = formData.get('content')?.toString() ?? '';
    const status = readStatus(formData);
    const featured = formData.get('featured');
    const gallery = readFiles(formData, 'gallery').slice(0, MAX_GALLERY_IMAGES);
    const attachments = readFiles(formData, 'attachments');
    const removedIds = formData
        .getAll('removedMediaIds')
        .map(v => Number(v))
        .filter(Boolean);
    const slug = formData.get('slug')?.toString() ?? '';

    try {
        await updateWPPost(session, id, { title, content, status });

        if (featured instanceof File && featured.size > 0) {
            const media = await uploadWPMedia(session, featured, { post: id, title });
            await updateWPPost(session, id, { featured_media: media.id });
        }

        for (const file of gallery) {
            await uploadWPMedia(session, file, { post: id });
        }

        for (const file of attachments) {
            await uploadWPMedia(session, file, { post: id });
        }

        for (const mediaId of removedIds) {
            await deleteWPMedia(session, mediaId);
        }
    } catch (err) {
        return {
            error: err instanceof Error ? err.message : 'Nie udało się zaktualizować wpisu.',
        };
    }

    revalidatePath('/dashboard');
    revalidatePath('/aktualnosci');
    if (slug) revalidatePath(`/aktualnosci/${slug}`);
    redirect('/dashboard');
}

export async function deletePost(formData: FormData): Promise<void> {
    const session = await getSession();
    if (!session) {
        redirect('/login');
    }

    const id = Number(formData.get('id'));
    if (!id) return;

    const { images, files } = await getPostAttachments(session, id);
    for (const media of [...images, ...files]) {
        await deleteWPMedia(session, media.id);
    }
    await deleteWPPost(session, id);

    revalidatePath('/dashboard');
    revalidatePath('/aktualnosci');
    redirect('/dashboard');
}
