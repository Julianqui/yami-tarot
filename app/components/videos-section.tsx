/* eslint-disable @next/next/no-img-element */
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import type { Video } from '@/lib/videos';
import { Reveal, SectionHead } from './reveal';

export function VideosSection({ videos }: { videos: Video[] }) {
  const [filter, setFilter] = useState('Todos');
  const [active, setActive] = useState<Video | null>(null);

  const categories = useMemo(
    () => ['Todos', ...Array.from(new Set(videos.map((v) => v.category).filter(Boolean)))],
    [videos],
  );

  const visible = useMemo(
    () => (filter === 'Todos' ? videos : videos.filter((v) => v.category === filter)),
    [filter, videos],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section id="videos" className="mx-auto w-[min(1200px,92vw)] scroll-mt-24 py-20 sm:py-28">
      <SectionHead
        kicker="Videoteca"
        title="Tiradas en video"
        standfirst="Lecturas grabadas, tiradas por signo y rituales explicados. Yami las sube desde el panel y aparecen acá al instante."
      />

      {videos.length > 0 && categories.length > 2 ? (
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              className={`chip transition ${
                filter === category
                  ? 'border-amethyst bg-amethyst text-night'
                  : 'hover:border-amethyst/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      ) : null}

      {videos.length === 0 ? (
        <div className="slot mt-12 p-8 pt-14" data-note="Videoteca vacía">
          <p className="max-w-[54ch] text-[1.02rem] leading-[1.7] text-muted">
            Todavía no hay videos cargados. Yami entra a{' '}
            <a href="/admin" className="link-underline text-text">
              el panel
            </a>
            , sube un archivo <code className="font-mono text-[0.9em]">.mp4</code> o pega un link de
            YouTube, y el video aparece en esta sección.
          </p>
        </div>
      ) : (
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((video, index) => (
            <Reveal as="li" key={video.id} delay={Math.min(index, 5) * 0.05}>
              <button
                type="button"
                onClick={() => setActive(video)}
                className="card card-hover group block w-full overflow-hidden text-left"
              >
                <div className="relative aspect-video overflow-hidden bg-surface-2">
                  {video.poster ? (
                    <img
                      src={video.poster}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  ) : video.source === 'file' || video.source === 'url' ? (
                    <video
                      src={video.src}
                      muted
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                  <span className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-amethyst px-3 py-1.5 text-[0.75rem] text-night backdrop-blur">
                    <span className="h-0 w-0 border-y-[4px] border-l-[6px] border-y-transparent border-l-night" />
                    Reproducir
                  </span>
                </div>

                <div className="p-5">
                  <span className="mono text-teal">{video.category}</span>
                  <h3 className="h-section mt-2 text-[1.3rem]">{video.title}</h3>
                  {video.description ? (
                    <p className="mt-2 line-clamp-2 text-[0.92rem] leading-[1.6] text-muted">
                      {video.description}
                    </p>
                  ) : null}
                </div>
              </button>
            </Reveal>
          ))}
        </ul>
      )}

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <button
              type="button"
              aria-label="Cerrar video"
              onClick={() => setActive(null)}
              className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.97, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.97, y: 10 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-[min(1000px,94vw)] overflow-hidden rounded-[1.5rem] bg-surface"
            >
              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <span className="mono">{active.category}</span>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="btn btn-ghost px-4 py-1.5 text-[0.82rem]"
                >
                  Cerrar
                </button>
              </div>
              <div className="aspect-video w-full bg-black">
                {active.source === 'youtube' || active.source === 'vimeo' ? (
                  <iframe
                    src={`${active.src}${active.src.includes('?') ? '&' : '?'}autoplay=1`}
                    title={active.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                    className="h-full w-full"
                  />
                ) : (
                  <video
                    src={active.src}
                    poster={active.poster}
                    controls
                    autoPlay
                    playsInline
                    className="h-full w-full"
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="h-section text-[1.5rem]">{active.title}</h3>
                {active.description ? (
                  <p className="mt-2 max-w-[70ch] text-[0.95rem] leading-[1.65] text-muted">
                    {active.description}
                  </p>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
