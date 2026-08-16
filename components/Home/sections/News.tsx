// 'use client';

import Link from 'next/link';

import { FaArrowRight } from 'react-icons/fa';

import { SectionHeading } from '@/components/layout/SectionHeading';
import NewsComponent from '@/components/News/NewsComponent';
import { get3Posts } from '@/lib/queries';

export default function News() {
    return (
        <section className="section">
            <div className="container-content">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <SectionHeading
                        eyebrow="Aktualności"
                        title="Najnowsze wiadomości"
                    />
                </div>
                <NewsComponent getPosts={get3Posts} />
                <div className="flex justify-center pt-4">
                    <Link href="/aktualnosci" className="btn-ghost">
                        Wszystkie <FaArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
