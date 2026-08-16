'use client';

import { useCallback, useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

import { WPImage } from '@/lib/types';

export function Gallery({ images }: { images: WPImage[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const close = useCallback(() => setOpenIndex(null), []);

    const showPrev = useCallback(() => {
        setOpenIndex(i =>
            i === null ? i : (i - 1 + images.length) % images.length,
        );
    }, [images.length]);

    const showNext = useCallback(() => {
        setOpenIndex(i => (i === null ? i : (i + 1) % images.length));
    }, [images.length]);

    useEffect(() => {
        if (openIndex === null) return;

        document.body.style.overflow = 'hidden';

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        };

        window.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [openIndex, close, showPrev, showNext]);

    if (!images.length) return null;

    const current = openIndex !== null ? images[openIndex] : null;

    return (
        <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {images.map((image, i) => (
                    <button
                        key={image.source_url + i}
                        type="button"
                        onClick={() => setOpenIndex(i)}
                        className="group aspect-square overflow-hidden rounded-xl bg-neutral-100 cursor-pointer"
                    >
                        <Image
                            src={image.source_url}
                            alt={image.alt_text}
                            width={300}
                            height={300}
                            sizes="25vw"
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </button>
                ))}
            </div>

            <AnimatePresence>
                {current && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={close}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                    >
                        <button
                            type="button"
                            onClick={close}
                            aria-label="Zamknij"
                            className="absolute right-4 top-4 text-white/80 hover:text-white cursor-pointer"
                        >
                            <FaTimes size={28} />
                        </button>

                        {images.length > 1 && (
                            <button
                                type="button"
                                onClick={e => {
                                    e.stopPropagation();
                                    showPrev();
                                }}
                                aria-label="Poprzednie zdjęcie"
                                className="absolute left-2 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white sm:left-4 cursor-pointer"
                            >
                                <FaChevronLeft size={28} />
                            </button>
                        )}

                        <div
                            className="relative h-full w-full max-w-4xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <Image
                                src={current.source_url}
                                alt={current.alt_text}
                                fill
                                sizes="90vw"
                                className="object-contain"
                            />
                        </div>

                        {images.length > 1 && (
                            <button
                                type="button"
                                onClick={e => {
                                    e.stopPropagation();
                                    showNext();
                                }}
                                aria-label="Następne zdjęcie"
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white sm:right-4 cursor-pointer"
                            >
                                <FaChevronRight size={28} />
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
