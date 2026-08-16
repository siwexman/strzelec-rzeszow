'use client';

import { useActionState, useEffect, useState } from 'react';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';

import { RichTextEditor } from './RichTextEditor';
import type { FormState } from '@/app/dashboard/actions';
import type { GalleryImage } from '@/lib/wp-admin';

export type PostFormInitial = {
    id: number;
    slug: string;
    title: string;
    content: string;
    status: string;
    featuredImage?: { source_url: string; alt_text: string };
    gallery: GalleryImage[];
};

export function PostForm({
    action,
    initial,
    submitLabel,
}: {
    action: (prevState: FormState, formData: FormData) => Promise<FormState>;
    initial?: PostFormInitial;
    submitLabel: string;
}) {
    const [state, formAction, pending] = useActionState<FormState, FormData>(action, null);

    const [content, setContent] = useState(initial?.content ?? '');
    const [featuredPreview, setFeaturedPreview] = useState<string | null>(
        initial?.featuredImage?.source_url ?? null,
    );
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
    const [removedIds, setRemovedIds] = useState<number[]>([]);

    useEffect(() => {
        return () => {
            if (featuredPreview?.startsWith('blob:')) URL.revokeObjectURL(featuredPreview);
            galleryPreviews.forEach(url => URL.revokeObjectURL(url));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const remainingGallery = (initial?.gallery ?? []).filter(g => !removedIds.includes(g.id));

    return (
        <form action={formAction} className="space-y-6">
            {initial && <input type="hidden" name="id" value={initial.id} />}
            {initial && <input type="hidden" name="slug" value={initial.slug} />}
            {removedIds.map(id => (
                <input key={id} type="hidden" name="removedMediaIds" value={id} />
            ))}

            {state?.error && (
                <p className="rounded-lg bg-accent-50 px-4 py-3 text-sm text-accent-700">
                    {state.error}
                </p>
            )}

            <div>
                <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-neutral-700">
                    Tytuł
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    defaultValue={initial?.title}
                    className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                />
            </div>

            <div>
                <span className="mb-1.5 block text-sm font-medium text-neutral-700">Treść</span>
                <input type="hidden" name="content" value={content} />
                <RichTextEditor value={content} onChange={setContent} />
            </div>

            <div>
                <label
                    htmlFor="featured"
                    className="mb-1.5 block text-sm font-medium text-neutral-700"
                >
                    Zdjęcie główne
                </label>
                {featuredPreview && (
                    <div className="mb-2 aspect-16/9 w-full max-w-xs overflow-hidden rounded-xl bg-neutral-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={featuredPreview}
                            alt=""
                            className="h-full w-full object-cover"
                        />
                    </div>
                )}
                <input
                    id="featured"
                    name="featured"
                    type="file"
                    accept="image/*"
                    onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) setFeaturedPreview(URL.createObjectURL(file));
                    }}
                    className="block w-full text-sm text-neutral-600 file:mr-4 file:rounded-full file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-700 hover:file:bg-primary-100"
                />
            </div>

            <div>
                <span className="mb-1.5 block text-sm font-medium text-neutral-700">Galeria</span>

                {remainingGallery.length > 0 && (
                    <div className="mb-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
                        {remainingGallery.map(g => (
                            <div
                                key={g.id}
                                className="group relative aspect-square overflow-hidden rounded-xl bg-neutral-100"
                            >
                                <Image
                                    src={g.source_url}
                                    alt={g.alt_text}
                                    fill
                                    sizes="150px"
                                    className="object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => setRemovedIds(ids => [...ids, g.id])}
                                    aria-label="Usuń zdjęcie z galerii"
                                    className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer"
                                >
                                    <FaTimes size={12} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {galleryPreviews.length > 0 && (
                    <div className="mb-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
                        {galleryPreviews.map((src, i) => (
                            <div
                                key={i}
                                className="aspect-square overflow-hidden rounded-xl bg-neutral-100"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={src} alt="" className="h-full w-full object-cover" />
                            </div>
                        ))}
                    </div>
                )}

                <input
                    name="gallery"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={e => {
                        const files = Array.from(e.target.files ?? []);
                        setGalleryPreviews(files.map(f => URL.createObjectURL(f)));
                    }}
                    className="block w-full text-sm text-neutral-600 file:mr-4 file:rounded-full file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-700 hover:file:bg-primary-100"
                />
            </div>

            <div>
                <label htmlFor="status" className="mb-1.5 block text-sm font-medium text-neutral-700">
                    Status
                </label>
                <select
                    id="status"
                    name="status"
                    defaultValue={initial?.status === 'draft' ? 'draft' : 'publish'}
                    className="rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                    <option value="publish">Opublikowany</option>
                    <option value="draft">Szkic</option>
                </select>
            </div>

            <button type="submit" disabled={pending} className="btn-primary disabled:opacity-60">
                {pending ? 'Zapisywanie…' : submitLabel}
            </button>
        </form>
    );
}
