import { SectionHead } from './reveal';

export function Voices() {
  return (
    <section id="voces" className="mx-auto w-[min(1200px,92vw)] scroll-mt-24 py-20 sm:py-28">
      <SectionHead
        kicker="Voces"
        title="Lo que cuentan quienes consultaron"
        standfirst="Los testimonios de ejemplo se quitaron porque eran inventados. En estos tres huecos van comentarios reales, con el nombre o la inicial de quien lo escribió y el servicio que tomó. Si todavía no hay ninguno, conviene borrar la sección."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {['Testimonio 01', 'Testimonio 02', 'Testimonio 03'].map((note) => (
          <blockquote key={note} className="slot min-h-[11rem] p-6 pt-12" data-note={note}>
            <p className="note">
              Texto real de una persona que consultó, su nombre o inicial y el servicio que tomó.
            </p>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
