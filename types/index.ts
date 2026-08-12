export interface NewsPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string | null;
    featured_image_url: string | null;
    published_at: string;
}

export interface NewsPostShort {
    id: string;
    title: string;
    description: string;
    slug: string;
    image: string;
    publishedAt: string;
}
