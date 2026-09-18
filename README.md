# SPA Eventos — Landing Page de Alta Conversión

Landing page moderna, interactiva y responsive para una empresa de producción de eventos y
entretenimiento artístico (shows temáticos, hora loca, plataforma 360°, tótems fotográficos,
coreografías y efectos especiales).

## Stack

| Capa | Tecnología |
| --- | --- |
| Framework | React 18 + Vite + TypeScript |
| Estilos | Tailwind CSS (mobile-first, dark premium con acentos dorados/neón) |
| Animaciones | Framer Motion |
| Iconos | Lucide React |
| Formularios | React Hook Form + Zod |
| Estado global | React Context + hooks personalizados |

## Inicio rápido

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + build de producción
npm run preview  # sirve el build
```

## Estructura de carpetas

```
SPA-EVENTOS/
├── index.html
├── package.json
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── vite.config.ts
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── config.ts                  # Marca, WhatsApp, IGV, tipos de evento, links
    ├── types/
    │   └── index.ts               # Interfaces y tipos estrictos
    ├── data/
    │   ├── services.ts            # Catálogo de servicios
    │   ├── packages.ts            # Paquetes comparativos
    │   ├── social.ts              # Testimonios y marcas aliadas
    │   └── categories.ts          # Filtros del catálogo
    ├── lib/
    │   ├── quote.ts               # Schemas Zod + cálculo de cotización
    │   ├── whatsapp.ts            # Construcción del mensaje y envío (WhatsApp / API)
    │   ├── format.ts              # Formateadores de moneda y fecha
    │   └── icons.ts               # Registro dinámico de iconos Lucide
    ├── hooks/
    │   └── useMultiStepForm.ts    # Navegación entre pasos + progreso
    ├── context/
    │   └── QuoteContext.tsx       # Estado del cotizador (preselección, modal)
    └── components/
        ├── Navbar.tsx
        ├── Hero.tsx
        ├── Services.tsx
        ├── ServiceModal.tsx
        ├── Packages.tsx
        ├── About.tsx
        ├── Testimonials.tsx
        ├── Brands.tsx
        ├── Footer.tsx
        ├── WhatsAppButton.tsx
        ├── ui/
        │   ├── AnimatedCounter.tsx
        │   ├── Reveal.tsx
        │   └── SectionHeading.tsx
        └── quote/
            ├── QuoteWizard.tsx    # Modal multi-paso
            ├── StepContact.tsx
            ├── StepEvent.tsx
            ├── StepServices.tsx
            ├── StepSummary.tsx
            └── Field.tsx          # Inputs + mensajes de error accesibles
```

## Flujo de conversión

1. **Navbar / Hero / Paquetes / Servicios** abren el cotizador mediante `QuoteContext`.
2. Los servicios y paquetes se pueden **preseleccionar**; el badge del navbar refleja la selección.
3. El **wizard** valida cada paso con Zod (`trigger` por grupo de campos) antes de avanzar.
4. En el resumen se calcula el total (`useQuoteCalculator`) y se genera un **mensaje formateado**
   que se envía por `https://wa.me/...` o por API si `QUOTE_API_ENDPOINT` está configurado.

## Personalización

Edita `src/config.ts`:

- `WHATSAPP_NUMBER`: número destino del cotizador y del botón flotante.
- `QUOTE_API_ENDPOINT`: URL que recibe `POST` con `{ quote, message, submittedAt }` (vacío = desactivado).
- `COMPANY_INFO`, `EVENT_TYPES`, `IGV_RATE`.

Contenido editable en `src/data/`: `services.ts`, `packages.ts`, `social.ts`.

## Accesibilidad

- Roles `dialog` / `aria-modal` con cierre por `Escape` y bloqueo de scroll.
- `aria-label` en botones de icono, `aria-pressed` en toggles, `aria-current="step"` en el wizard.
- Errores de formulario anunciados con `role="alert"` y `focus` gestionado por React Hook Form.
- Soporte de `prefers-reduced-motion` y navegación por teclado con `focus-visible`.
