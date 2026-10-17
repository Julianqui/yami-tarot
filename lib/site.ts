/** Datos de contacto. Cambiá estos valores (o definí las env) y queda en todo el sitio. */
export const site = {
  name: 'Yami Tarot',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? '5491150235826',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM ?? 'entre_tiradas_cafecito',
  email: process.env.NEXT_PUBLIC_EMAIL ?? 'yamila_capp@hotmail.com',
  /** Alias de Mercado Pago donde se reciben las transferencias. */
  alias: process.env.NEXT_PUBLIC_ALIAS ?? 'Yamilatarot22',
  /** Usuario de PayPal, para quienes pagan desde el exterior. */
  paypal: process.env.NEXT_PUBLIC_PAYPAL ?? 'yamilatarot22',
};

export const whatsappLink = (message = 'Hola Yami! Quiero reservar una lectura ✨') =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const instagramLink = () => `https://instagram.com/${site.instagram}`;

export const paypalLink = () => `https://paypal.me/${site.paypal}`;
