import { portraitSrc } from '@/lib/assets';
import { listVideos } from '@/lib/videos';
import { About } from './components/about';
import { Faq } from './components/faq';
import { Hero } from './components/hero';
import { Process } from './components/process';
import { Services } from './components/services';
import { VideosSection } from './components/videos-section';
import { Voices } from './components/voices';

// Los videos se leen del store en cada visita, así lo que sube Yami aparece al instante.
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [videos, portrait] = await Promise.all([listVideos(), portraitSrc()]);

  return (
    <>
      <Hero portrait={portrait} />
      <About />
      <Services />
      <Process />
      <VideosSection videos={videos} />
      <Voices />
      <Faq />
    </>
  );
}
