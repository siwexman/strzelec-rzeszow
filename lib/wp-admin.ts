'use server';

import { Post, WPAttachment, WPMedia } from './types';

const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

export type PostStatus = 'publish' | 'draft';

export type WPCredentials = {
    username: string;
    appPassword: string;
};

export type GalleryImage = {
    id: number;
    source_url: string;
    alt_text: string;
};

function authHeader(creds: WPCredentials): string {
    return (
        'Basic ' +
        Buffer.from(`${creds.username}:${creds.appPassword}`).toString('base64')
    );
}

async function wpFetch(
    creds: WPCredentials,
    path: string,
    init: RequestInit = {},
): Promise<Response> {
    const res = await fetch(`${baseUrl}${path}`, {
        ...init,
        cache: 'no-store',
        headers: {
            ...init.headers,
            Authorization: authHeader(creds),
        },
    });

    if (!res.ok) {
        const body = await res.text();
        throw new Error(
            `WordPress API error (${res.status}) on ${path}: ${body}`,
        );
    }

    return res;
}

export async function authenticateWithPassword(
    username: string,
    password: string,
): Promise<{ appPassword: string; displayName: string } | null> {
    const res = await fetch(`${baseUrl}/wp-json/dashboard-auth/v1/login`, {
        method: 'POST',
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    if (!res.ok) return null;

    const data = await res.json();
    return {
        appPassword: data.application_password,
        displayName: data.display_name,
    };
}

export async function getPostById(
    creds: WPCredentials,
    id: number,
): Promise<Post | null> {
    const res = await fetch(`${baseUrl}/wp-json/wp/v2/posts/${id}?_embed`, {
        cache: 'no-store',
        headers: { Authorization: authHeader(creds) },
    });
    if (res.status === 404) return null;
    if (!res.ok)
        throw new Error(
            `WordPress API error (${res.status}) fetching post ${id}`,
        );

    return res.json();
}

export async function getPostAttachments(
    creds: WPCredentials = { username: '', appPassword: '' },
    postId: number,
): Promise<{ images: GalleryImage[]; files: WPAttachment[] }> {
    const res = await wpFetch(
        creds,
        `/wp-json/wp/v2/media?parent=${postId}&per_page=100`,
    );
    const attachments: WPMedia[] = await res.json();

    const images = attachments
        .filter(a => a.media_type === 'image')
        .map(a => ({
            id: a.id,
            source_url: a.source_url,
            alt_text: a.alt_text || a.title.rendered,
        }));

    const files = attachments
        .filter(a => a.media_type !== 'image')
        .map(a => ({
            id: a.id,
            source_url: a.source_url,
            filename: a.title.rendered,
            mime_type: a.mime_type,
            title: a.title.rendered,
        }));

    return { images, files };
}

export async function createWPPost(
    creds: WPCredentials,
    data: {
        title: string;
        content: string;
        status: PostStatus;
    },
): Promise<Post> {
    const res = await wpFetch(creds, '/wp-json/wp/v2/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function updateWPPost(
    creds: WPCredentials,
    id: number,
    data: Partial<{
        title: string;
        content: string;
        status: PostStatus;
        featured_media: number;
    }>,
): Promise<Post> {
    const res = await wpFetch(creds, `/wp-json/wp/v2/posts/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function deleteWPPost(
    creds: WPCredentials,
    id: number,
): Promise<void> {
    await wpFetch(creds, `/wp-json/wp/v2/posts/${id}?force=true`, {
        method: 'DELETE',
    });
}

export async function uploadWPMedia(
    creds: WPCredentials,
    file: File,
    meta: { post?: number; title?: string } = {},
): Promise<WPMedia> {
    const form = new FormData();
    form.append('file', file, file.name);
    if (meta.post) form.append('post', String(meta.post));
    if (meta.title) form.append('title', meta.title);

    const res = await wpFetch(creds, '/wp-json/wp/v2/media', {
        method: 'POST',
        body: form,
    });
    return res.json();
}

export async function deleteWPMedia(
    creds: WPCredentials,
    id: number,
): Promise<void> {
    await wpFetch(creds, `/wp-json/wp/v2/media/${id}?force=true`, {
        method: 'DELETE',
    });
}
