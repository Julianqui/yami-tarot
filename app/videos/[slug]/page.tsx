import { notFound } from 'next/navigation';
import { SCOPE_ALL } from '@/lib/access-scope';
import { findActiveAccess } from '@/lib/accesses';
import { isMaterial, listVideos } from '@/lib/videos';
import { MaterialsList } from '../../components/materials-list';
import { VideosSection } from '../../components/videos-section';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Videoteca · Yami Tarot',
  robots: { index: false, follow: false },
};

/**
 * Página privada. Se entra con un link personal generado desde el panel, o con
 * el link general viejo (VIDEOS_SLUG), que sigue funcionando.
 */
export default async function VideosPrivadosPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const generalSlug = process.env.VIDEOS_SLUG;
  const isGeneral = Boolean(generalSlug) && slug === generalSlug;
  const access = isGeneral ? null : await findActiveAccess(slug);

  if (!isGeneral && !access) notFound();

  const all = await listVideos();
  const scope = access?.scope ?? SCOPE_ALL;
  const visible = scope === SCOPE_ALL ? all : all.filter((item) => item.category === scope);
  const videos = visible.filter((item) => !isMaterial(item));
  const materials = visible.filter(isMaterial);

  return (
    <div className="mx-auto w-[min(1200px,92vw)] py-12 sm:py-16">
      <div className="flex flex-wrap items-center gap-3">
        <span className="chip">
          <span className="h-1.5 w-1.5 rounded-full bg-teal" />
          Acceso privado
        </span>
        {access ? <span className="chip">Para {access.label}</span> : null}
        {scope !== SCOPE_ALL ? <span className="chip">{scope}</span> : null}
      </div>

      <VideosSection videos={videos} />
      <MaterialsList items={materials} />

      {visible.length === 0 ? (
        <p className="note mt-4">
          Todavía no hay videos publicados en esta categoría. Cuando Yami los suba, aparecen acá
          con este mismo link.
        </p>
      ) : null}
    </div>
  );
}
