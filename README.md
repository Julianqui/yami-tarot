# Yami Tarot

Una aplicación mística de lectura de tarot construida con Next.js, TypeScript y Styled Components.

## 🌙 Características

- **Next.js 14** con App Router
- **TypeScript** para mayor seguridad de tipos
- **Styled Components** para estilos dinámicos
- **Diseño responsive** y moderno
- **Tema místico** con gradientes y efectos visuales

## 🚀 Empezar

### Prerequisitos

- Node.js 18+ 
- npm, yarn, pnpm o bun

### Instalación

1. Navega al directorio del proyecto:
```bash
cd yami-tarot
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
# o
pnpm install
# o
bun install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
yami-tarot/
├── public/                 # Archivos estáticos
├── src/
│   ├── app/               # App Router de Next.js
│   │   ├── layout.tsx     # Layout principal
│   │   └── page.tsx       # Página de inicio
│   ├── components/        # Componentes reutilizables
│   │   └── StyledComponentsRegistry.tsx
│   ├── styles/            # Estilos globales
│   │   └── GlobalStyle.ts
│   └── utils/             # Utilidades y helpers
├── next.config.js         # Configuración de Next.js
├── package.json
└── tsconfig.json          # Configuración de TypeScript
```

## 🎨 Tecnologías Utilizadas

- **Next.js**: Framework de React para producción
- **TypeScript**: Superset tipado de JavaScript
- **Styled Components**: CSS-in-JS library para estilos dinámicos
- **React**: Biblioteca de interfaz de usuario

## 📝 Scripts Disponibles

- `npm run dev` - Ejecuta el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Ejecuta la aplicación en modo producción
- `npm run lint` - Ejecuta el linter

## 🌟 Próximas Características

- [ ] Sistema de cartas de tarot
- [ ] Diferentes tipos de lecturas
- [ ] Animaciones de cartas
- [ ] Sistema de interpretaciones
- [ ] Historial de lecturas
- [ ] Modo oscuro/claro

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! No dudes en abrir issues o pull requests.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
