/**
 * Catálogo de servicios. El pago es por transferencia: cada servicio tiene su
 * propia página de compra con los datos de Yami.
 */
export type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  /** Duración o formato de entrega, para mostrar en la card. */
  meta: string;
  highlights: string[];
  featured?: boolean;
  /** Si tiene página propia con más detalle. */
  detailUrl?: string;
  /** Precio promocional. Vence solo en promoUntil; después vuelve el precio normal. */
  promoPrice?: number;
  /** Fecha y hora de corte, con huso horario argentino. */
  promoUntil?: string;
};

export const CURRENCY = 'ARS';

export const products: Product[] = [
  {
    id: 'lectura-express',
    name: '3 Preguntas',
    tagline: 'Tres dudas concretas, tres respuestas',
    description:
      'Hacés tres preguntas puntuales y Yami te responde con una tirada para cada una, en video privado dentro de las 48 h.',
    price: 12000,
    meta: 'Video privado · 48 h',
    highlights: ['3 preguntas', 'Audio + video', 'Respuesta en 48 h'],
  },
  {
    id: 'lectura-profunda',
    name: 'Lectura Profunda',
    tagline: 'El panorama completo de tu momento',
    description:
      'Sesión en vivo de 50 minutos por videollamada. Amor, trabajo, familia y los cruces entre ellos.',
    price: 28000,
    meta: 'En vivo · 50 min',
    highlights: ['Tirada extendida', 'Grabación incluida', 'Preguntas libres'],
    featured: true,
  },
  {
    id: 'curso-tarot',
    name: 'Curso de Tarot',
    tagline: 'Aprendé a leer tus propias cartas',
    description:
      'Formación desde cero sobre los 78 arcanos: los 22 mayores y los 56 menores, cómo armar una tirada y cómo interpretarla sin miedo.',
    price: 65000,
    promoPrice: 52000,
    promoUntil: '2026-10-22T23:59:00-03:00',
    meta: 'Online · clases grabadas',
    highlights: ['Desde cero', 'Material incluido', 'Acceso a los videos'],
    detailUrl: '/curso',
  },
  {
    id: 'ritual-lunar',
    name: 'Ritual de Luna Nueva',
    tagline: 'Para abrir ciclo con intención',
    description:
      'Encuentro grupal online en cada luna nueva: meditación guiada, tirada colectiva y ritual de intención.',
    price: 15000,
    meta: 'Grupal · 1 h 30',
    highlights: ['Cupos limitados', 'Material descargable', 'Comunidad'],
  },
  {
    id: 'pack-tres-lecturas',
    name: 'Pack 3 Lecturas',
    tagline: 'Acompañamiento de tres meses',
    description:
      'Tres lecturas profundas para usar cuando las necesites, con seguimiento por mensaje entre sesiones.',
    price: 72000,
    meta: '3 sesiones · 1 año de validez',
    highlights: ['Ahorrás 15%', 'Seguimiento', 'Agenda flexible'],
  },
  {
    id: 'consulta-si-no',
    name: 'Consulta Sí / No',
    tagline: 'Cuando necesitás decidir hoy',
    description:
      'Una carta, una respuesta directa por audio en el día. Sin vueltas, para esas dudas que no esperan.',
    price: 5000,
    meta: 'Audio · mismo día',
    highlights: ['1 carta', 'Respuesta en el día', 'Por WhatsApp'],
  },
];

export function findProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

/**
 * Promoción vigente, o null si ya venció. Las páginas que la muestran se
 * regeneran cada pocos minutos, así el cartel desaparece solo.
 */
export function activePromo(product: Product): { price: number; until: Date } | null {
  if (!product.promoPrice || !product.promoUntil) return null;
  const until = new Date(product.promoUntil);
  if (Number.isNaN(until.getTime()) || until.getTime() <= Date.now()) return null;
  return { price: product.promoPrice, until };
}
