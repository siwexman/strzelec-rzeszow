'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

import { Logo } from '@/components/ui/Logo';
import SocialIcons from '../ui/SocialIcons';

interface NavItem {
    label: string;
    href: string;
}

const NAV: NavItem[] = [
    { label: 'Aktualności', href: '/aktualnosci' },
    { label: 'O nas', href: '/o-nas' },
    { label: 'Kontakt', href: '/kontakt' },
];

export function Header() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const [prevPathname, setPrevPathname] = useState(pathname);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    if (pathname !== prevPathname) {
        setPrevPathname(pathname);
        setOpen(false);
    }

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;

        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;
            if (
                menuRef.current?.contains(target) ||
                buttonRef.current?.contains(target)
            ) {
                return;
            }
            setOpen(false);
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    return (
        <header className="sticky top-0 z-50 transition-all duration-300 bg-white/90 backdrop-blur-md shadow-sm">
            <div className="container-content flex h-16 items-center justify-between gap-4 lg:h-20">
                <Logo />

                <nav
                    className="hidden items-center gap-1 lg:flex"
                    aria-label="Główna nawigacja"
                >
                    {NAV.map(item => {
                        const active =
                            pathname === item.href ||
                            pathname.startsWith(item.href + '/');
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                                    active
                                        ? 'text-primary'
                                        : 'text-neutral-700 hover:text-primary'
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                    <SocialIcons isHeader />
                </nav>

                <div className="flex lg:hidden items-center gap-2">
                    <button
                        ref={buttonRef}
                        type="button"
                        onClick={() => setOpen(v => !v)}
                        className="inline-flex rounded-full p-2.5 text-neutral-800 hover:bg-neutral-100 lg:hidden"
                        aria-label="Menu"
                        aria-expanded={open}
                    >
                        {open ? <CloseIcon /> : <MenuIcon />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        ref={menuRef}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden"
                    >
                        <div className="container-content pb-6 pt-2 absolute">
                            <nav
                                className="flex flex-col gap-1 rounded-2xl border border-neutral-100 bg-white p-3 shadow-card"
                                aria-label="Nawigacja mobilna"
                            >
                                {NAV.map(item => {
                                    const active =
                                        pathname === item.href ||
                                        pathname.startsWith(item.href + '/');
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`rounded-xl px-4 py-3 text-base font-medium ${
                                                active
                                                    ? 'bg-primary-50 text-primary'
                                                    : 'text-neutral-800 hover:bg-neutral-50'
                                            }`}
                                        >
                                            {item.label}
                                        </Link>
                                    );
                                })}
                                <div className="flex justify-center">
                                    <SocialIcons isHeader />
                                </div>
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

function MenuIcon() {
    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        >
            <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
    );
}
function CloseIcon() {
    return (
        <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        >
            <path d="M6 6l12 12M18 6L6 18" />
        </svg>
    );
}
