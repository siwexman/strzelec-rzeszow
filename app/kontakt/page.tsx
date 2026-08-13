import type { Metadata } from 'next';
import Image from 'next/image';
import {
    FaEnvelope,
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaUniversity,
} from 'react-icons/fa';

import { SectionHeading } from '@/components/layout/SectionHeading';
import { Reveal } from '@/components/ui/animation/Reveal';
import towPrzyjaciolLogo from '@/assets/images/logos/TowPrzyjaciol.png';

export const metadata: Metadata = {
    title: 'Kontakt',
    description:
        'Dane kontaktowe Jednostki Strzeleckiej 2021 im. płk Leopolda Lisa-Kuli w Rzeszowie.',
};

const PEOPLE = [
    {
        role: 'Dowódca Jednostki Strzeleckiej 2021',
        rank: 'st. insp. ZS',
        name: 'Barbara Gajewska',
        phone: '607 995 335',
        email: 'barbragaj1@interia.pl',
    },
    {
        role: 'Zastępca Dowódcy Jednostki Strzeleckiej 2021',
        rank: 'insp. ZS',
        name: 'Michał Stocerz',
        phone: '505 034 088',
        email: 'teozy50@gmail.com',
    },
    {
        role: 'Zastępca Dowódcy Jednostki Strzeleckiej 2021',
        rank: 'insp. ZS',
        name: 'Damian Bieńko',
        phone: undefined,
        email: 'dabienko@gmail.com',
    },
    {
        role: 'Dowódca Orląt ZS Jednostki Strzeleckiej 2021',
        rank: 'insp. ZS',
        name: 'Grzegorz Gajewski',
        phone: '533 416 261',
        email: 'ggajewski53@gmail.com',
    },
    {
        role: 'Zastępca Dowódcy Orląt ZS Jednostki Strzeleckiej 2021',
        rank: 'st. sierż. ZS',
        name: 'Anna Bator',
        phone: '795 507 061',
        email: 'annbator@interia.pl',
    },
    {
        role: 'Oficer ds. Mediów Jednostki Strzeleckiej 2021',
        rank: 'insp. ZS',
        name: 'Paweł Rejman',
        phone: '509 264 673',
        email: 'boder111@interia.pl',
    },
];

export default function KontaktPage() {
    return (
        <>
            <section className="section pb-0">
                <div className="container-content">
                    <Reveal>
                        <p className="eyebrow">Kontakt</p>
                        <h1 className="mt-2 max-w-3xl text-3xl font-bold sm:text-4xl lg:text-5xl">
                            Skontaktuj się z nami
                        </h1>
                        <p className="mt-3 max-w-2xl text-lg text-neutral-600">
                            Jednostka Strzelecka 2021 im. płk Leopolda Lisa-Kuli
                            w Rzeszowie Związku Strzeleckiego „Strzelec” Józefa
                            Piłsudskiego
                        </p>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <div className="mt-8 grid gap-4 rounded-2xl bg-neutral-50 p-6 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="flex items-start gap-3">
                                <FaMapMarkerAlt className="mt-1 shrink-0 text-accent" />
                                <a
                                    href="https://www.google.com/maps/search/?api=1&query=Rzesz%C3%B3w%2C%20ul.%20Jagiello%C5%84ska%206"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-neutral-700 hover:text-primary"
                                >
                                    35-025 Rzeszów, ul. Jagiellońska 6
                                </a>
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
                            <div className="flex items-start gap-3">
                                <FaPhoneAlt className="mt-1 shrink-0 text-accent" />
                                <span className="text-sm text-neutral-700">
                                    607 995 335, 505 034 088
                                </span>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="section">
                <div className="container-content">
                    <SectionHeading
                        align="center"
                        eyebrow="Kadra dowódcza"
                        title="Dane kontaktowe"
                        description="Bezpośredni kontakt do dowództwa Jednostki Strzeleckiej 2021."
                    />
                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {PEOPLE.map((person, i) => (
                            <Reveal key={person.email} delay={(i % 3) * 0.08}>
                                <div className="card card-hover h-full p-6">
                                    <p className="badge-neutral">
                                        {person.rank}
                                    </p>
                                    <h3 className="mt-3 font-bold">
                                        {person.name}
                                    </h3>
                                    <p className="mt-1 text-sm text-neutral-600">
                                        {person.role}
                                    </p>
                                    <div className="mt-5 flex flex-col gap-2 text-sm">
                                        {person.phone && (
                                            <a
                                                href={`tel:${person.phone.replace(/\s/g, '')}`}
                                                className="flex items-center gap-2 text-neutral-700 hover:text-primary"
                                            >
                                                <FaPhoneAlt className="text-accent" />
                                                {person.phone}
                                            </a>
                                        )}
                                        <a
                                            href={`mailto:${person.email}`}
                                            className="flex items-center gap-2 text-neutral-700 hover:text-primary"
                                        >
                                            <FaEnvelope className="text-accent" />
                                            {person.email}
                                        </a>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section bg-neutral-50">
                <div className="container-content">
                    <SectionHeading
                        eyebrow="Wspieraj nas"
                        title="Stowarzyszenie wspierające"
                        description="Towarzystwo Przyjaciół Związku Strzeleckiego „Strzelec” wspiera Jednostkę Strzelecką 2021 im. płk. Leopolda Lisa-Kuli w Rzeszowie."
                    />
                    <Reveal delay={0.1}>
                        <div className="mt-10 grid gap-8 rounded-3xl bg-white p-8 shadow-card sm:p-10 lg:grid-cols-2">
                            <div>
                                <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-xl mx-auto">
                                    <Image
                                        src={towPrzyjaciolLogo}
                                        alt="Logo Towarzystwa Przyjaciół Związku Strzeleckiego „Strzelec”"
                                        className="h-full w-full object-contain"
                                    />
                                </div>
                                <h3 className="mt-5 text-lg font-bold">
                                    Towarzystwo Przyjaciół Związku Strzeleckiego
                                    „Strzelec”
                                </h3>
                                <div className="mt-4 flex flex-col gap-2 text-sm">
                                    <div className="flex items-start gap-2 text-neutral-700">
                                        <FaMapMarkerAlt className="mt-0.5 shrink-0 text-accent" />
                                        35-025 Rzeszów, ul. Jagiellońska 6
                                    </div>
                                    <a
                                        href="mailto:strzelec.rzeszow@op.pl"
                                        className="flex items-center gap-2 text-neutral-700 hover:text-primary"
                                    >
                                        <FaEnvelope className="text-accent" />
                                        strzelec.rzeszow@op.pl
                                    </a>
                                </div>
                            </div>
                            <div>
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent">
                                    <FaUniversity />
                                </div>
                                <h3 className="mt-5 text-lg font-bold">
                                    Wpłaty
                                </h3>
                                <p className="mt-2 text-sm text-neutral-600">
                                    Bank Nowy, numer konta:
                                </p>
                                <p className="mt-1 break-all font-mono text-sm font-semibold text-neutral-800">
                                    57 8642 1126 2012 1122 4749 0001
                                </p>
                                <p className="mt-4 text-sm text-neutral-600">
                                    Prezes — Marek Strączek
                                </p>
                                <div className="mt-2 flex flex-col gap-2 text-sm">
                                    <a
                                        href="tel:604594636"
                                        className="flex items-center gap-2 text-neutral-700 hover:text-primary"
                                    >
                                        <FaPhoneAlt className="text-accent" />
                                        604 594 636
                                    </a>
                                    <a
                                        href="mailto:marek.straczek@op.pl"
                                        className="flex items-center gap-2 text-neutral-700 hover:text-primary"
                                    >
                                        <FaEnvelope className="text-accent" />
                                        marek.straczek@op.pl
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
