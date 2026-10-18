import { NextResponse } from 'next/server';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { isAdmin } from '@/lib/auth';

export const runtime = 'nodejs';

const MAX_MB = Number(process.env.MAX_UPLOAD_MB ?? 500);

/**
 * El navegador sube el archivo directo a Vercel Blob; acá solo firmamos el
 * permiso. Así evitamos el límite de 4,5 MB por request de las funciones.
 */
export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        if (!(await isAdmin())) {
          throw new Error('No autorizado.');
        }
        return {
          allowedContentTypes: [
            'video/mp4',
            'video/webm',
            'video/quicktime',
            'video/x-m4v',
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/avif',
            'application/pdf',
          ],
          maximumSizeInBytes: MAX_MB * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {
        // El alta del video la hace el panel con POST /api/videos.
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'No se pudo autorizar la subida.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
