import Image from 'next/image';

import { Reveal } from '../ui/animation/Reveal';

import logoPanorama from '@/assets/images/logo JS 2021.png';
import {
    FaCreditCard,
    FaEnvelope,
    FaMapMarkerAlt,
    FaPhoneAlt,
} from 'react-icons/fa';

const INFORMATION = {
    kontakt: {
        title: 'Skontaktuj się z nami',
        description:
            'Jednostka Strzelecka 2021 im. płk Leopolda Lisa-Kuli w Rzeszowie Związku Strzeleckiego „Strzelec” Józefa Piłsudskiego',
    },
    'o-nas': {
        title: 'Jednostka Strzelecka 2021',
        subtitle: 'im. płk. Leopolda Lisa-Kuli w Rzeszowie',
        description: 'Związku Strzeleckiego „Strzelec” Józefa Piłsudskiego',
    },
};

export default function SectionHeaderImg({
    page,
}: {
    page: 'o-nas' | 'kontakt';
}) {
    return (
        <section className="section pb-0">
            <div className="container-content">
                <div className="relative grid grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
                    <Reveal>
                        <p className="eyebrow">{page}</p>
                        <h1 className="mt-2 max-w-3xl text-3xl font-bold sm:text-4xl lg:text-5xl">
                            {INFORMATION[page].title}
                            {page === 'o-nas' && INFORMATION[page].subtitle && (
                                <p className="text-2xl">
                                    {INFORMATION[page].subtitle}
                                </p>
                            )}
                        </h1>
                        <p className="mt-3 max-w-2xl text-lg text-neutral-600">
                            {INFORMATION[page].description}
                        </p>
                    </Reveal>
                    <div className="relative row-start-1 lg:col-start-2 pb-8">
                        <Image
                            src={logoPanorama}
                            width={300}
                            alt="Logo JS2021 Parnorama"
                            className="mx-auto"
                        />
                    </div>
                </div>
                {page === 'kontakt' && (
                    <Reveal delay={0.1}>
                        <div className="mt-8 grid gap-4 rounded-2xl bg-neutral-50 p-6 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="flex items-start gap-3">
                                <FaMapMarkerAlt className="mt-1 shrink-0 text-accent" />
                                <span className="text-sm text-neutral-700">
                                    35-025 Rzeszów, ul. Jagiellońska 6
                                </span>
                            </div>
                            <div className="flex items-start gap-3">
                                <FaPhoneAlt className="mt-1 shrink-0 text-accent" />
                                <span className="text-sm text-neutral-700">
                                    <a href="tel:+48607995335">607 995 335</a>,{' '}
                                    <a href="tel:+48505034088">505 034 088</a>
                                </span>
                            </div>
                            <div className="flex items-start gap-3">
                                <FaCreditCard className="mt-1 shrink-0 text-accent" />
                                <span className="text-sm text-neutral-700">
                                    57 8642 1126 2012 1122 4749 0001
                                </span>
                            </div>
                            <div className="flex items-start gap-3">
                                <FaEnvelope className="mt-1 shrink-0 text-accent" />
                                <a
                                    href="mailto:strzelec.rzeszow@op.pl"
                                    className="text-sm text-neutral-700 hover:text-primary"
                                >
                                    strzelec.rzeszow@op.pl
                                </a>
                            </div>
                        </div>
                    </Reveal>
                )}
            </div>
        </section>
    );
}
