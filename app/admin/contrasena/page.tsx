import Link from 'next/link';
import { canStoreCredentials } from '@/lib/admin-credentials';
import { adminConfigured, isAdmin } from '@/lib/auth';
import { AdminLogin } from '../admin-login';
import { ChangePassword } from '../change-password';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Cambiar contraseña · Yami Tarot',
  robots: { index: false, follow: false },
};

export default async function CambiarContrasenaPage() {
  const authorized = adminConfigured() && (await isAdmin());

  return (
    <div className="mx-auto w-[min(820px,92vw)] py-14 sm:py-20">
      <div className="flex items-center justify-between gap-4">
        <span className="mono">Panel privado</span>
        <Link href="/admin" className="btn btn-ghost px-4 py-2 text-[0.85rem]">
          ← Volver al panel
        </Link>
      </div>

      <h1 className="h-display mt-8 text-[clamp(2rem,5.5vw,3.2rem)]">Cambiar contraseña</h1>
      <p className="mt-4 max-w-[54ch] text-[1.02rem] leading-[1.7] text-muted">
        Elegí una que puedas recordar y que no uses en otro lado. Si la olvidás, avisale a Juli:
        se puede restablecer.
      </p>

      <div className="mt-10">
        {authorized ? <ChangePassword enabled={canStoreCredentials()} standalone /> : <AdminLogin />}
      </div>
    </div>
  );
}
