import { whatsappLink } from '@/lib/site';

/** Botón fijo abajo a la derecha: abre el chat de WhatsApp de Yami. */
export function WhatsappFab() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribir por WhatsApp"
      className="group fixed bottom-5 right-5 z-[60] flex items-center gap-0 overflow-hidden rounded-full bg-[#25D366] py-3 pl-3 pr-3 text-white shadow-[0_18px_40px_-16px_rgba(37,211,102,0.85)] transition-all duration-300 hover:gap-2 hover:pr-5 sm:bottom-7 sm:right-7"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 fill-current" aria-hidden>
        <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.38-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z" />
        <path d="M12.04 2.5c-5.24 0-9.5 4.26-9.5 9.5 0 1.67.44 3.3 1.27 4.74L2.5 21.5l4.9-1.28a9.46 9.46 0 0 0 4.64 1.2h.01c5.24 0 9.5-4.26 9.5-9.5s-4.27-9.42-9.51-9.42zm0 17.3h-.01a7.9 7.9 0 0 1-4.02-1.1l-.29-.17-2.9.76.77-2.83-.19-.3a7.86 7.86 0 0 1-1.21-4.2c0-4.35 3.54-7.89 7.9-7.89a7.85 7.85 0 0 1 7.88 7.9c0 4.35-3.54 7.83-7.93 7.83z" />
      </svg>
      <span className="max-w-0 whitespace-nowrap text-[0.88rem] font-medium opacity-0 transition-all duration-300 group-hover:max-w-[12rem] group-hover:opacity-100">
        Escribir por WhatsApp
      </span>
    </a>
  );
}
