'use client';

import { useActionState, useEffect, useState } from 'react';
import Image from 'next/image';
import { FaFile, FaTimes } from 'react-icons/fa';

import { RichTextEditor } from './RichTextEditor';
import type { FormState } from '@/app/dashboard/actions';
import type { GalleryImage } from '@/lib/wp-admin';
import type { WPAttachment } from '@/lib/types';
import { compressImage, compressImages } from '@/utils/compressImage';

const MAX_GALLERY_IMAGES = 25;

export type PostFormInitial = {
    id: number;
    slug: string;
    title: string;
    content: string;
    status: string;
    featuredImage?: { source_url: string; alt_text: string };
    gallery: GalleryImage[];
    attachments: WPAttachment[];
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
    const [state, formAction, pending] = useActionState<FormState, FormData>(
        action,
        null,
    );

    const [content, setContent] = useState(initial?.content ?? '');
    const [featuredPreview, setFeaturedPreview] = useState<string | null>(
        initial?.featuredImage?.source_url ?? null,
    );
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
    const [galleryError, setGalleryError] = useState<string | null>(null);
    const [processingImages, setProcessingImages] = useState(false);
    const [attachmentNames, setAttachmentNames] = useState<string[]>([]);
    const [removedIds, setRemovedIds] = useState<number[]>([]);

    useEffect(() => {
        return () => {
            if (featuredPreview?.startsWith('blob:'))
                URL.revokeObjectURL(featuredPreview);
            galleryPreviews.forEach(url => URL.revokeObjectURL(url));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const remainingGallery = (initial?.gallery ?? []).filter(
        g => !removedIds.includes(g.id),
    );
    const remainingAttachments = (initial?.attachments ?? []).filter(
        a => !removedIds.includes(a.id),
    );

    return (
        <form action={formAction} className="space-y-6">
            {initial && <input type="hidden" name="id" value={initial.id} />}
            {initial && (
                <input type="hidden" name="slug" value={initial.slug} />
            )}
            {removedIds.map(id => (
                <input
                    key={id}
                    type="hidden"
                    name="removedMediaIds"
                    value={id}
                />
            ))}

            {state?.error && (
                <p className="rounded-lg bg-accent-50 px-4 py-3 text-sm text-accent-700">
                    {state.error}
                </p>
            )}

            <div>
                <label
                    htmlFor="title"
                    className="mb-1.5 block text-sm font-medium text-neutral-700"
                >
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
                <span className="mb-1.5 block text-sm font-medium text-neutral-700">
                    Treść
                </span>
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
                    <div className="mb-2 aspect-video w-full max-w-xs overflow-hidden rounded-xl bg-neutral-100 relative">
                        <Image
                            src={featuredPreview}
                            alt=""
                            fill
                            className="h-full w-full object-cover"
                        />
                    </div>
                )}
                <input
                    id="featured"
                    name="featured"
                    type="file"
                    accept="image/*"
                    disabled={processingImages}
                    onChange={async e => {
                        const input = e.target;
                        const file = input.files?.[0];
                        if (!file) return;

                        setProcessingImages(true);
                        const compressed = await compressImage(file);
                        const dt = new DataTransfer();
                        dt.items.add(compressed);
                        input.files = dt.files;

                        setFeaturedPreview(URL.createObjectURL(compressed));
                        setProcessingImages(false);
                    }}
                    className="block w-full text-sm text-neutral-600 file:mr-4 file:rounded-full file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-700 hover:file:bg-primary-100"
                />
            </div>

            <div>
                <span className="mb-1.5 block text-sm font-medium text-neutral-700">
                    Galeria{' '}
                    <span className="font-normal text-neutral-400">
                        (maks. {MAX_GALLERY_IMAGES} zdjęć)
                    </span>
                </span>

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
                                    onClick={() =>
                                        setRemovedIds(ids => [...ids, g.id])
                                    }
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
                                className="aspect-square overflow-hidden rounded-xl bg-neutral-100 relative"
                            >
                                <Image
                                    src={src}
                                    fill
                                    alt=""
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                )}

                <input
                    name="gallery"
                    type="file"
                    accept="image/*"
                    multiple
                    disabled={processingImages}
                    onChange={async e => {
                        const input = e.target;
                        const files = Array.from(input.files ?? []);
                        const availableSlots = Math.max(
                            MAX_GALLERY_IMAGES - remainingGallery.length,
                            0,
                        );
                        const selected = files.slice(0, availableSlots);

                        setGalleryError(
                            files.length > availableSlots
                                ? `Można dodać maksymalnie ${MAX_GALLERY_IMAGES} zdjęć w galerii. Dodano pierwsze ${selected.length}.`
                                : null,
                        );

                        setProcessingImages(true);
                        const compressed = await compressImages(selected);
                        const dt = new DataTransfer();
                        compressed.forEach(f => dt.items.add(f));
                        input.files = dt.files;

                        setGalleryPreviews(
                            compressed.map(f => URL.createObjectURL(f)),
                        );
                        setProcessingImages(false);
                    }}
                    className="block w-full text-sm text-neutral-600 file:mr-4 file:rounded-full file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-700 hover:file:bg-primary-100"
                />
                {galleryError && (
                    <p className="mt-1.5 text-sm text-accent-700">
                        {galleryError}
                    </p>
                )}
            </div>

            <div>
                <span className="mb-1.5 block text-sm font-medium text-neutral-700">
                    Załączniki
                </span>

                {remainingAttachments.length > 0 && (
                    <ul className="mb-3 space-y-2">
                        {remainingAttachments.map(a => (
                            <li
                                key={a.id}
                                className="flex items-center justify-between gap-2 rounded-xl border border-neutral-200 px-3 py-2 text-sm"
                            >
                                <span className="flex min-w-0 items-center gap-2 text-neutral-700">
                                    <FaFile size={14} className="shrink-0 text-neutral-400" />
                                    <span className="truncate">{a.filename}</span>
                                </span>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setRemovedIds(ids => [...ids, a.id])
                                    }
                                    aria-label="Usuń załącznik"
                                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 hover:bg-accent-50 hover:text-accent-700 cursor-pointer"
                                >
                                    <FaTimes size={12} />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}

                {attachmentNames.length > 0 && (
                    <ul className="mb-3 space-y-2">
                        {attachmentNames.map((name, i) => (
                            <li
                                key={i}
                                className="flex items-center gap-2 rounded-xl border border-dashed border-neutral-200 px-3 py-2 text-sm text-neutral-600"
                            >
                                <FaFile size={14} className="shrink-0 text-neutral-400" />
                                <span className="truncate">{name}</span>
                            </li>
                        ))}
                    </ul>
                )}

                <input
                    name="attachments"
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                    multiple
                    onChange={e => {
                        const files = Array.from(e.target.files ?? []);
                        setAttachmentNames(files.map(f => f.name));
                    }}
                    className="block w-full text-sm text-neutral-600 file:mr-4 file:rounded-full file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-700 hover:file:bg-primary-100"
                />
            </div>

            {/* <div>
                <label
                    htmlFor="status"
                    className="mb-1.5 block text-sm font-medium text-neutral-700"
                >
                    Status
                </label>
                <select
                    id="status"
                    name="status"
                    defaultValue={
                        initial?.status === 'draft' ? 'draft' : 'publish'
                    }
                    className="rounded-xl border border-neutral-200 px-4 py-2.5 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                    <option value="publish">Opublikowany</option>
                    <option value="draft">Szkic</option>
                </select>
            </div> */}

            <button
                type="submit"
                disabled={pending || processingImages}
                className="btn-primary disabled:opacity-60"
            >
                {processingImages
                    ? 'Przetwarzanie zdjęć…'
                    : pending
                      ? 'Zapisywanie…'
                      : submitLabel}
            </button>
        </form>
    );
}
