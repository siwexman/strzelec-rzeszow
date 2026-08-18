'use server';

import { Post, PostsReturned, WPImage, WPMedia } from './types';

const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
const revalidateTime = 600; // 10min in  seconds

export async function getAllPosts(
    pageNumber: number = 1,
    perPage: number = 9,
    searchTerm: string = '',
    auth?: string,
): Promise<PostsReturned> {
    const params = new URLSearchParams({
        per_page: perPage.toString(),
        page: pageNumber.toString(),
        search: searchTerm,
    });

    // params na koniec dodać '?'
    const res = await fetch(
        `${baseUrl}/wp-json/wp/v2/posts?_embed&${params.toString()}`,
        {
            ...(auth && {
                headers: {
                    Authorization: `Basic ${auth}`,
                },
            }),
            next: {
                revalidate: revalidateTime,
            },
        },
    );
    const posts: Post[] = await res.json();

    for (const post of posts) {
        if (!(post._embedded && post._embedded['wp:featuredmedia'])) {
            const image = await getImages(post.id, post.slug, true);
            post.images = image;
        }
    }

    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') ?? '1');

    return { posts, totalPages };
}

export async function get3Posts() {
    const data = await getAllPosts(1, 3);
    return data;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const res = await fetch(
        `${baseUrl}/wp-json/wp/v2/posts?slug=${slug}&_embed`,
        {
            next: {
                revalidate: revalidateTime,
            },
        },
    );
    const posts: Post[] = await res.json();

    if (!posts.length) {
        return null;
    }

    const post = posts[0];
    post.images = await getImages(post.id, post.slug, false);

    return post;
}

async function getImages(
    postId: number,
    postSlug: string,
    isOne: boolean = false,
) {
    const res = await fetch(`${baseUrl}/wp-json/wp/v2/media?parent=${postId}`, {
        next: {
            revalidate: revalidateTime,
        },
    });

    const attachments: WPMedia[] = await res.json();

    if (isOne) {
        const image: WPImage = {
            source_url: attachments[attachments.length - 1].source_url,
            alt_text: postSlug,
        };
        return [image];
    } else {
        const images: WPImage[] = attachments.map((a, i) => ({
            source_url: a.source_url,
            alt_text: postSlug + `-${i}`,
        }));
        return images;
    }
}
