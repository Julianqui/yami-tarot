/* eslint-disable @next/next/no-img-element */
'use client';

import { upload } from '@vercel/blob/client';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import type { Video } from '@/lib/videos';

type Mode = 'file' | 'link';

const field =
  'mt-2 w-full rounded-xl border border-line bg-surface-2 px-3.5 py-2.5 font-sans text-[0.95rem] normal-case tracking-normal text-text outline-none transition focus:border-text';

export function AdminPanel({ videos, useBlob }: { videos: Video[]; useBlob: boolean }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [mode, setMode] = useState<Mode>('file');
  const [progress, setProgress] = useState<number | null>(null);
  const [message, setMessage] = useState<{ kind: 'ok' | 'error'; text: string } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  /** En Vercel el archivo va directo a Blob desde el navegador. */
  const submitToBlob = async (form: HTMLFormElement) => {
    const data = new FormData(form);
    const file = data.get('file');
    const posterFile = data.get('poster');

    setMessage(null);
    setProgress(0);

    try {
      let blobUrl: string | undefined;
      let posterUrl: string | undefined;

      if (mode === 'file') {
        if (!(file instanceof File) || file.size === 0) {
          throw new Error('Elegí un archivo de video.');
        }
        const uploaded = await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/videos/upload-token',
          multipart: file.size > 50 * 1024 * 1024,
          onUploadProgress: ({ percentage }) => setProgress(Math.round(percentage)),
        });
        blobUrl = uploaded.url;
      }

      if (posterFile instanceof File && posterFile.size > 0) {
        const uploadedPoster = await upload(posterFile.name, posterFile, {
          access: 'public',
          handleUploadUrl: '/api/videos/upload-token',
        });
        posterUrl = uploadedPoster.url;
      }

      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.get('title'),
          description: data.get('description'),
          category: data.get('category'),
          url: mode === 'link' ? data.get('url') : undefined,
          blobUrl,
          posterUrl,
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload?.error ?? 'No se pudo publicar el video.');

      setMessage({ kind: 'ok', text: 'Video publicado. Ya se ve en la landing.' });
      formRef.current?.reset();
      router.refresh();
    } catch (error) {
      setMessage({
        kind: 'error',
        text: error instanceof Error ? error.message : 'No se pudo subir el video.',
      });
    } finally {
      setProgress(null);
    }
  };

  /** En local subimos con XHR para poder mostrar el progreso: los videos pesan. */
  const submitToDisk = (form: HTMLFormElement) => {
    const data = new FormData(form);
    if (mode === 'file') data.delete('url');
    else data.delete('file');

    setMessage(null);
    setProgress(0);

    const request = new XMLHttpRequest();
    request.open('POST', '/api/videos');
    request.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
    });
    request.addEventListener('load', () => {
      setProgress(null);
      let payload: { error?: string } = {};
      try {
        payload = JSON.parse(request.responseText);
      } catch {
        payload = {};
      }
      if (request.status >= 200 && request.status < 300) {
        setMessage({ kind: 'ok', text: 'Video publicado. Ya se ve en la landing.' });
        formRef.current?.reset();
        router.refresh();
      } else {
        setMessage({ kind: 'error', text: payload.error ?? 'No se pudo subir el video.' });
      }
    });
    request.addEventListener('error', () => {
      setProgress(null);
      setMessage({ kind: 'error', text: 'Se cortó la conexión durante la subida.' });
    });
    request.send(data);
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (useBlob) void submitToBlob(form);
    else submitToDisk(form);
  };

  const remove = async (id: string) => {
    setDeletingId(id);
    try {
      const response = await fetch(`/api/videos/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.error ?? 'No se pudo borrar.');
      }
      router.refresh();
    } catch (error) {
      setMessage({
        kind: 'error',
        text: error instanceof Error ? error.message : 'No se pudo borrar.',
      });
    } finally {
      setDeletingId(null);
    }
  };

  const logout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' });
    router.refresh();
  };

  return (
    <div className="grid gap-14">
      <form ref={formRef} onSubmit={submit} className="card p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
          <h2 className="h-section text-[1.7rem]">Subir un video</h2>
          <button type="button" onClick={logout} className="btn btn-ghost px-4 py-1.5 text-[0.82rem]">
            Salir
          </button>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {(
            [
              { value: 'file', label: 'Archivo' },
              { value: 'link', label: 'Link' },
            ] as const
          ).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setMode(option.value)}
              className={`chip transition ${
                mode === option.value ? 'border-text bg-text text-night' : 'hover:border-text/40'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <label className="mono">
            Título
            <input name="title" required placeholder="Tirada del 14 al 20" className={field} />
          </label>

          <label className="mono">
            Categoría
            <input name="category" defaultValue="Tirada semanal" className={field} />
          </label>

          <label className="mono sm:col-span-2">
            Descripción (opcional)
            <textarea name="description" rows={3} className={`${field} resize-y`} />
          </label>

          {mode === 'file' ? (
            <label className="mono sm:col-span-2">
              Archivo de video (.mp4, .webm, .mov)
              <input
                name="file"
                type="file"
                accept="video/mp4,video/webm,video/quicktime,video/x-m4v"
                required
                className="mt-2 w-full rounded-xl border border-dashed border-line bg-surface-2 p-4 font-sans text-[0.88rem] normal-case tracking-normal text-muted file:mr-4 file:rounded-full file:border-0 file:bg-text file:px-3.5 file:py-1.5 file:font-sans file:text-[0.78rem] file:text-night"
              />
            </label>
          ) : (
            <label className="mono sm:col-span-2">
              Link de YouTube, Vimeo o .mp4
              <input
                name="url"
                required
                placeholder="https://www.youtube.com/watch?v=…"
                className={field}
              />
            </label>
          )}

          <label className="mono sm:col-span-2">
            Miniatura (opcional). Si no subís ninguna, se usa el primer frame.
            <input
              name="poster"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              className="mt-2 w-full rounded-xl border border-dashed border-line bg-surface-2 p-4 font-sans text-[0.88rem] normal-case tracking-normal text-muted file:mr-4 file:rounded-full file:border-0 file:bg-text file:px-3.5 file:py-1.5 file:font-sans file:text-[0.78rem] file:text-night"
            />
          </label>
        </div>

        {progress !== null ? (
          <div className="mt-7">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
              <div className="h-full rounded-full bg-text transition-all" style={{ width: `${progress}%` }} />
            </div>
            <p className="mono mt-2">Subiendo… {progress}%</p>
          </div>
        ) : null}

        {message ? (
          <p
            className={`mt-6 rounded-xl bg-surface-2 px-3.5 py-2.5 text-[0.88rem] ${
              message.kind === 'ok' ? 'text-muted' : 'text-accent'
            }`}
          >
            {message.text}
          </p>
        ) : null}

        <button type="submit" disabled={progress !== null} className="btn btn-primary mt-7">
          Publicar video
        </button>
      </form>

      <section>
        <h2 className="h-section border-b border-line pb-4 text-[1.7rem]">
          Publicados <span className="text-accent">({videos.length})</span>
        </h2>

        {videos.length === 0 ? (
          <p className="mt-5 text-[0.92rem] text-muted">Todavía no hay videos cargados.</p>
        ) : (
          <ul>
            {videos.map((video, index) => (
              <li key={video.id} className="card mt-3 flex flex-wrap items-center gap-5 p-4">
                <span className="mono">{String(index + 1).padStart(2, '0')}</span>
                <div className="h-14 w-24 shrink-0 overflow-hidden rounded-xl bg-surface-2">
                  {video.poster ? (
                    <img src={video.poster} alt="" className="h-full w-full object-cover" />
                  ) : video.source === 'file' || video.source === 'url' ? (
                    <video src={video.src} muted preload="metadata" className="h-full w-full object-cover" />
                  ) : null}
                </div>

                <div className="min-w-[12rem] flex-1">
                  <p className="text-[1.02rem] font-medium tracking-[-0.01em]">{video.title}</p>
                  <p className="mono mt-1">
                    {video.category} · {video.source}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => remove(video.id)}
                  disabled={deletingId === video.id}
                  className="btn btn-ghost px-4 py-1.5 text-[0.82rem]"
                >
                  {deletingId === video.id ? 'Borrando…' : 'Borrar'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
