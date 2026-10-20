# Rol

Actúa como un **experto en diseño web** (UI/UX + desarrollo frontend) durante todo este proyecto — no solo como implementador que traduce el mockup a código línea por línea. Eso significa: cuando el diseño tenga una ambigüedad, un hueco de responsive/mobile, una jerarquía visual mejorable o un detalle de accesibilidad no resuelto, se espera criterio propio de diseño (justificado, no arbitrario) en vez de rellenar con el valor más literal posible. Señala explícitamente cuando tomes una decisión de diseño no especificada en el mockup, y por qué.

---

# Proyecto

Fishing Trips Marbella — reconstrucción de la web actual (WordPress + Elementor, `fishingtripsmarbella.com`) como **HTML5 + CSS + JS de producción**, a partir de un **diseño ya maquetado** (`design/Main.dc.html`), con foco explícito en **conversión a reserva vía WhatsApp**.

Este documento sustituye cualquier planteamiento anterior de reconstrucción "1:1 desde el backup de WordPress". El punto de partida ya no es el sitio antiguo, sino el diseño nuevo. El sitio antiguo se usa **solo como banco de contenido real** (textos EN/ES ya redactados) y como registro de bugs a no arrastrar.

---

# Ask Claude — Prompt de arranque

Esta sección es la primera que Claude Code debe procesar en cualquier sesión nueva de este proyecto.

## 0. Objetivo de conversión principal

```
Objetivo de conversión principal:
☑ Lead vía WhatsApp — CTA "Reservar Pesca" repetido en cada sección del diseño
```

**Importante:** en el archivo de diseño (`design/Main.dc.html`) todos los botones "Reservar Pesca" tienen `href="#"` (son 15 enlaces placeholder — ver auditoría abajo). En la versión de producción, **todos** deben apuntar al widget de WhatsApp real (ver sección "Widget de WhatsApp — especificación técnica" más abajo, con el código completo embebido en este mismo documento), no a un `#` ni a un enlace directo `wa.me`/`api.whatsapp.com` simple. **No sustituir el widget existente por un enlace directo simplificado.**

## 1. Orden de lectura obligatorio

1. Este documento completo, de arriba a abajo
2. `design/Main.dc.html` — el diseño de referencia visual, ver sección "Cómo tratar el archivo de diseño"
3. Carpeta `images/` — **aquí están todas las imágenes reales del sitio** (hero, galería de capturas, guía, barco, marina, logos, iconos). Todo `<img src="...">` de producción debe apuntar a un archivo real dentro de esta carpeta (ya optimizado a WebP, ver sección "Rendimiento e imágenes"), nunca a los `.jpg`/`.png` sueltos que trae el export del mockup ni a rutas inventadas
4. `buyer-persona-marbella.md` — la psicología de conversión que debe guiar el copy y las decisiones de UX que el diseño no resuelve por sí solo
5. Sección "Contenido real a reutilizar" de este documento (textos EN/ES ya redactados y probados en el sitio actual)
6. Sección "Bugs conocidos del sitio actual — no replicar" de este documento
7. Estado actual del repo de destino (si ya hay HTML/CSS/JS generado, qué está hecho y qué falta)

## 2. Prompt de arranque (literal, se pega en la primera sesión)

> Actúa como un experto en diseño web (UI/UX + frontend) durante todo este proyecto, no como un implementador literal del mockup. Antes de escribir ningún código, inspecciona completo `CLAUDE.md`, el diseño en `design/Main.dc.html` y `buyer-persona-marbella.md`. Después:
>
> 1. Resume en 5-6 líneas qué secciones identificas en el diseño y en qué orden aparecen
> 2. Extrae del `<script data-dc-script>` del diseño los valores reales de las variables de marca (`accent`, `accent2`) y del resto del HTML el sistema de diseño completo (tipografías, tamaños, espaciados, radios, sombras) — no inventes valores, usa los que ya están en los `style="…"` inline
> 3. Lista los `href="#"` y contenido placeholder del diseño que hay que sustituir por funcionalidad real (ver sección "Del mockup a producción")
> 4. Señala cualquier discrepancia que veas entre el copy del diseño y el copy real del sitio actual (sección "Contenido real a reutilizar") antes de decidir cuál usar
> 5. Pregúntame explícitamente por las **preguntas de bloqueo** de la sección 3 antes de generar ningún archivo final
> 6. Propón un plan de construcción por fases (ver sección "Fases de construcción") y espera mi confirmación antes de empezar

## 3. Preguntas de bloqueo

| Pregunta | Estado |
|---|---|
| ¿Marca definitiva: "Fishing Trips Marbella" o "Fishing Trips Málaga"? | ✅ **Resuelto: "Fishing Trips Marbella".** Cualquier mención a "Málaga" en el copy, el diseño heredado o el sitio antiguo (incluido el bullet que dice "en Málaga") debe corregirse a "Marbella" |
| Dirección canónica del negocio | ✅ **Resuelto.** Ver "Datos ya confirmados", usar en todos lados, incluido schema `LocalBusiness` y Google Maps |
| Capacidad real del barco | ✅ **Resuelto: 5 personas + patrón** (decisión de Kike, 20/10/2026; antes 6), en todos lados (specs del barco, FAQ, cualquier mención). El diseño actual dice 7 en dos sitios (barra de stats y ficha técnica) — **corregir a 5 + patrón al pasar a producción**, no eran datos correctos |
| Instagram oficial | ✅ **Resuelto.** Ver "Datos ya confirmados" |
| Testimonios: ¿hardcodeados o embed en vivo? | ✅ **Resuelto: hardcodear una selección curada de reseñas reales**, con proceso de actualización manual periódica. No usar plugin/embed en vivo |
| Idiomas: ¿solo ES/EN o se añaden más? | ✅ **Resuelto: solo ES y EN**, no se añaden más idiomas por ahora |
| Presupuesto de peso de página: ¿"<100KB" es por imagen o el total de la página? | ✅ **Resuelto: por imagen**, no el total de la página |
| ¿El eyebrow/kicker sobre el H1 debe ser un `<h2>` o queda como texto sin heading? | Sigue abierta, no bloqueante para empezar — decidir durante la Fase 2 (maquetación de Home) |
| ¿GTM/GA4 se mantiene igual que en el sitio actual? | **Aparcado.** De momento no se toca analítica/tracking — la prioridad es cerrar el diseño y la maquetación primero. Se retoma en una fase posterior, fuera del alcance de este documento por ahora |
| Hosting de destino | ✅ **Resuelto: Vercel** (no Hostinger) |

## 4. Datos ya confirmados por Kike — fuente única de verdad

> Estos datos ya están cerrados. Cualquier mención en el diseño, en el sitio antiguo o en contenido previo que los contradiga (ver "Bugs conocidos del sitio actual") **está equivocada y debe corregirse**, no respetarse.

- **Dirección canónica (usar siempre, sin variaciones):** Puerto deportivo Marina La Bajadilla, 29603 Marbella, Málaga
- **Enlace de la dirección:** siempre la ficha real de Google — `https://maps.app.goo.gl/8U9EbCWF8f1QCgRJ9` (no un iframe de Maps genérico ni una URL de búsqueda por texto)
- **Teléfono/WhatsApp:** `+34 686 68 33 73` (mismo número en todo el sitio)
- **Capacidad del barco:** 5 personas + patrón (no 6 ni 7)
- **Instagram oficial:** `fishing_trips_marbella`
- **Testimonios:** selección curada y hardcodeada de reseñas reales, no embed en vivo — actualización manual periódica
- **Idiomas del sitio:** ES y EN únicamente
- **Presupuesto de imagen:** <100KB por imagen optimizada (no es un límite de peso total de página)
- **Hosting:** Vercel
- **Marca:** ✅ **"Fishing Trips Marbella"** — resuelto, ver pregunta de bloqueo #1

---

# Cómo tratar el archivo de diseño (`design/Main.dc.html`)

Este archivo **no es código de producción**. Es la exportación de un canvas de diseño visual (indicado explícitamente en su propio `README.md`: *"Treat it as a REFERENCE MOCKUP, not production code"*). Antes de tocar nada, ten en cuenta:

- Usa variables de plantilla `{{accent}}` y `{{accent2}}` que se resuelven en tiempo de ejecución vía el `<script data-dc-script>` al final del archivo — ahí están los valores reales por defecto: `accent: '#FC9802'`, `accent2: '#22BFFF'`. En producción, estas deben convertirse en variables CSS reales (`--accent`, `--accent2`), no dejarse como placeholders sin resolver.
- Usa `sc-for` para repetir elementos (la lista de bullets, las estrellas) — en producción esto es HTML estático repetido a mano o generado desde un array de datos en JS, no una directiva de plantilla viva.
- Tiene **15 enlaces `href="#"`** — todos los CTAs "Reservar Pesca", el logo, los links del footer, "Ver más reseñas", "Google Maps", "este enlace" (puerto deportivo). Todos deben resolverse a su destino real en producción (ver sección "Del mockup a producción").
- El copy de algunas tarjetas está **abreviado a propósito** para que quepa visualmente en el mockup (p. ej. "Cuéntanos qué tipo de pesca te interesa y nos adaptamos a ti." es una versión corta de un párrafo más largo que sí existe en el sitio real). No asumas que el copy del mockup es el copy final — cotéjalo con la sección "Contenido real a reutilizar" de este documento y con el buyer persona antes de dar por bueno un texto corto.
- Todos los valores de color, tamaño de espaciado, radio de borde y sombra sí son intencionales y deben respetarse con precisión — son la razón principal por la que se hizo este mockup. **Excepción: la tipografía.** El mockup usa `Playfair Display` + `Work Sans`, pero Kike ha pedido expresamente sustituirla por **Poppins** en toda la web — ver la tabla de tipografía en "Sistema de diseño" para los valores exactos de familia/peso/tamaño que mandan sobre el mockup.

---

# Buyer Persona

Ver `buyer-persona-marbella.md` (documento completo). Resumen operativo para quien construya el copy y el layout:

- El usuario no compra "4 horas en un barco", compra una experiencia emocional (aventura + pertenencia + recuerdo). El diseño ya apunta bien a esto (fotos de familias/capturas reales, no solo barco), mantenerlo.
- Los 5 pilares a reforzar en el copy final: **Pesca — Diversión — Seguridad — Facilidad — Experiencia local**.
- Las objeciones clave que cada sección del diseño debe seguir resolviendo (ver mapeo sección a sección más abajo): miedo a no pescar nada, "no sé pescar", seguridad, credibilidad, precio percibido, costes ocultos, mal tiempo, mareo.
- El WhatsApp es el microcompromiso para indecisos — debe estar presente en cada sección de CTA del diseño (ya lo está), no solo en el header.

---

# Estructura de secciones de la Home (según el diseño, en orden)

| # | Sección (diseño) | Qué objeción/deseo del buyer persona resuelve |
|---|---|---|
| 1 | Hero (foto full-bleed, H1, párrafo, CTA, trust row GYG/Google/TripAdvisor + estrellas + "+200 pescadores") | "¿Es esto para mí?" + prueba social inmediata |
| 2 | Charter intro (imagen + bullets con check, badge flotante "+2 años") | Credibilidad de empresa + deseo de pertenencia (amigos/familia) |
| 3 | Barra de stats (4 iconos: técnicas, equipo, especies, capacidad) sobre fondo navy | Refuerzo rápido de "todo incluido" y variedad |
| 4 | Banner CTA intermedio (foto full-bleed + overlay cian + "Únete a las +200 personas") | Pertenencia + segundo microcompromiso de WhatsApp |
| 5 | "¿Cómo reservar?" — 4 pasos numerados | Reduce fricción de "¿en qué me estoy metiendo?" |
| 6 | "¿Por qué elegir nuestro charter?" — foto + grid 2×2 con 4 razones | "¿Sabéis pescar de verdad?" + credibilidad técnica |
| 7 | Galería de capturas (grid 3×3) | "Yo quiero hacer eso" — la recompensa psicológica de la captura |
| 8 | Puerto deportivo (imagen + texto) | Fricción práctica — "¿dónde es esto exactamente?" |
| 9 | Guía local + sponsor Yamaha | Autoridad técnica ante el pescador experimentado (Perfil B) |
| 10 | Testimonios (3 reseñas reales + "Ver más") | "Necesito ver que a otros les ha funcionado" |
| 11 | Barco/seguridad (foto + ficha técnica en card navy) | "¿Es realmente seguro?" — la tecnología como prueba, no como mensaje principal |
| 12 | FAQ (acordeón) | Objeciones concretas finales antes de decidir |
| 13 | Footer (marca, enlaces, contacto) | Cierre + datos de contacto |

**Huecos respecto al buyer persona a decidir antes de dar la Home por completa:** el diseño no incluye todavía una sección explícita de **"Todo incluido"** con ese rótulo visible (aparece diluido dentro de "¿Por qué elegir?"), ni la **política de mal tiempo** como bloque propio, ni una **FAQ de mareo** visible en las preguntas que sí aparecen en el diseño (el sitio actual sí las tenía). Recomendación: al escribir el copy final de la sección FAQ, priorizar que estas entren entre las visibles antes del "leer más", ya que el análisis de buyer persona las marca como objeciones de alto impacto.

---

# Bugs conocidos del sitio actual — no replicar

Detectados auditando `fishingtripsmarbella.com` en vivo (EN y ES). Ninguno debe pasar a la versión nueva:

- **CTA roto a dominio de plantilla**: los botones "Contáctanos" / "Make a appointment" apuntan a `themetechmount.com/wordpress/aqovo/...` (el dominio de la plantilla original de Elementor), no a un destino real.
- **Enlace de Google Maps roto con placeholder literal sin resolver**: en la versión ES, el enlace "Google Maps" apunta a `http://LUGAR PUERTO DEPORTIVO DE MARBELLA VIRGEN DEL CARMEN, S-N, 29602 Marbella, Málaga` — un placeholder de texto que nunca se sustituyó por una URL real.
- **Dirección inconsistente entre idiomas**: EN dice "Puerto Pesquero La Bajadilla, s/n, 29603 Marbella"; ES dice "Virgen del Carmen, S/N, 29602 Marbella" — direcciones y códigos postales distintos.
- **Instagram inconsistente entre idiomas**: EN enlaza a `instagram.com/fishingtrips_malaga`; ES enlaza a `instagram.com/fishing_trips_marbella`.
- **Mezcla de marca Marbella/Málaga dentro de la propia versión en español**: el footer dice literalmente *"Vive una excursión de pesca en Málaga con Fishing Trips Málaga"* en una web cuyo dominio, título y H1 dicen Marbella.
- **Capacidad del barco inconsistente**: la sección de specs dice "Capacidad para 7 personas"; una FAQ de la misma página dice "homologado para un máximo de 6 personas".
- **Typo conocido** en la página de contacto ("Conctact Us" en title/H1/meta, según auditoría previa).

---

# Contenido real a reutilizar

> El copy del diseño está abreviado para maquetar. El copy final de producción debe partir del contenido real ya redactado y probado en el sitio actual (más completo, ya en tono correcto), ajustado con lo aprendido del buyer persona — no del texto corto del mockup.

Fuente: contenido en vivo de `fishingtripsmarbella.com` (EN) y `fishingtripsmarbella.com/es/` (ES), ya auditado. Incluye textos completos de: hero, "Tu charter de pesca", los 4 pasos de reserva, "Todo incluido" (4 bloques), sección de guía local (biografía completa del patrón, Yamaha/JLC Fishing), especificaciones técnicas del barco, y las 9-10 preguntas frecuentes completas por idioma (comida/bebida, ropa, duración, mal tiempo, mareo, material, qué hacer con la pesca, capacidad, licencia/precio).

**Nota importante:** el listado de preguntas frecuentes **no es idéntico** entre EN y ES — EN incluye una pregunta sobre licencia de pesca que ES no tiene, y ES incluye una pregunta sobre precio que EN no tiene. Decidir si se unifica un único set de FAQ para ambos idiomas (recomendado, más fácil de mantener y evita contradicciones como la de la capacidad) o si se mantiene la diferencia intencionadamente.

---

# Del mockup a producción — funcionalidad que hay que construir

El diseño es estático (HTML con estilos inline). Nada de esto existe todavía como funcionalidad real y hay que construirlo:

1. **Widget de WhatsApp real** en lugar de los 15 `href="#"` de los botones "Reservar Pesca" — ver sección dedicada "Widget de WhatsApp (código real ya construido)" más abajo. El código ya existe, completo y probado — no se reescribe desde cero, se integra tal cual
2. **Acordeón funcional de FAQ** — en el diseño, cada fila de FAQ solo tiene una flecha decorativa (`<svg>` con `polyline`), sin JS de expandir/colapsar ni contenido de respuesta oculto.
3. **Selector de idioma funcional** — en el diseño, "ES/EN" es solo texto estático en el header; hay que enlazarlo a las rutas reales (`/` y `/es/`, o al revés según lo que se confirme, ver Multi-idioma).
4. **Banner de cookies GDPR** — no existe en el diseño (es un mockup de la página, no incluye overlays de consentimiento). Ver sección dedicada abajo.
5. **Botón "Ver más reseñas"** — decidir si pagina más testimonios hardcodeados o enlaza directamente a la ficha de Google.
6. **Enlaces reales del footer y de la sección del puerto deportivo** (Google Maps, política de privacidad, política de cookies, enlace al puerto deportivo).
7. **Lightbox opcional en la galería** de capturas (3×3) — el diseño solo maqueta las 9 imágenes en grid, sin comportamiento de ampliar al clic.

---

# Widget de WhatsApp — especificación técnica (código real)

El siguiente bloque **es el widget completo, real y ya probado en producción** — vanilla JS, sin dependencias externas, autocontenido en un único `<div class="sf-wa-float">`. **No es un placeholder ni un ejemplo: se integra tal cual, una sola vez, a nivel de todo el sitio** (parcial/include global, justo antes de cerrar `</body>` en la plantilla base de cada página, EN y ES).

**Número de WhatsApp:** `+34 686 68 33 73` → ya está correctamente puesto en el código como `NUMERO_WHATSAPP = "34686683373"` (formato internacional sin `+`). **Verificado, no requiere cambio.**

**⚠️ Pendiente de decisión — campo "Puerto de salida" (Málaga/Marbella):** el formulario tiene un selector con dos opciones reales, `Málaga` y `Marbella` (`name="sfPuerto"`, valores `malaga`/`marbella`), pensado para cuando el negocio operaba desde dos puertos distintos. Ahora que la dirección canónica es un único puerto (Marina La Bajadilla, Marbella), este campo probablemente ya no tiene sentido tal cual — **no es una simple sustitución de texto** (no se puede poner "Marbella" en las dos opciones, quedarían duplicadas y rotas). Antes de publicar, confirmar con Kike si:
  - (a) el negocio sigue saliendo realmente desde dos puertos → se deja el campo tal cual, ambos nombres son correctos porque describen ubicaciones reales distintas, o
  - (b) solo se opera desde Marbella → se elimina el campo `sfPuerto` por completo (el `<div class="sf-wa-float__radio-group">` del puerto, su `<label>`, y las referencias a `puertoValue`/`puertoLabel`/`puertoMalaga`/`puertoMarbella` en el JS y en `I18N`)

  Mientras no se confirme, **no eliminar el campo por iniciativa propia** — es la única mención real a "Málaga" que queda en todo el proyecto y podría ser un dato operativo legítimo, no un residuo de marca a corregir.

**Qué hace (el resto, sin cambios):**
- Botón flotante circular verde (`#25D366`) fijo abajo-derecha, que abre un panel con mini-formulario
- Campos: nombre, selector de fechas (calendario propio hecho a mano, sin librería externa tipo Flatpickr — precisamente para evitar el problema ya conocido de Flatpickr cargando sin su CSS), franja horaria (7:30h / 12:00h, radio buttons), número de personas (1-5), puerto de salida (ver aviso arriba), duda opcional
- Al enviar: genera un mensaje de WhatsApp pre-rellenado y abre `https://api.whatsapp.com/send/?phone=...&text=...`
- Detecta idioma por la URL: si el path empieza por `/en/` (o es exactamente `/en`), inglés; en cualquier otro caso, español — coherente con la estructura real de rutas (`/` = ES, `/en/` = EN). No usar `includes()`: también casaría con rutas españolas que contengan "/en" o "/es" en otra posición
- Genera un código de lead único tipo `FTWEB` + fecha (AAMMDD) + 3 dígitos aleatorios (ej. `FTWEB260807482`) — decisión de diseño documentada en el propio código: evita depender de `localStorage` para contadores secuenciales, que no persiste de forma fiable
- Captura y persiste UTMs de campañas (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`) en `localStorage`, y los añade al mensaje de WhatsApp y al evento de analítica si existen
- Dispara `window.dataLayer.push({ event: "whatsapp_lead", ... })` con todos los datos del lead — el `dataLayer.push` no requiere que GTM esté instalado para no fallar (es solo un array), así que puede quedar activo aunque GTM esté aparcado por ahora (ver preguntas de bloqueo)
- Expone `window.sfAbrirFormularioWhatsApp()` y la clase CSS `sf-wa-trigger`: **cualquier botón "Reservar Pesca" del diseño** (los 15 `href="#"`) debe usar uno de estos dos mecanismos para abrir el panel — no crear un segundo sistema de apertura distinto

**Integración con el diseño nuevo:**
- Todos los CTAs "Reservar Pesca" del mockup (`href="#"`) → añadir la clase `sf-wa-trigger` (o `onclick="sfAbrirFormularioWhatsApp()"` si el botón no es un `<a>`/`<button>` simple)
- El widget ya trae sus propios estilos con `!important` agresivo pensados para sobrevivir dentro de un WordPress con CSS de tema invasivo — en un HTML5 de producción limpio esto ya no es estrictamente necesario, pero **no hay que quitarlo**: no genera conflicto y es más seguro mantenerlo por si en el futuro el widget se reutiliza en otro contexto
- El widget usa su propia paleta (verde WhatsApp `#25D366`), independiente de `--accent`/`--accent2` del sitio — es intencional, no un error de diseño a corregir

**Código completo (copiar tal cual, sin reescribir):**

```html
<!--
  Botón flotante + mini-formulario de WhatsApp para FishingTripsMarbella.com
  Textos en ES/EN según si el path de la página contiene "/es".
  Insertar UNA VEZ, a nivel de todo el sitio (footer global).
-->
<div class="sf-wa-float">
<style>
  .sf-wa-float * { box-sizing: border-box !important; }

  .sf-wa-float button {
    -webkit-appearance: none !important;
    appearance: none !important;
    box-shadow: none !important;
    text-transform: none !important;
    font-family: inherit !important;
    letter-spacing: normal !important;
  }

  .sf-wa-float__button {
    position: fixed !important; right: 20px !important; bottom: 20px !important; z-index: 2147483647 !important;
    width: 60px !important; height: 60px !important; min-width: 60px !important; min-height: 60px !important;
    max-width: 60px !important; max-height: 60px !important;
    border-radius: 50% !important;
    background-color: #25D366 !important;
    border: none !important; margin: 0 !important; padding: 0 !important; cursor: pointer !important;
    box-shadow: 0 2px 8px rgba(0,0,0,0.25) !important;
    display: flex !important; align-items: center !important; justify-content: center !important;
  }
  .sf-wa-float__button svg {
    width: 30px !important; height: 30px !important; fill: #fff !important; pointer-events: none !important;
  }

  .sf-wa-float__panel {
    position: fixed !important; right: 20px !important; bottom: 92px !important; z-index: 2147483647 !important;
    width: 320px !important; max-width: calc(100vw - 40px) !important;
    max-height: 80vh !important; overflow-y: auto !important;
    background: #fff !important; border-radius: 10px !important;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2) !important;
    padding: 16px !important; display: none;
    font-family: inherit !important;
  }
  .sf-wa-float__panel.sf-open { display: block !important; }

  .sf-wa-float__header {
    display: flex !important; justify-content: space-between !important; align-items: center !important;
    margin-bottom: 8px !important;
  }
  .sf-wa-float__header .sf-wa-float__title { font-size: 16px !important; margin: 0 !important; color: #222 !important; font-weight: bold !important; }
  .sf-wa-float__close {
    background: none !important; border: none !important; width: auto !important; height: auto !important;
    min-width: 0 !important; min-height: 0 !important; border-radius: 0 !important;
    font-size: 20px !important; line-height: 1 !important;
    cursor: pointer !important; color: #888 !important; padding: 4px !important; margin: 0 !important;
  }

  .sf-wa-float label {
    display: block !important; margin-top: 10px !important; margin-bottom: 0 !important;
    font-size: 13px !important; font-weight: bold !important; color: #222 !important; line-height: 1.3 !important;
  }
  .sf-wa-float input:not([type="radio"]):not([type="checkbox"]),
  .sf-wa-float select {
    width: 100% !important; padding: 7px !important; margin-top: 3px !important; margin-bottom: 0 !important;
    font-size: 13px !important; line-height: 1.3 !important; height: auto !important;
    border: 1px solid #ccc !important; border-radius: 4px !important; box-shadow: none !important;
    color: #222 !important; background-color: #fff !important; box-sizing: border-box !important;
    -webkit-appearance: none !important; appearance: none !important;
  }
  .sf-wa-float__hint {
    font-size: 11px !important; color: #888 !important; margin-top: 3px !important;
  }
  .sf-datepicker {
    display: none;
    margin-top: 6px !important;
    border: 1px solid #ddd !important;
    border-radius: 6px !important;
    padding: 10px !important;
    background: #fafafa !important;
  }
  .sf-datepicker.sf-open { display: block !important; }
  .sf-datepicker__header {
    display: flex !important; align-items: center !important; justify-content: space-between !important;
    margin-bottom: 8px !important;
  }
  .sf-datepicker__header button {
    background: none !important; border: none !important; width: auto !important; height: auto !important;
    min-width: 0 !important; min-height: 0 !important; border-radius: 0 !important;
    cursor: pointer !important; font-size: 16px !important; color: #222 !important; padding: 2px 8px !important; margin: 0 !important;
  }
  .sf-datepicker__header span {
    font-size: 13px !important; font-weight: bold !important; color: #222 !important;
  }
  .sf-datepicker__weekdays, .sf-datepicker__days {
    display: grid !important; grid-template-columns: repeat(7, 1fr) !important; gap: 2px !important;
  }
  .sf-datepicker__weekdays div {
    font-size: 10px !important; text-align: center !important; color: #888 !important; padding: 2px 0 !important;
  }
  .sf-datepicker__days button {
    width: 100% !important; height: auto !important; min-width: 0 !important; min-height: 0 !important;
    aspect-ratio: 1 !important; border: none !important; background: none !important; margin: 0 !important;
    border-radius: 4px !important; cursor: pointer !important; font-size: 12px !important; color: #222 !important;
  }
  .sf-datepicker__days button:hover:not(:disabled) { background: #d9f7e3 !important; }
  .sf-datepicker__days button:disabled {
    color: #ccc !important; cursor: default !important;
  }
  .sf-datepicker__days button.sf-empty { visibility: hidden !important; cursor: default !important; }
  .sf-datepicker__days button.sf-selected {
    background-color: #25D366 !important; color: #fff !important;
  }
  .sf-datepicker__days button.sf-in-range {
    background-color: #d9f7e3 !important;
  }
  .sf-datepicker__footer {
    display: flex !important; justify-content: flex-end !important; margin-top: 8px !important;
  }
  .sf-datepicker__footer button {
    background-color: #25D366 !important; color: #fff !important;
    border: none !important; width: auto !important; height: auto !important;
    min-width: 0 !important; min-height: 0 !important;
    border-radius: 4px !important; padding: 6px 12px !important; margin: 0 !important;
    font-size: 12px !important; cursor: pointer !important;
  }
  .sf-wa-float__radio-group {
    display: flex !important; gap: 14px !important; margin-top: 6px !important;
  }
  .sf-wa-float__radio-group label {
    display: flex !important; align-items: center !important; gap: 5px !important;
    font-weight: normal !important; margin-top: 0 !important; font-size: 13px !important;
  }
  .sf-wa-float__radio-group input[type="radio"] {
    width: auto !important; height: auto !important; margin: 0 !important; padding: 0 !important;
    -webkit-appearance: auto !important; appearance: auto !important;
    border: none !important; background: none !important; box-shadow: none !important;
    accent-color: #25D366 !important;
  }
  .sf-wa-float button[type="submit"] {
    margin-top: 14px !important; width: 100% !important; height: auto !important;
    min-width: 0 !important; min-height: 0 !important;
    padding: 10px !important; font-size: 14px !important;
    background-color: #25D366 !important; color: #fff !important; border: none !important; border-radius: 6px !important; cursor: pointer !important;
    display: flex !important; align-items: center !important; justify-content: center !important; gap: 8px !important;
  }
  .sf-wa-float button[type="submit"]:hover { background-color: #1ebe57 !important; }
  .sf-wa-float button[type="submit"] svg { width: 18px !important; height: 18px !important; fill: #fff !important; flex-shrink: 0 !important; }
  .sf-wa-float #sf-preview { margin-top: 10px !important; font-size: 11px !important; color: #666 !important; word-break: break-all !important; }
</style>

<button type="button" class="sf-wa-float__button" id="sfWaToggle" aria-label="WhatsApp">
  <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.07L2 22l5.05-1.35C8.5 21.5 10.2 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.2 14.2c-.22.62-1.28 1.18-1.77 1.24-.45.06-1 .08-1.62-.1-.37-.11-.85-.27-1.46-.53-2.58-1.11-4.26-3.7-4.4-3.87-.13-.17-1.05-1.4-1.05-2.67 0-1.27.67-1.9.9-2.16.24-.26.52-.33.7-.33h.5c.16 0 .38-.06.6.46.22.53.75 1.83.82 1.96.07.13.11.29.02.46-.09.17-.13.28-.26.43-.13.15-.27.34-.39.46-.13.13-.26.27-.11.53.15.26.66 1.09 1.42 1.76.98.87 1.8 1.14 2.06 1.27.26.13.41.11.56-.07.15-.17.65-.76.82-1.02.17-.26.34-.22.57-.13.24.09 1.5.71 1.76.84.26.13.43.19.5.3.06.11.06.62-.16 1.24z"/></svg>
</button>

<div class="sf-wa-float__panel" id="sfWaPanel">
  <div class="sf-wa-float__header">
    <div class="sf-wa-float__title" data-i18n="title">Información por WhatsApp</div>
    <button type="button" class="sf-wa-float__close" id="sfWaClose" aria-label="Close">&times;</button>
  </div>

  <form id="sfLeadForm">
    <label data-i18n="labelNombre" for="sfNombre">Nombre</label>
    <input type="text" id="sfNombre" required data-i18n-ph="phNombre" placeholder="Tu nombre">

    <label data-i18n="labelFechas" for="sfFechas">Disponibilidad de fechas</label>
    <input type="text" id="sfFechas" required data-i18n-ph="phFechas" placeholder="Selecciona tus fechas disponibles" autocomplete="off" readonly>
    <div class="sf-wa-float__hint" data-i18n="hintFechas">Puedes seleccionar varios días si aún no tienes uno fijo</div>
    <div class="sf-datepicker" id="sfDatepicker">
      <div class="sf-datepicker__header">
        <button type="button" id="sfDpPrev">&#8249;</button>
        <span id="sfDpLabel"></span>
        <button type="button" id="sfDpNext">&#8250;</button>
      </div>
      <div class="sf-datepicker__weekdays" id="sfDpWeekdays"></div>
      <div class="sf-datepicker__days" id="sfDpDays"></div>
      <div class="sf-datepicker__footer">
        <button type="button" id="sfDpDone" data-i18n="btnDone">Hecho</button>
      </div>
    </div>

    <label data-i18n="labelHora">Hora</label>
    <div class="sf-wa-float__radio-group">
      <label><input type="radio" name="sfHora" value="0730" checked> <span data-i18n="hora0730">7:30h</span></label>
      <label><input type="radio" name="sfHora" value="1200"> <span data-i18n="hora1200">12:00h</span></label>
    </div>

    <label data-i18n="labelPersonas" for="sfPersonas">Número de personas</label>
    <input type="number" id="sfPersonas" min="1" max="5" step="1" required data-i18n-ph="phPersonas" placeholder="Ej: 4">

    <label data-i18n="labelPuerto">Puerto de salida</label>
    <div class="sf-wa-float__radio-group">
      <label><input type="radio" name="sfPuerto" value="malaga" checked> <span data-i18n="puertoMalaga">Málaga</span></label>
      <label><input type="radio" name="sfPuerto" value="marbella"> <span data-i18n="puertoMarbella">Marbella</span></label>
    </div>

    <label data-i18n="labelDuda" for="sfDuda">¿Alguna duda? (opcional)</label>
    <input type="text" id="sfDuda" data-i18n-ph="phDuda" placeholder="Ej: ¿incluye el material de pesca?">

    <button type="submit" id="sfWaSubmit">
      <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.07L2 22l5.05-1.35C8.5 21.5 10.2 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm5.2 14.2c-.22.62-1.28 1.18-1.77 1.24-.45.06-1 .08-1.62-.1-.37-.11-.85-.27-1.46-.53-2.58-1.11-4.26-3.7-4.4-3.87-.13-.17-1.05-1.4-1.05-2.67 0-1.27.67-1.9.9-2.16.24-.26.52-.33.7-.33h.5c.16 0 .38-.06.6.46.22.53.75 1.83.82 1.96.07.13.11.29.02.46-.09.17-.13.28-.26.43-.13.15-.27.34-.39.46-.13.13-.26.27-.11.53.15.26.66 1.09 1.42 1.76.98.87 1.8 1.14 2.06 1.27.26.13.41.11.56-.07.15-.17.65-.76.82-1.02.17-.26.34-.22.57-.13.24.09 1.5.71 1.76.84.26.13.43.19.5.3.06.11.06.62-.16 1.24z"/></svg>
      <span data-i18n="btnSubmit">Continuar a WhatsApp</span>
    </button>
  </form>

  <div id="sf-preview"></div>
</div>

<script>
(function () {
  const NUMERO_WHATSAPP = "34686683373";

  const isEN = /^\/en(\/|$)/.test(window.location.pathname);

  (function capturarUTMs() {
    const params = new URLSearchParams(window.location.search);
    if (params.has("utm_source")) {
      const utm = {
        utm_source: params.get("utm_source") || "",
        utm_medium: params.get("utm_medium") || "",
        utm_campaign: params.get("utm_campaign") || "",
        utm_term: params.get("utm_term") || "",
        utm_content: params.get("utm_content") || ""
      };
      localStorage.setItem("ft_utm", JSON.stringify(utm));
    }
  })();

  function obtenerUTMsGuardados() {
    try {
      const raw = localStorage.getItem("ft_utm");
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  const I18N = {
    es: {
      title: "Información por WhatsApp",
      labelNombre: "Nombre", phNombre: "Tu nombre",
      labelFechas: "Disponibilidad de fechas",
      phFechas: "Selecciona tus fechas disponibles",
      hintFechas: "Puedes seleccionar varios días si aún no tienes uno fijo",
      btnDone: "Hecho",
      meses: ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
      diasSemana: ["L","M","X","J","V","S","D"],
      mesesAbrev: ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],
      labelHora: "Hora", hora0730: "7:30h", hora1200: "12:00h",
      labelPersonas: "Número de personas", phPersonas: "Ej: 4",
      labelPuerto: "Puerto de salida", puertoMalaga: "Málaga", puertoMarbella: "Marbella",
      labelDuda: "¿Alguna duda? (opcional)", phDuda: "Ej: ¿incluye el material de pesca?",
      btnSubmit: "Continuar a WhatsApp",
      rangeSeparator: " al ",
      msgSaludo: (n) => `Hola! Soy ${n}.`,
      msgCuerpo: (f1, f2, h, p, pt) => f1 === f2
        ? `Quiero información sobre la excursión de pesca del ${f1} a las ${h} para ${p} persona(s), saliendo desde el puerto de ${pt}.`
        : `Quiero información sobre la excursión de pesca. Estoy disponible entre el ${f1} y el ${f2}, prefiero la hora de las ${h}, para ${p} persona(s), saliendo desde el puerto de ${pt}.`,
      msgDuda: "Duda:", msgCodigo: "Código:"
    },
    en: {
      title: "Information via WhatsApp",
      labelNombre: "Name", phNombre: "Your name",
      labelFechas: "Date availability",
      phFechas: "Select your available dates",
      hintFechas: "You can select a range of days if you don't have a fixed date yet",
      btnDone: "Done",
      meses: ["January","February","March","April","May","June","July","August","September","October","November","December"],
      diasSemana: ["M","T","W","T","F","S","S"],
      mesesAbrev: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      labelHora: "Time", hora0730: "7:30am", hora1200: "12:00pm",
      labelPersonas: "Number of people", phPersonas: "E.g. 4",
      labelPuerto: "Departure port", puertoMalaga: "Málaga", puertoMarbella: "Marbella",
      labelDuda: "Any questions? (optional)", phDuda: "E.g. is fishing gear included?",
      btnSubmit: "Continue on WhatsApp",
      rangeSeparator: " to ",
      msgSaludo: (n) => `Hi! I'm ${n}.`,
      msgCuerpo: (f1, f2, h, p, pt) => f1 === f2
        ? `I'd like information about the fishing trip on ${f1} at ${h} for ${p} people, departing from ${pt} port.`
        : `I'd like information about a fishing trip. I'm available between ${f1} and ${f2}, I'd prefer the ${h} slot, for ${p} people, departing from ${pt} port.`,
      msgDuda: "Question:", msgCodigo: "Code:"
    }
  };
  const t = isEN ? I18N.en : I18N.es;

  document.querySelectorAll(".sf-wa-float [data-i18n]").forEach(function (el) {
    el.textContent = t[el.getAttribute("data-i18n")];
  });
  document.querySelectorAll(".sf-wa-float [data-i18n-ph]").forEach(function (el) {
    el.setAttribute("placeholder", t[el.getAttribute("data-i18n-ph")]);
  });

  const toggleBtn = document.getElementById("sfWaToggle");
  const closeBtn = document.getElementById("sfWaClose");
  const panel = document.getElementById("sfWaPanel");

  toggleBtn.addEventListener("click", function () {
    panel.classList.toggle("sf-open");
  });
  closeBtn.addEventListener("click", function () {
    panel.classList.remove("sf-open");
  });

  document.addEventListener("click", function (e) {
    const trigger = e.target.closest(".sf-wa-trigger");
    if (trigger) {
      e.preventDefault();
      panel.classList.add("sf-open");
      panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
  window.sfAbrirFormularioWhatsApp = function () {
    panel.classList.add("sf-open");
  };

  function formatearFecha(d) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }
  function mismoDia(a, b) {
    return a && b && a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }

  const dpInput = document.getElementById("sfFechas");
  const dpPanel = document.getElementById("sfDatepicker");
  const dpLabel = document.getElementById("sfDpLabel");
  const dpWeekdays = document.getElementById("sfDpWeekdays");
  const dpDays = document.getElementById("sfDpDays");
  const dpPrev = document.getElementById("sfDpPrev");
  const dpNext = document.getElementById("sfDpNext");
  const dpDone = document.getElementById("sfDpDone");

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  let vistaAno = hoy.getFullYear();
  let vistaMes = hoy.getMonth();
  let selDesde = null;
  let selHasta = null;

  dpWeekdays.innerHTML = t.diasSemana.map(function (d) { return "<div>" + d + "</div>"; }).join("");

  function construirCuadricula() {
    dpLabel.textContent = t.meses[vistaMes] + " " + vistaAno;

    const primerDiaMes = new Date(vistaAno, vistaMes, 1);
    const offset = (primerDiaMes.getDay() + 6) % 7;
    const diasEnMes = new Date(vistaAno, vistaMes + 1, 0).getDate();

    let html = "";
    for (let i = 0; i < offset; i++) {
      html += '<button type="button" class="sf-empty" disabled></button>';
    }
    for (let dia = 1; dia <= diasEnMes; dia++) {
      const fecha = new Date(vistaAno, vistaMes, dia);
      const deshabilitado = fecha < hoy;
      html += '<button type="button" data-dia="' + dia + '"' +
        (deshabilitado ? " disabled" : "") + ">" + dia + "</button>";
    }
    dpDays.innerHTML = html;
    actualizarClasesSeleccion();
  }

  function actualizarClasesSeleccion() {
    dpDays.querySelectorAll("button[data-dia]").forEach(function (btn) {
      const dia = parseInt(btn.getAttribute("data-dia"), 10);
      const fecha = new Date(vistaAno, vistaMes, dia);
      btn.classList.remove("sf-selected", "sf-in-range");
      if (mismoDia(fecha, selDesde) || mismoDia(fecha, selHasta)) {
        btn.classList.add("sf-selected");
      } else if (selDesde && selHasta && fecha > selDesde && fecha < selHasta) {
        btn.classList.add("sf-in-range");
      }
    });
  }

  dpDays.addEventListener("click", function (e) {
    e.stopPropagation();
    const btn = e.target.closest("button[data-dia]");
    if (!btn || btn.disabled) return;
    const dia = parseInt(btn.getAttribute("data-dia"), 10);
    const fecha = new Date(vistaAno, vistaMes, dia);
    if (!selDesde || (selDesde && selHasta)) {
      selDesde = fecha;
      selHasta = null;
    } else if (fecha < selDesde) {
      selHasta = selDesde;
      selDesde = fecha;
    } else {
      selHasta = fecha;
    }
    actualizarInput();
    actualizarClasesSeleccion();
  });

  function actualizarInput() {
    if (!selDesde) { dpInput.value = ""; return; }
    const f1 = t.mesesAbrev[selDesde.getMonth()] + " " + selDesde.getDate();
    if (!selHasta || mismoDia(selDesde, selHasta)) {
      dpInput.value = f1 + ", " + selDesde.getFullYear();
    } else {
      const f2 = t.mesesAbrev[selHasta.getMonth()] + " " + selHasta.getDate();
      dpInput.value = f1 + t.rangeSeparator + f2 + ", " + selHasta.getFullYear();
    }
  }

  dpPrev.addEventListener("click", function (e) {
    e.stopPropagation();
    vistaMes -= 1;
    if (vistaMes < 0) { vistaMes = 11; vistaAno -= 1; }
    construirCuadricula();
  });
  dpNext.addEventListener("click", function (e) {
    e.stopPropagation();
    vistaMes += 1;
    if (vistaMes > 11) { vistaMes = 0; vistaAno += 1; }
    construirCuadricula();
  });
  dpDone.addEventListener("click", function (e) {
    e.stopPropagation();
    dpPanel.classList.remove("sf-open");
  });
  dpInput.addEventListener("click", function (e) {
    e.stopPropagation();
    dpPanel.classList.toggle("sf-open");
  });

  construirCuadricula();

  function generarCodigo() {
    const d = new Date();
    const yy = String(d.getFullYear()).slice(-2);
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const random = String(Math.floor(Math.random() * 900) + 100);
    return `FTWEB${yy}${mm}${dd}${random}`;
  }

  document.getElementById("sfLeadForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("sfNombre").value.trim();

    if (!selDesde) {
      dpPanel.classList.add("sf-open");
      dpInput.focus();
      return;
    }
    const fechaDesde = formatearFecha(selDesde);
    const fechaHasta = selHasta ? formatearFecha(selHasta) : fechaDesde;

    const horaInput = document.querySelector('input[name="sfHora"]:checked');
    const horaValue = horaInput ? horaInput.value : "0730";
    const horaLabel = horaValue === "0730" ? t.hora0730 : t.hora1200;
    const personas = document.getElementById("sfPersonas").value;
    const puertoInput = document.querySelector('input[name="sfPuerto"]:checked');
    const puertoValue = puertoInput ? puertoInput.value : "malaga";
    const puertoLabel = puertoValue === "malaga" ? t.puertoMalaga : t.puertoMarbella;
    const duda = document.getElementById("sfDuda").value.trim();

    const codigo = generarCodigo();
    const utm = obtenerUTMsGuardados();

    let mensaje = `${t.msgSaludo(nombre)} ${t.msgCuerpo(fechaDesde, fechaHasta, horaLabel, personas, puertoLabel)}\n`;
    if (duda) mensaje += `${t.msgDuda} ${duda}\n`;
    if (utm && utm.utm_campaign) {
      mensaje += `Campaña: ${utm.utm_campaign} (${utm.utm_source}/${utm.utm_medium})\n`;
    }
    mensaje += `${t.msgCodigo} ${codigo}`;

    const url = `https://api.whatsapp.com/send/?phone=${NUMERO_WHATSAPP}&text=${encodeURIComponent(mensaje)}&type=phone_number&app_absent=0`;

    document.getElementById("sf-preview").innerHTML =
      "Enlace generado (se abriría automáticamente):<br>" + url;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "whatsapp_lead",
      fecha_desde: fechaDesde,
      fecha_hasta: fechaHasta,
      hora: horaValue,
      personas: personas,
      puerto: puertoValue,
      idioma: isEN ? "en" : "es",
      codigo: codigo,
      utm_source: utm ? utm.utm_source : "",
      utm_medium: utm ? utm.utm_medium : "",
      utm_campaign: utm ? utm.utm_campaign : "",
      utm_term: utm ? utm.utm_term : "",
      utm_content: utm ? utm.utm_content : ""
    });

    setTimeout(function () {
      window.location.href = url;
    }, 250);
  });
})();
</script>
</div>
```

---

# Requisitos explícitos del cliente (nuevos, prioritarios)

## 1. Imágenes optimizadas — WebP + rendimiento

- Todas las imágenes del sitio (hero, galería de 9 capturas, fotos de secciones, logos) se sirven en **formato WebP** con fallback si hace falta compatibilidad muy antigua.
- Compresión agresiva: objetivo **por imagen** por debajo de 100KB (ver pregunta de bloqueo — el peso total de la página con hero a pantalla completa + galería de 9 fotos no es realista bajo 100KB en conjunto).
- `srcset`/`sizes` con tamaños responsive reales (no servir la imagen de 1440px de ancho del diseño a un móvil de 375px).
- `loading="lazy"` en todo lo que esté fuera del primer scroll (todo excepto el hero).
- Añadir atributos `width`/`height` explícitos en cada `<img>` para evitar Cumulative Layout Shift.
- Medir con Lighthouse/PageSpeed Insights (mobile y desktop) antes de dar por cerrada esta fase — objetivo Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms.

## 2. Banner de cookies GDPR, personalizado

- Construido a medida (vanilla JS), no un plugin de terceros pesado — coherente con el resto del sitio (sin dependencias externas salvas las estrictamente necesarias).
- Categorías mínimas, siguiendo el mismo esquema que ya usaba el sitio WordPress (para no reinventar la taxonomía legal): **Funcional** (siempre activo, no bloqueable), **Preferencias**, **Estadísticas**, **Marketing**.
- Debe bloquear la carga de cualquier script no esencial (analítica, marketing) **hasta que haya consentimiento explícito** para la categoría correspondiente — no vale cargar el tag y "no usarlo" sin consentimiento. GTM/GA4 está aparcado por ahora (ver preguntas de bloqueo), pero el banner debe quedar listo para bloquearlo en cuanto se reincorpore, sin tener que rehacerlo.
- Opciones claras: Aceptar todo / Rechazar / Ver preferencias (gestionar por categoría) — igual que el patrón ya usado en el sitio actual, en ES y EN.
- Persistir la elección (cookie propia o `localStorage`) para no volver a preguntar en cada visita, con fecha de consentimiento y posibilidad de cambiarlo después (enlace en el footer, "Gestionar cookies").
- Enlazar a Política de Privacidad y Política de Cookies reales (páginas legales — confirmar si ya existe contenido legal redactado o si hay que crearlo; no estaba resuelto en el proyecto anterior).

## 3. Sitio multi-idioma

- Mínimo confirmado: **ES y EN**, replicando la estructura actual (`/` y `/es/`, o la que se confirme como definitiva).
- `hreflang` recíproco entre ambas versiones + `x-default`.
- Selector de idioma en el header (ya está maquetado visualmente en el diseño) debe enlazar de verdad a la URL equivalente en el otro idioma — no a la home del otro idioma a secas, para no romper la experiencia si el usuario está navegando otra página.
- Contenido **no es traducción automática**: cada idioma tiene su propio copy ya redactado (ver "Contenido real a reutilizar") — mantener esa práctica, no generar ES a partir de EN por traducción literal.
- Meta title/description, Open Graph y schema duplicados y traducidos por idioma, no compartidos.
- Confirmar con Kike si el alcance es solo ES/EN o si se añaden más idiomas (ver pregunta de bloqueo) antes de dar la arquitectura de carpetas/rutas por cerrada, ya que añadir un tercer idioma después cambia cómo conviene estructurar las rutas desde el principio.

---

## 4. Favicon (logo en SERPs de Google y en la pestaña del navegador)

- Kike ya tiene generado un favicon multi-tamaño (16px a 256px, fondo negro sólido, hecho con Pillow) usado previamente en el sitio de Hostinger — reutilizarlo como base si sigue vigente con la marca ya resuelta, en vez de regenerarlo desde cero
- Debe incluir como mínimo: `favicon.ico` (multi-resolución, en la raíz del sitio), `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png` (180×180, para iOS), y un icono de al menos 48×48px en formato cuadrado — Google exige un mínimo de 48×48px (escalado desde un múltiplo de 48, ej. 96×96) para poder mostrarlo en los resultados de búsqueda (SERPs), no solo en la pestaña del navegador
- Referenciar todos los tamaños en el `<head>` con las etiquetas `<link rel="icon" ...>` correspondientes (no basta con dejar solo `favicon.ico` en la raíz si se quiere cubrir también el `apple-touch-icon` y los tamaños que pide Google)
- El favicon debe ser accesible de forma pública y no debe estar bloqueado por `robots.txt` — Google necesita poder rastrearlo para mostrarlo en los resultados
- Verificar en Google Search Console tras publicar (la aparición en SERPs no es inmediata; puede tardar días/semanas en reflejarse tras el reindexado)

---

## 5. Enlaces de teléfono y de dirección

- **Todo número de teléfono visible en la web** (footer, sección de contacto, cualquier mención de `+34 686 68 33 73`) debe ser un enlace real para llamar: `<a href="tel:+34686683373">+34 686 68 33 73</a>` — nunca texto plano sin enlazar.
- **Toda mención o enlace de la dirección del negocio** debe apuntar a la ficha real de Google del negocio: `https://maps.app.goo.gl/8U9EbCWF8f1QCgRJ9` — no a una URL de búsqueda genérica de Google Maps construida a partir del texto de la dirección, ni a un iframe embed distinto. Esto incluye el texto de la dirección en el footer, la sección del puerto deportivo, y cualquier botón "Cómo llegar" o similar.
- Si se usa un mapa embebido (`<iframe>`) en la sección del puerto deportivo, puede coexistir con el enlace de texto a la ficha de Google — pero el enlace de texto/botón siempre debe ser esa URL concreta, no una genérica.

---

# Sistema de diseño (extraído del código real del canvas)

> Estos valores están tomados directamente de `design/Main.dc.html`, no estimados a ojo. Son la fuente de verdad para el CSS de producción.

## Colores

| Token | Valor | Uso |
|---|---|---|
| `--accent` (naranja) | `#FC9802` (variantes previstas en el propio diseño: `#FF7A1A`, `#FFB347`, `#E08A00`) | CTAs primarios, iconos de línea, eyebrows/kickers, números fantasma de pasos |
| `--accent-gradient-end` | `#E08A00` | Fin del degradado en botones (`linear-gradient(180deg, accent 0%, #E08A00 100%)`) |
| `--accent2` (azul/cian) | `#22BFFF` (variantes previstas: `#0EA5E9`, `#5CD1FF`, `#0B4E75`) | Checkmarks, badges circulares, iconos de contacto en footer, fondo de sección "Puerto deportivo" |
| `--navy` (texto/títulos oscuros) | `#14203F` | H2/H3 sobre fondo claro, texto de specs del barco, tarjetas |
| `--navy-dark` (fondos oscuros) | `#0F1A33` / `#0c1a30` | Footer, overlay del hero |
| Texto secundario (grises, varios matices) | `#4A5468`, `#5A6478`, `#6B7488`, `#3E4A5E`, `#8B95A6` | Párrafos de cuerpo, texto secundario en cards — **no usar un solo gris para todo**, el diseño varía el tono ligeramente según el contexto (fondo claro vs. card) |
| Fondo crema/hueso (alterna con blanco) | `#F8F6F1`, `#FBF9F6` | Fondos de sección alternos (pasos, FAQ) para separar visualmente del blanco puro |
| Estrellas de valoración | `#FFB020` | Rating en testimonios |
| Blanco | `#FFFFFF` | Texto sobre fondos oscuros/de color, fondos de card |

## Tipografía

> ⚠️ **Override explícito del cliente — sustituye a la tipografía del mockup.** El diseño en `design/Main.dc.html` usa "Playfair Display" (títulos) + "Work Sans" (texto). Kike ha pedido expresamente usar **Poppins** en su lugar para toda la web. Esta especificación manda sobre el mockup: no se usa Playfair Display ni Work Sans en producción.

| Elemento | Familia (con fallback) | Peso | Tamaño |
|---|---|---|---|
| `p` (párrafo/cuerpo) | `Poppins, Tahoma, Geneva, sans-serif` | normal | `17px` |
| `h1` | `Poppins, Arial, Helvetica, sans-serif` | `800` | `clamp(50px, 7vw, 90px)` (fluido según ancho de viewport) |
| `h2` | `Poppins, Arial, Helvetica, sans-serif` | `600` | `33px` |
| `h3` | `Poppins, Arial, Helvetica, sans-serif` | `600` | `22px` |

Notas:
- Cargar **Poppins** desde Google Fonts (pesos 400/600/800 como mínimo, para cubrir cuerpo/H2-H3/H1) — sustituye al `<link>` de Playfair Display + Work Sans que trae el `<head>` del mockup.
- El resto de propiedades tipográficas del mockup que **no** entran en conflicto con esta tabla (line-height, letter-spacing del eyebrow/kicker, mayúsculas, etc.) sí se mantienen — el override es de familia/peso/tamaño en `p`, `h1`, `h2`, `h3`, no de todo el sistema tipográfico.
- **No está especificado el tamaño/peso de `h4`/`h5`/`h6`** (el diseño usa H3 para las tarjetas de pasos/features, así que probablemente no haga falta más profundidad, pero si aparece algún subtítulo de nivel inferior, definir por consistencia visual con esta misma escala — Poppins, peso 600, un escalón por debajo de `h3` — y confirmarlo con Kike si se da el caso).
- Revisar contraste y legibilidad del H1 en el extremo inferior del `clamp()` (50px) en pantallas pequeñas, ya que Poppins en negrita (800) a ese tamaño ocupa más ancho que Playfair Display — puede que el texto del H1 actual ("Excursiones de Pesca en Marbella") necesite un salto de línea distinto al del mockup en mobile.

## Botones

**CTA primario ("Reservar Pesca")**
- Forma de píldora (`border-radius: 999px`)
- `background: linear-gradient(180deg, var(--accent) 0%, #E08A00 100%)`
- `box-shadow: 0 14px 34px -8px rgba(252,152,2,0.55), inset 0 1px 0 rgba(255,255,255,0.35)`
- Icono circular translúcido a la izquierda con el icono de WhatsApp, texto blanco 15-16px weight 600
- Padding aprox. `17-18px 34px`

**Botón outline (header, sobre foto)**
- Borde `1.5px solid rgba(255,255,255,0.45)`, fondo transparente, píldora, texto blanco 13px weight 600

## Cards y superficies

- Radio de borde: 14px (FAQ), 18px (pasos, galería), 20-24px (imágenes grandes), 22px (panel "por qué elegir")
- Sombras suaves con offset negativo, nunca sombras duras: p. ej. `0 4px 14px -8px rgba(20,32,63,0.12)` en FAQ, `0 14px 30px -18px rgba(20,32,63,0.2)` en testimonios
- Bordes sutiles en cards claras: `1px solid rgba(20,32,63,0.08)`
- Iconos dentro de badges cuadrados redondeados (`border-radius: 10px`) con fondo `rgba(accent, 0.12)` — el icono en color `--accent`, stroke fino (1.7-2.5px), sin relleno

## Imágenes

- Radio de borde 16-24px + sombra suave en todas las fotos de contenido
- Galería de capturas: grid 3×3, `aspect-ratio: 1/0.82`, `object-fit: cover`
- Foto de familia en la sección "charter intro" lleva una tarjeta flotante superpuesta ("+2 años ofreciendo salidas de pesca") — patrón a mantener, es un recurso de credibilidad

## Layout

- Ancho de diseño de referencia: 1440px (desktop) — construir mobile-first/responsive a partir de estos valores, el mockup no incluye breakpoints móviles, hay que definirlos
- Padding lateral de sección: 64px en desktop
- Grids de 2, 3 y 4 columnas según sección (`repeat(N, minmax(0, 1fr))`)

---

# SEO

- Mantener la jerarquía de headings ya validada anteriormente para el sitio actual (H1 único por página, estructura H2/H3/H5 documentada), con la salvedad del eyebrow pre-H1 en español que el nuevo diseño resuelve de forma distinta (ver pregunta de bloqueo correspondiente).
- Meta title/description y Open Graph únicos por idioma.
- `hreflang` ES/EN recíproco + `x-default`.
- URLs limpias y en minúsculas.
- Schema `LocalBusiness` con la dirección canónica: "Puerto deportivo Marina La Bajadilla, 29603 Marbella, Málaga" + `FAQPage` sobre la sección de preguntas frecuentes + `Review`/`AggregateRating` sobre los testimonios curados.
- Sitemap.xml y robots.txt revisados antes de publicar.
- No publicar hasta resolver el nombre de marca definitivo (única pregunta de bloqueo que sigue abierta).

---

# Accesibilidad

- Contraste AA mínimo (revisar en particular el texto blanco sobre foto con overlay del hero, y los textos `rgba(255,255,255,0.6-0.7)` del footer, que son bajos de contraste tal como están en el mockup)
- Navegación completa por teclado, incluido el acordeón de FAQ y el widget de WhatsApp
- Atributos ARIA en el acordeón de FAQ (`aria-expanded`, `aria-controls`) y en el banner de cookies
- Alt text descriptivo en todas las imágenes (hero, galería de capturas, guía, barco, marina) — ya existe un trabajo previo de alt text bilingüe para este sitio, reutilizarlo si sigue vigente con el contenido nuevo
- El banner de cookies no debe atrapar el foco de teclado ni bloquear la navegación del resto de la página

---

# Fases de construcción

## Fase 0 — Resolver el único bloqueante que queda
Todos los datos operativos ya están cerrados (ver "Datos ya confirmados por Kike"). Lo único que falta antes de dar el copy final por bueno es el **nombre de marca** (Marbella vs. Málaga). Se puede avanzar en paralelo con estructura, CSS y maquetación sin esperar a esto — solo el copy definitivo y el schema quedan bloqueados por esta decisión.

## Fase 1 — Sistema de diseño y estructura base
Variables CSS (colores, espaciados) extraídas del canvas + tipografía Poppins (override del cliente, no la del mockup). Grid/layout responsive de cada sección de la Home (el canvas es solo desktop 1440px — definir comportamiento mobile/tablet). Favicon integrado en el `<head>`.

## Fase 2 — Home completa en ES, con contenido real
Todas las secciones del listado "Estructura de secciones de la Home", con el copy real (no el abreviado del mockup) y las correcciones de bugs ya identificadas.

## Fase 3 — Funcionalidad
Integración del widget de WhatsApp real (`whatsapp-widget.html`, ya construido — no reescribir), acordeón de FAQ, selector de idioma funcional, banner de cookies GDPR.

## Fase 4 — Versión en inglés
Home en EN con su propio copy real (no traducción literal de ES), mismas correcciones de bugs, hreflang correcto.

## Fase 5 — Imágenes y rendimiento
Conversión a WebP, compresión, `srcset`/`lazy loading`, medición Lighthouse/PageSpeed en mobile y desktop.

## Fase 6 — SEO/GEO técnico
Schema, sitemap, robots.txt, meta por idioma, verificación de headings.

## Fase 7 — QA y checklist final

---

# Deploy

**Hosting: Vercel** (no Hostinger — el sitio actual está en Hostinger, pero esta reconstrucción se despliega en Vercel).

- Repositorio en GitHub conectado a Vercel; cada push genera una URL de preview antes de promocionar a producción
- Al ser HTML5/CSS/JS estático sin backend, el deploy en Vercel es directo (sin build step complejo), salvo que se introduzca algún pipeline de optimización de imágenes como paso de build (ver "Rendimiento e imágenes")
- Configurar el dominio `fishingtripsmarbella.com` en Vercel cuando se vaya a sustituir el hosting actual — coordinar la ventana de corte con Kike para no dejar el dominio apuntando a un sitio a medio construir
- Variables de entorno (si las hay, p. ej. alguna clave de servicio) se gestionan desde el panel de Vercel, nunca hardcodeadas en el repo

---

# Checklist

- [ ] Todos los `href="#"` del diseño resueltos a destinos reales
- [ ] Widget de WhatsApp (código embebido en este `CLAUDE.md`, sección dedicada) integrado una sola vez a nivel de sitio, con `NUMERO_WHATSAPP = "34686683373"` verificado, y los 15 CTAs "Reservar Pesca" enlazados vía `sf-wa-trigger`/`sfAbrirFormularioWhatsApp()`
- [ ] Decisión tomada sobre el campo "Puerto de salida" del widget (mantener Málaga/Marbella si son dos puertos reales, o eliminarlo si solo se opera desde Marbella)
- [ ] Todos los teléfonos como `<a href="tel:+34686683373">`
- [ ] Todos los enlaces/menciones de dirección apuntando a `https://maps.app.goo.gl/8U9EbCWF8f1QCgRJ9`
- [ ] Tipografía Poppins aplicada en `p`/`h1`/`h2`/`h3` según la tabla de "Sistema de diseño" (no Playfair Display/Work Sans del mockup)
- [ ] Favicon completo (`.ico` + PNGs de varios tamaños + `apple-touch-icon`) referenciado en el `<head>`, público y no bloqueado por `robots.txt`
- [ ] Acordeón de FAQ funcional con ARIA
- [ ] Selector de idioma funcional, enlazando a la página equivalente real
- [ ] Banner de cookies GDPR bloqueando GTM/GA4 hasta consentimiento
- [ ] Nombre de marca **"Fishing Trips Marbella"** unificado en absolutamente todo el copy
- [ ] Dirección única en toda la web: "Puerto deportivo Marina La Bajadilla, 29603 Marbella, Málaga" (copy + schema + Google Maps)
- [ ] Capacidad del barco = **5 personas + patrón** en absolutamente todas las menciones (specs, FAQ, cualquier texto)
- [ ] Instagram = `fishing_trips_marbella` en ambos idiomas, sin excepción
- [ ] Testimonios: selección curada hardcodeada (no embed en vivo), con nota interna de cuándo actualizarlos
- [ ] Solo ES y EN — sin residuos de arquitectura pensada para más idiomas
- [ ] Imágenes en WebP, optimizadas por debajo de 100KB por imagen, con `srcset` y `loading="lazy"`
- [ ] Core Web Vitals verificados en mobile y desktop (PageSpeed Insights)
- [ ] Hreflang ES/EN correctamente implementado
- [ ] Schema `LocalBusiness` + `FAQPage` validado (Rich Results Test), con la dirección canónica correcta
- [ ] Sitemap.xml y robots.txt generados
- [ ] Contraste de accesibilidad revisado, especialmente textos blancos sobre foto y sobre fondo navy translúcido
- [ ] Deploy verificado en Vercel (preview + producción) antes de mover el dominio
