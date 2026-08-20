import About from './sections/About';
import Hero from './sections/Hero';
import JoinUs from './sections/JoinUs';
import Mission from './sections/Mission';
import News from './sections/News';

export default function HomePage() {
    return (
        <>
            <Hero />
            <News />
            <Mission />
            <About />
            <JoinUs />
        </>
    );
}
