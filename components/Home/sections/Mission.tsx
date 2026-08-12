import { SectionHeading } from '@/components/layout/SectionHeading';
import { Reveal } from '@/components/ui/animation/Reveal';
import { FaFlag, FaHeart, FaUsers } from 'react-icons/fa';

export default function Mission() {
    return (
        <section className="section">
            <div className="container-content">
                <SectionHeading
                    align="center"
                    eyebrow="Nasza misja"
                    title="Wartości, które kształtują obywateli"
                    description="Kształtujemy postawy odpowiedzialności, patriotyzmu i służby — w oparciu o tradycje i współczesne wychowanie."
                />
                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {[
                        {
                            icon: <FaFlag />,
                            title: 'Patriotyzm',
                            text: 'Wychowanie w szacunku do historii, symboli narodowych i tradycji oręża polskiego.',
                        },
                        {
                            icon: <FaHeart />,
                            title: 'Dyscyplina',
                            text: 'Samodyscyplina, rzetelność i odpowiedzialność — fundament dojrzałej postawy obywatelskiej.',
                        },
                        {
                            icon: <FaUsers />,
                            title: 'Służba społeczeństwu',
                            text: 'Działania na rzecz lokalnej społeczności, wolontariat i pomoc w sytuacjach kryzysowych.',
                        },
                    ].map((c, i) => (
                        <Reveal key={c.title} delay={i * 0.1}>
                            <div className="card card-hover h-full p-7">
                                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary">
                                    {c.icon}
                                </div>
                                <h3 className="mt-5 text-xl font-bold">
                                    {c.title}
                                </h3>
                                <p className="mt-2 text-neutral-600">
                                    {c.text}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
