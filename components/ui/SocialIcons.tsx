import { FaFacebook, FaYoutube } from 'react-icons/fa';

export default function SocialIcons({ isHeader }: { isHeader?: boolean }) {
    return (
        <div className={`flex gap-2 ${isHeader ? 'my-auto' : 'mt-5'}`}>
            <SocialLink
                isHeader={isHeader}
                href={
                    'https://www.facebook.com/p/Jednostka-Strzelecka-2021-im-p%C5%82k-Leopolda-Lisa-Kuli-w-Rzeszowie-100071100844013/?locale=pl_PL'
                }
                label="Facebook"
            >
                <FaFacebook />
            </SocialLink>
            <SocialLink
                isHeader={isHeader}
                href={'https://www.youtube.com/@JS2021Rzeszow'}
                label="YouTube"
            >
                <FaYoutube />
            </SocialLink>
        </div>
    );
}

function SocialLink({
    href,
    label,
    children,
    isHeader,
}: {
    href: string;
    label: string;
    children: React.ReactNode;
    isHeader?: boolean;
}) {
    const cssClass = isHeader
        ? 'bg-black/10 text-black hover:bg-white hover:border'
        : 'bg-white/10 text-white hover:bg-accent';

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition-all ${cssClass}`}
        >
            {children}
        </a>
    );
}
