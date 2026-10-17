import { notFound } from 'next/navigation';
import { listVideos } from '@/lib/videos';
import { VideosSection } from '../../components/videos-section';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Videoteca · Yami Tarot',
  robots: { index: false, follow: false },
};

/** Página privada: solo la abre quien tenga el link que manda Yami por mail. */
export default async function VideosPrivadosPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const expected = process.env.VIDEOS_SLUG;

  if (!expected || slug !== expected) notFound();

  const videos = await listVideos();

  return (
    <div className="mx-auto w-[min(1200px,92vw)] py-12 sm:py-16">
      <span className="chip">
        <span className="h-1.5 w-1.5 rounded-full bg-teal" />
        Acceso privado
      </span>
      <VideosSection videos={videos} />
    </div>
  );
}
