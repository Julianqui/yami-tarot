import { portraitSrc } from '@/lib/assets';
import { About } from './components/about';
import { ScrollCards } from './components/scroll-cards';
import { ArcanasSection } from './components/arcanas-section';
import { Faq } from './components/faq';
import { Hero } from './components/hero';
import { Process } from './components/process';
import { Services } from './components/services';
import { VideosTeaser } from './components/videos-teaser';

export default async function HomePage() {
  const portrait = await portraitSrc();

  return (
    <>
      <Hero portrait={portrait} />
      <ScrollCards />
      <About />
      <ArcanasSection />
      <Services />
      <Process />
      <VideosTeaser />

      <Faq />
    </>
  );
}
