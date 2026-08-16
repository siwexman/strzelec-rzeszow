'use client';

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';

import { FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';

import { getAllPosts } from '@/lib/queries';

import NewsComponent from './NewsComponent';

export default function NewsList() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [totalPages, setTotalPages] = useState(1);

    const getPosts = useCallback(async () => {
        const data = await getAllPosts(page, 9, search);
        setTotalPages(data.totalPages || 1);
        return data;
    }, [page, search]);

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        setPage(1);
        setSearch(inputValue.trim());
    };

    const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page]);

    return (
        <div>
            <form
                onSubmit={handleSearch}
                className="flex max-w-md items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 shadow-card"
            >
                <FaSearch className="shrink-0 text-neutral-400" size={14} />
                <input
                    id="search"
                    name="search"
                    type="search"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder="Szukaj artykułów..."
                    className="w-full text-sm text-neutral-800 placeholder:text-neutral-400 outline-none focus:outline-none focus-visible:outline-none focus-within:outline-none focus:ring-0 focus-visible:ring-0"
                />
            </form>

            <NewsComponent getPosts={getPosts} />

            {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-4">
                    <button
                        type="button"
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page <= 1}
                        className="btn-outline cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <FaChevronLeft size={14} /> Poprzednia
                    </button>
                    <span className="text-sm text-neutral-500">
                        Strona {page} z {totalPages}
                    </span>
                    <button
                        type="button"
                        onClick={() =>
                            setPage(p => Math.min(totalPages, p + 1))
                        }
                        disabled={page >= totalPages}
                        className="btn-outline cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Następna <FaChevronRight size={14} />
                    </button>
                </div>
            )}
        </div>
    );
}
