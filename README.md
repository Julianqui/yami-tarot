# Yami Tarot

Landing de Yami Tarot: presentación, videoteca administrable y carrito con pago
por **Mercado Pago** (la plata va directo a la cuenta de Yami).

Hecho con Next.js 16 (App Router), React 19, Tailwind 4 y framer-motion.

---

## 1. Arrancar en la compu

```bash
npm install
cp .env.example .env.local   # completá los valores
npm run dev
```

Abrí http://localhost:3000.

## 2. Variables de entorno (`.env.local`)

| Variable | Para qué sirve |
| --- | --- |
| `MP_ACCESS_TOKEN` | **Obligatoria para cobrar.** Access token de la cuenta de Mercado Pago de Yami. |
| `MP_WEBHOOK_SECRET` | Firma secreta del webhook (opcional, recomendada en producción). |
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio (`https://…`). En local dejala vacía. |
| `ADMIN_PASSWORD` | Contraseña del panel `/admin` para subir videos. |
| `ADMIN_SECRET` | Texto largo y aleatorio con el que se firma la sesión del panel. |
| `MAX_UPLOAD_MB` | Peso máximo por video (por defecto 300). |
| `NEXT_PUBLIC_WHATSAPP` / `NEXT_PUBLIC_INSTAGRAM` / `NEXT_PUBLIC_EMAIL` | Datos de contacto que se muestran en el sitio. |

### Dónde saca Yami el access token

1. Entrar a https://www.mercadopago.com.ar/developers/panel con **su** cuenta
   (es la cuenta que va a recibir la plata).
2. *Tus integraciones* → crear una aplicación (tipo: pagos online / Checkout Pro).
3. *Credenciales de prueba* → copiar el `Access Token` que empieza con `TEST-`
   para probar sin plata real.
4. Cuando esté todo ok, repetir con *Credenciales de producción*
   (`APP_USR-…`) y actualizar `MP_ACCESS_TOKEN`.

> Con un token `TEST-` el sitio abre el checkout de prueba automáticamente.
> Para simular compras usá los usuarios y tarjetas de prueba de Mercado Pago.

### Webhook (avisos de pago)

En producción, en *Tus integraciones → Webhooks*, configurar la URL:

```
https://TU-DOMINIO/api/mercadopago/webhook
```

evento **Pagos**. Cada pago confirmado queda registrado en `data/orders.json`
(id, estado, monto, mail del comprador). La firma secreta va en `MP_WEBHOOK_SECRET`.

## 3. Diseño y contenido pendiente

La interfaz es oscura y minimalista: fondo negro cálido (`#0b0b0c`), superficies
apenas más claras con bordes de 1 px y esquinas redondeadas, tipografía Geist
(Geist Mono para las etiquetas) y un único acento arena usado en detalles.
Sin degradés, sin glows, sin animaciones de entrada aparatosas.

**El contenido inventado se sacó.** En la landing quedan huecos punteados que
avisan qué falta completar:

| Dónde | Qué va |
| --- | --- |
| Hero | Foto de Yami. Dejá el archivo en `public/yami.jpg` (o `.png`/`.webp`) y el bloque punteado se reemplaza solo. |
| Sobre Yami | Bio en primera persona, formación y mazo con el que trabaja. |
| Voces | Tres testimonios reales. Si todavía no hay, borrá la sección (`app/components/voices.tsx`). |
| Servicios | Los precios y descripciones de `lib/products.ts` son de ejemplo. |
| Contacto | WhatsApp, Instagram y mail de ejemplo en `lib/site.ts`. |
| Preguntas | Revisá que las políticas de `app/components/faq.tsx` sean las reales. |

Los bloques punteados y las notas chicas del sitio son recordatorios de
producción: se borran junto con el contenido que reemplaces.

## 4. Subir videos

1. Ir a `/admin` (hay un link discreto en el pie del sitio).
2. Entrar con `ADMIN_PASSWORD`.
3. Dos formas de cargar:
   - **Archivo**: `.mp4`, `.webm`, `.mov` subido desde la compu o el celular
     (con barra de progreso). Se guarda en `public/uploads/`.
   - **Link**: pegando una URL de YouTube, Vimeo o un `.mp4` directo.
4. Opcional: subir una miniatura. Si no, se usa el primer frame del video
   (o la miniatura de YouTube).

Los videos aparecen en la sección *Videoteca* de la landing al instante, con
filtros por categoría y reproductor en modal.

## 5. Precios y servicios

Están en [`lib/products.ts`](lib/products.ts). Es la única fuente de verdad: el
checkout recalcula siempre contra esa lista, así nadie puede cambiar el precio
desde el navegador. Para agregar o editar un servicio, se toca ese archivo.

Textos de contacto: [`lib/site.ts`](lib/site.ts).

## 6. Publicar

```bash
npm run build
npm start
```

Al publicar, acordate de:

- Poner `NEXT_PUBLIC_SITE_URL=https://tudominio.com` (sin eso, Mercado Pago no
  puede volver al sitio después del pago ni mandar el webhook).
- Usar el access token de **producción**.

### Sobre dónde hospedarlo

Los videos subidos como archivo se guardan en el disco del servidor
(`public/uploads/`) y la lista en `data/videos.json`. Eso funciona perfecto en
un VPS, Railway, Render o Fly con volumen persistente.

En Vercel el sistema de archivos es efímero: ahí conviene cargar los videos por
**link de YouTube/Vimeo** (que funciona igual de bien), o migrar la subida a un
almacenamiento externo (Vercel Blob, S3, Cloudinary) cambiando sólo
`lib/videos.ts` y `app/api/videos/route.ts`.

## 7. Mapa del proyecto

```
app/
  page.tsx                     landing (hero, sobre, servicios, cómo funciona, videos, voces, FAQ)
  components/                  secciones y UI (carrito, header, láminas SVG)
  admin/                       panel privado de videos
  pago/{exito,pendiente,error} pantallas de vuelta del checkout
  api/
    checkout/                  crea la preferencia de Mercado Pago
    mercadopago/webhook/       recibe los avisos de pago
    videos/                    alta, listado y borrado de videos
    admin/login/               sesión del panel
lib/
  assets.ts                    detecta la foto de Yami en /public
  products.ts                  catálogo y precios
  cart-store.ts                carrito (zustand + localStorage)
  videos.ts                    storage de la videoteca
  site.ts                      datos de contacto
```
