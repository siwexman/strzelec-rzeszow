import Image from 'next/image';
import Link from 'next/link';

import logo from '@/assets/images/logo JS 2021.png';

export function Logo({ className = '' }: { className?: string }) {
    return (
        <Link
            href="/"
            className={`flex items-center gap-2.5 ${className}`}
            aria-label="Strzelec Rzeszów — strona główna"
        >
            {/* <span className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-neutral-200 shadow-sm">
                <span className="block h-full w-full">
                    <span className="block h-1/2 w-full bg-white" />
                    <span className="block h-1/2 w-full bg-accent" />
                </span>
            </span> */}

            <div className="h-12 w-16">
                <Image
                    src={logo}
                    alt="Logo JS2021"
                    className="object-cover rounded-lg"
                />
            </div>
            <span className="flex flex-col leading-none">
                <span className="font-display text-base font-bold text-neutral-900">
                    Strzelec
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-primary">
                    Rzeszów
                </span>
            </span>
        </Link>
    );
}
