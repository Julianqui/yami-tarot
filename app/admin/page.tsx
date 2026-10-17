import Link from 'next/link';
import { adminConfigured, isAdmin } from '@/lib/auth';
import { listVideos, usingBlob } from '@/lib/videos';
import { AdminLogin } from './admin-login';
import { AdminPanel } from './admin-panel';
import { PrivateLink } from './private-link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Panel · Yami Tarot',
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const configured = adminConfigured();
  const authorized = configured && (await isAdmin());
  const videos = authorized ? await listVideos() : [];

  return (
    <div className="mx-auto w-[min(1100px,92vw)] py-14 sm:py-20">
      <div className="flex items-center justify-between gap-4">
        <span className="mono">Panel privado</span>
        <Link href="/" className="btn btn-ghost px-4 py-2 text-[0.85rem]">
          Ver el sitio
        </Link>
      </div>

      <h1 className="h-display mt-8 text-[clamp(2.2rem,6vw,3.6rem)]">Videoteca</h1>
      <p className="mt-4 max-w-[56ch] text-[1.02rem] leading-[1.7] text-muted">
        Subí archivos de video o pegá links de YouTube y Vimeo. Los videos no se publican en la
        landing: se ven solo en el link privado que le mandás por mail a quien compró.
      </p>

      {authorized ? <PrivateLink slug={process.env.VIDEOS_SLUG} /> : null}

      <div className="mt-12">
        {!configured ? (
          <div className="slot p-7 pt-12" data-note="Falta configurar">
            <p className="text-[0.98rem] leading-[1.7] text-muted">
              Creá un archivo <code className="font-mono text-accent">.env.local</code> en la raíz
              del proyecto con una contraseña y reiniciá el servidor:
            </p>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-surface-2 p-4 font-mono text-xs text-muted">
{`ADMIN_PASSWORD=unaClaveQueSoloSepaYami
ADMIN_SECRET=cualquier-texto-largo-y-aleatorio`}
            </pre>
          </div>
        ) : authorized ? (
          <AdminPanel videos={videos} useBlob={usingBlob()} />
        ) : (
          <AdminLogin />
        )}
      </div>
    </div>
  );
}
