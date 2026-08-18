import Link from 'next/link';
import Image from 'next/image';
import { FaEnvelope, FaPhone, FaMapPin } from 'react-icons/fa';

import logo from '@/assets/images/logo JS 2021.png';
import SocialIcons from '../ui/SocialIcons';

export function Footer() {
    return (
        <footer className="bg-primary-900 text-neutral-200">
            <div className="container-content py-14">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                    <div>
                        <div className="flex items-center gap-2.5">
                            <div className="h-16 w-20">
                                <Image
                                    src={logo}
                                    alt="Logo JS2021"
                                    className="object-cover rounded"
                                />
                            </div>
                            <span className="font-display text-lg font-bold text-white">
                                Strzelec Rzeszów
                            </span>
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-neutral-300">
                            {
                                'Organizacja patriotyczna, paramilitarna i wychowawcza.'
                            }
                        </p>
                        <SocialIcons />
                    </div>

                    <div className="md:pl-12">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                            Nawigacja
                        </h3>
                        <ul className="mt-4 space-y-2.5 text-sm">
                            <FooterLink href="/">Strona główna</FooterLink>
                            <FooterLink href="/aktualnosci">
                                Aktualności
                            </FooterLink>
                            <FooterLink href="/o-nas">O nas</FooterLink>
                        </ul>
                    </div>

                    <div className="col-span-2 text-center md:text-left md:col-span-1 md:pl-12">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                            Kontakt
                        </h3>
                        <div className="w-52 md:w-auto mx-auto">
                            <ul className="mt-4 space-y-3 text-sm">
                                <li className="flex items-start gap-2.5">
                                    <FaMapPin />
                                    <span>{'Rzeszów, ul. Jagiellońska 6'}</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <FaEnvelope />
                                    <a
                                        href={`mailto:${''}`}
                                        className="hover:text-white"
                                    >
                                        strzelec.rzeszow@op.pl
                                    </a>
                                </li>
                                {/* <li className="flex items-center gap-2.5">
                                    <FaPhone />
                                    <a
                                        href={`tel:${''}`}
                                        className="hover:text-white"
                                    >
                                        999555666
                                    </a>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-12 border-t border-white/10 pt-6 text-xs text-neutral-400 sm:flex sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} Strzelec Rzeszów. Wszelkie
                        prawa zastrzeżone.
                    </p>
                    <Link
                        className="mt-2 sm:mt-0 hover:underline"
                        href="dashboard"
                    >
                        panel administracyjny
                    </Link>
                </div>
            </div>
        </footer>
    );
}

function FooterLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <li>
            <Link
                href={href}
                className="text-neutral-300 transition-colors hover:text-white"
            >
                {children}
            </Link>
        </li>
    );
}
