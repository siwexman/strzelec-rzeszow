import About from './sections/About';
import Hero from './sections/Hero';
import JoinUs from './sections/JoinUs';
import Mission from './sections/Mission';
import News from './sections/News';
// import Training from './sections/Training';

export default function HomePage() {
    return (
        <>
            <Hero />
            <News />
            <Mission />
            <About />
            {/* <Training /> */}
            <JoinUs />
        </>
    );
}
