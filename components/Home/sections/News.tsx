import Link from 'next/link';

import { FaArrowRight } from 'react-icons/fa';

import { SectionHeading } from '@/components/layout/SectionHeading';
import NewsComponent from '@/components/News/NewsComponent';

export default function News() {
    return (
        <section className="section">
            <div className="container-content">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <SectionHeading
                        eyebrow="Aktualności"
                        title="Najnowsze wiadomości"
                    />
                    <Link href="/aktualnosci" className="btn-ghost">
                        Wszystkie <FaArrowRight size={16} />
                    </Link>
                </div>
                <NewsComponent />
            </div>
        </section>
    );
}
