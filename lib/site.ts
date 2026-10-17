/** Datos de contacto. Cambiá estos valores (o definí las env) y queda en todo el sitio. */
export const site = {
  name: 'Yami Tarot',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? '5491122334455',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM ?? 'yami.tarot',
  email: process.env.NEXT_PUBLIC_EMAIL ?? 'hola@yamitarot.com',
};

export const whatsappLink = (message = 'Hola Yami! Quiero reservar una lectura ✨') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const instagramLink = () => `https://instagram.com/${site.instagram}`;
