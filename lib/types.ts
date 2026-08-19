export type Post = {
    id: number;
    title: {
        rendered: string;
    };
    slug: string;
    date: string;
    modified: string;
    content: {
        rendered: string;
    };
    type: string;
    status: string;
    excerpt: {
        rendered: string;
    };
    author: number;
    categories: number[];
    featured_media: number;
    _embedded?: {
        'wp:featuredmedia'?: WPImage[];
    };
    images: WPImage[];
    attachments?: WPAttachment[];
};

export interface PostsReturned {
    posts: Post[];
    totalPages: number;
}

export interface WPImage {
    source_url: string;
    alt_text: string;
}

/** Non-image media attachment (PDF, doc, etc.) attached to a post */
export interface WPAttachment {
    id: number;
    source_url: string;
    filename: string;
    mime_type: string;
    title: string;
}

/** WordPress REST API — media attachment (wp/v2/media) */

export interface WPRendered {
    rendered: string;
}

export type WPStatus = 'inherit' | 'publish' | 'draft' | 'private' | 'trash';
export type WPCommentStatus = 'open' | 'closed';

export interface WPMediaSize {
    file: string;
    width: number;
    height: number;
    /** Missing on the `full` size */
    filesize?: number;
    mime_type: string;
    source_url: string;
}

export interface WPImageMeta {
    aperture: string;
    credit: string;
    camera: string;
    caption: string;
    created_timestamp: string;
    copyright: string;
    focal_length: string;
    iso: string;
    shutter_speed: string;
    title: string;
    orientation: string;
    keywords: string[];
    alt?: string;
}

export type WPMediaSizeName =
    | 'thumbnail'
    | 'medium'
    | 'medium_large'
    | 'large'
    | '1536x1536'
    | '2048x2048'
    | 'full';

export interface WPMediaDetails {
    width: number;
    height: number;
    file: string;
    filesize?: number;
    sizes: Partial<Record<WPMediaSizeName, WPMediaSize>> &
        Record<string, WPMediaSize | undefined>;
    image_meta: WPImageMeta;
}

export interface WPLink {
    href: string;
    embeddable?: boolean;
    templated?: boolean;
    name?: string;
    post_type?: string;
    id?: number;
    targetHints?: {
        allow: string[];
    };
}

export interface WPMediaLinks {
    self: WPLink[];
    collection: WPLink[];
    about: WPLink[];
    author: WPLink[];
    replies: WPLink[];
    'wp:attached-to'?: WPLink[];
    curies: WPLink[];
    [rel: string]: WPLink[] | undefined;
}

export interface WPMedia {
    id: number;
    date: string;
    date_gmt: string;
    guid: WPRendered;
    modified: string;
    modified_gmt: string;
    slug: string;
    status: WPStatus;
    type: 'attachment';
    link: string;
    title: WPRendered;
    author: number;
    featured_media: number;
    comment_status: WPCommentStatus;
    ping_status: WPCommentStatus;
    template: string;
    /** WP returns `[]` when there is no meta, otherwise an object */
    meta: Record<string, unknown> | never[];
    class_list: string[];
    description: WPRendered;
    caption: WPRendered;
    alt_text: string;
    media_type: 'image' | 'file';
    mime_type: string;
    media_details: WPMediaDetails;
    /** Parent post ID, or 0 when unattached */
    post: number | null;
    source_url: string;
    filename?: string;
    filesize?: number;
    _links: WPMediaLinks;
}
