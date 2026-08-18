import Image from 'next/image';
import type { Metadata } from 'next';
import {
    FaClock,
    FaEnvelope,
    FaFlag,
    FaHandHoldingHeart,
    FaPhoneAlt,
    FaQuoteLeft,
    FaUserGraduate,
    FaUsers,
} from 'react-icons/fa';

import { SectionHeading } from '@/components/layout/SectionHeading';
import { Reveal } from '@/components/ui/animation/Reveal';
import SectionHeaderImg from '@/components/layout/SectionHeaderImg';

import logoJS from '@/assets/images/logos/Logo ZS Strzelec JP Komendant Główny.png';

export const metadata: Metadata = {
    title: 'O nas',
    description:
        'Jednostka Strzelecka 2021 im. płk Leopolda Lisa-Kuli w Rzeszowie — Związek Strzelecki „Strzelec” Józefa Piłsudskiego.',
};

const GROUPS = [
    {
        icon: <FaUsers />,
        title: 'Strzelcy',
        description:
            'Strzelcy to młodzież uczęszczająca do szkół średnich. Zajęcia poddane są swoistemu koszarowemu drylowi — karność i dyscyplinę kształtuje musztra prowadzona zgodnie z Regulaminem Musztry Sił Zbrojnych RP. Strzelcy poznają budowę broni strzeleckiej i doskonalą umiejętności celnego strzelania — początkowo z broni treningowej, a z czasem z broni bojowej. Sprawność fizyczna doskonalona jest podczas treningów sportowych, rajdów oraz marszów. Wszyscy strzelcy objęci są szkoleniem z zakresu udzielania pierwszej pomocy, a całość uzupełniają zajęcia w terenie — marsze na orientację oraz podstawy taktyki.',
        schedule: 'Wtorki, 17:00–19:00',
        phones: ['607 995 335', '505 034 088'],
    },
    {
        icon: <FaUserGraduate />,
        title: '„Orlęta” Związku Strzeleckiego',
        description:
            '„Orlęta” Związku Strzeleckiego to dzieci od IV do VI klasy szkoły podstawowej, uczęszczające na zbiórki Orląt ZS, prowadzone przez kadrę instruktorską (posiadającą odpowiednie uprawnienia) oraz pomagających jej Strzelców. Orlęta na zbiórkach uczą się nowych umiejętności, poznają świat i dowiadują się, jak współpracować z rówieśnikami w zespole. Zajęcia są dostosowane do wieku dzieci i obejmują tematykę pierwszej pomocy, orientowania się w terenie, musztry wojskowej, gier i zabaw terenowych, wycieczek i rajdów turystycznych oraz spotkań z historią.',
        schedule: 'Czwartki, 17:30–19:00',
        phones: ['533 416 261', '795 507 061'],
    },
];

const STRUCTURE = [
    { role: 'Dowódca JS 2021', rank: 'st. insp. ZS', name: 'Barbara Gajewska' },
    {
        role: 'Zastępca Dowódcy JS 2021',
        rank: 'insp. ZS',
        name: 'Michał Stocerz',
    },
    {
        role: 'Zastępca Dowódcy JS 2021',
        rank: 'insp. ZS',
        name: 'Damian Bieńko',
    },
    {
        role: 'Dowódca Orląt ZS JS 2021',
        rank: 'insp. ZS',
        name: 'Grzegorz Gajewski',
    },
    {
        role: 'Zastępca Dowódcy Orląt ZS JS 2021',
        rank: 'st. sierż. ZS',
        name: 'Anna Bator',
    },
    {
        role: 'Oficer JS 2021 ds. Mediów',
        rank: 'insp. ZS',
        name: 'Paweł Rejman',
    },
    {
        role: 'Kapelan ZS JS 2021',
        rank: 'mł. insp. ZS',
        name: 'ks. Stanisław Szcząchor',
    },
    {
        role: 'Kapelan ZS JS 2021 ds. Orląt ZS',
        rank: 'mł. insp. ZS',
        name: 'ks. Bogdan Tęcza',
    },
    {
        role: 'Dowódca Pododdziału ZS w Kolbuszowej',
        rank: 'st. insp. ZS',
        name: 'Piotr Panek',
    },
    {
        role: 'Dowódca Pododdziału Orląt ZS w Tyczynie',
        rank: 'mł. insp. ZS',
        name: 'Jacek Surówka',
    },
    {
        role: 'Dowódca Pododdziału Orląt ZS przy SP nr 16 w Rzeszowie',
        rank: 'chor. ZS',
        name: 'Natalia Rokosz',
    },
    {
        role: 'Dowódca Pododdziału ZS przy Szkole Podstawowej w Głogowie Młp.',
        name: 'Anna Łącka',
    },
    {
        role: 'Dowódca Pododdziału ZS i Orląt ZS przy  Zespole Szkół w Jasionce',
        name: 'Paweł Wiktor',
    },
    {
        role: 'Szef Logistyki JS 2021',
        rank: 'st. chor. ZS',
        name: 'Jerzy Gajewski',
    },
    {
        role: 'Szef Zabezpieczenia Medycznego JS 2021',
        rank: 'sierż. ZS',
        name: 'Barbara Furtek-Leśniak',
    },
    {
        role: 'Magazynier JS 2021',
        rank: 'sierż. ZS',
        name: 'Hubert Biały',
    },
];

const LEADERSHIP = [
    {
        role: 'Komendant Główny Związku Strzeleckiego „Strzelec” Józefa Piłsudskiego',
        rank: 'bryg. ZS',
        name: 'Marek Matuła',
        email: 'marekmatula4@gmail.com',
        phone: '794 403 179',
    },
    {
        role: 'Dowódca Południowo-Wschodniego Okręgu Związku Strzeleckiego „Strzelec” Józefa Piłsudskiego',
        rank: 'st. insp. ZS',
        name: 'Marek Strączek',
        email: 'marek.straczek@op.pl',
        phone: '604 594 636',
    },
];

export default function About() {
    return (
        <>
            <SectionHeaderImg page="o-nas" />

            <section className="section">
                <div className="container-content">
                    <Reveal>
                        <div className="rounded-3xl bg-accent px-4 py-6 text-center text-white sm:flex-row sm:items-center sm:px-12">
                            <div className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                                <FaHandHoldingHeart size={36} />
                            </div>
                            <div className="pt-4">
                                <h2 className="text-xl font-bold sm:text-2xl">
                                    Podaruj młodzieży strzeleckiej i orlętom
                                    1,5% podatku
                                </h2>
                                <p className="mt-2 text-lg text-white/90">
                                    Wpisując w formularzu PIT numer KRS{' '}
                                </p>
                                <p className="font-semibold text-4xl pt-1 text-center">
                                    0000283993
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="section pt-0">
                <div className="container-content">
                    <SectionHeading
                        eyebrow="Nasza misja"
                        title="Patriotyczne wychowanie młodzieży"
                        description="Związek Strzelecki „Strzelec” Józefa Piłsudskiego jest patriotycznym stowarzyszeniem młodzieży, kontynuującym program i metody działania „Strzelca” istniejącego w Polsce w okresie międzywojennym. Zadaniem „Strzelca” jest rozbudzanie i hartowanie wśród młodzieży ducha narodowego, karności, dzielności moralnej i fizycznej oraz szerzenie wiedzy wojskowej."
                    />
                    <Reveal delay={0.1}>
                        <blockquote className="mt-10 max-w-3xl rounded-2xl border-l-4 border-accent bg-neutral-50 p-6 sm:p-8">
                            <FaQuoteLeft className="text-accent" size={20} />
                            <p className="mt-3 text-lg italic text-neutral-700">
                                …najważniejsze jest wychowanie w duchu
                                patriotycznym, kształtowanie osobowości młodych
                                ludzi poprzez dyscyplinę prowojskową,
                                organizacja wolnego czasu tak, by młodzież mogła
                                się spełniać…
                            </p>
                        </blockquote>
                    </Reveal>
                </div>
            </section>

            <section className="section bg-neutral-50">
                <div className="container-content">
                    <SectionHeading
                        align="center"
                        eyebrow="Kto może dołączyć"
                        title="Strzelcy i Orlęta"
                        description="Dwie grupy wiekowe, jeden cel — kształtowanie odpowiedzialnych, sprawnych i patriotycznie wychowanych młodych ludzi."
                    />
                    <div className="mt-12 grid gap-6 lg:grid-cols-2">
                        {GROUPS.map((group, i) => (
                            <Reveal key={group.title} delay={i * 0.1}>
                                <div className="card h-full p-7 sm:p-8">
                                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent">
                                        {group.icon}
                                    </div>
                                    <h3 className="mt-5 text-xl font-bold">
                                        {group.title}
                                    </h3>
                                    <p className="mt-3 text-neutral-600">
                                        {group.description}
                                    </p>
                                    <div className="mt-6 flex flex-wrap gap-3">
                                        <span className="badge-primary gap-1.5">
                                            <FaClock size={12} />
                                            {group.schedule}
                                        </span>
                                        <span className="badge-neutral gap-1.5">
                                            <FaPhoneAlt size={12} />
                                            {group.phones.join(', ')}
                                        </span>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container-content">
                    <SectionHeading
                        align="center"
                        eyebrow="Kadra"
                        title="Struktura Jednostki Strzeleckiej 2021"
                        description="im. płk Leopolda Lisa-Kuli w Rzeszowie"
                    />
                    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {STRUCTURE.map((person, i) => (
                            <Reveal key={person.name} delay={(i % 3) * 0.08}>
                                <div className="card card-hover h-full p-6">
                                    {person.rank && (
                                        <p className="badge-neutral">
                                            {person.rank}
                                        </p>
                                    )}
                                    <h3 className="mt-3 font-bold">
                                        {person.name}
                                    </h3>
                                    <p className="mt-1 text-sm text-neutral-600">
                                        {person.role}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section bg-neutral-50">
                <div className="container-content">
                    <div className="flex justify-center pb-4">
                        <Image
                            src={logoJS}
                            alt="Logo JS2021"
                            width={150}
                            height={150}
                        />
                    </div>
                    <SectionHeading
                        align="center"
                        title="Komenda Główna i Okręg"
                        description="Związek Strzelecki „Strzelec” Józefa Piłsudskiego — struktury nadrzędne."
                    />
                    <div className="mt-12 grid gap-6 lg:grid-cols-2">
                        {LEADERSHIP.map((person, i) => (
                            <Reveal key={person.name} delay={i * 0.1}>
                                <div className="card h-full p-7 sm:p-8">
                                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary">
                                        <FaFlag />
                                    </div>
                                    <h3 className="mt-5 text-lg font-bold">
                                        {person.name}
                                    </h3>
                                    <p className="mt-1 text-sm font-semibold text-neutral-500">
                                        {person.rank}
                                    </p>
                                    <p className="mt-3 text-neutral-600">
                                        {person.role}
                                    </p>
                                    <div className="mt-5 flex flex-col gap-2 text-sm">
                                        <a
                                            href={`mailto:${person.email}`}
                                            className="flex items-center gap-2 text-neutral-700 hover:text-primary"
                                        >
                                            <FaEnvelope className="text-accent" />
                                            {person.email}
                                        </a>
                                        <a
                                            href={`tel:${person.phone.replace(/\s/g, '')}`}
                                            className="flex items-center gap-2 text-neutral-700 hover:text-primary"
                                        >
                                            <FaPhoneAlt className="text-accent" />
                                            {person.phone}
                                        </a>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
