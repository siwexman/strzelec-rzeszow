import { AnimatedCounter } from '@/components/ui/animation/AnimatedCounter';
import { Reveal } from '@/components/ui/animation/Reveal';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

export default function About() {
    return (
        <section className="section bg-neutral-50">
            <div className="container-content">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                    <Reveal>
                        <div>
                            <p className="eyebrow">O organizacji</p>
                            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                                Wychowujemy młodych Polaków od pokoleń
                            </h2>
                            <p className="mt-5 text-lg text-neutral-600">
                                Związek Strzelecki &quot;Strzelec&quot; Józefa
                                Piłsudskiego to organizacja, która łączy
                                tradycje II Rzeczpospolitej z nowoczesnym
                                wychowaniem obywatelskim. Prowadzimy szkolenia
                                dla młodzieży i dorosłych, uczymy pierwszej
                                pomocy, orientacji terenowej, historii Polski
                                oraz postaw przywódczych.
                            </p>
                            <p className="mt-4 text-neutral-600">
                                Naszym celem jest kształtowanie odpowiedzialnych
                                obywateli — ludzi, którzy służą społeczeństwu i
                                rozumieją znaczenie wspólnoty.
                            </p>
                            <Link href="/o-nas" className="btn-primary mt-7">
                                Poznaj naszą historię <FaArrowRight size={18} />
                            </Link>
                        </div>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <div className=" rounded-3xl bg-white p-8 shadow-card sm:p-10">
                            <div className="pb-2 text-center">
                                <p className="font-semibold">
                                    Jednostka Strzelecka 2021
                                </p>
                                <p>w liczbach</p>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <AnimatedCounter
                                    value={35}
                                    suffix="+"
                                    label="Lat działalności"
                                />
                                <AnimatedCounter
                                    value={250}
                                    suffix="+"
                                    label="Strzelców i Orląt"
                                />
                                <AnimatedCounter
                                    value={70}
                                    suffix="+"
                                    label="Szkoleń i zajęć rocznie"
                                />
                                <AnimatedCounter
                                    value={27}
                                    // suffix="+"
                                    label="Wolontariuszy"
                                />
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
