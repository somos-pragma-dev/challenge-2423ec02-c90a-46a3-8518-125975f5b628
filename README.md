# Implementación de gestión de estado en Angular

El portal de autogestión de clientes requiere una gestión eficiente del estado para mejorar la experiencia del usuario y la consistencia de los datos. El portal interactúa con múltiples servicios backend para obtener y actualizar información del cliente. Los actores involucrados son el cliente, el servicio de autenticación, el servicio de perfil del cliente y el servicio de transacciones. El portal debe manejar estados como 'inicio de sesión', 'perfil cargado' y 'transacción en proceso'. Las propiedades operativas incluyen la latencia de respuesta del backend (máximo 2 segundos), la consistencia de los datos entre el frontend y el backend, y la idempotencia de las solicitudes de actualización de perfil (dos solicitudes con el mismo contenido deben producir el mismo resultado). El umbral numérico del dominio es de 10 000 usuarios activos simultáneos. La razón de negocio es mejorar la retención de clientes a través de una experiencia de autogestión fluida y confiable.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Gestión de estado en el portal de autogestión |
| **Nivel** | senior-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 1 semana |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y generará un ZIP listo para usar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y generará un archivo ZIP descargable. Descárgalo y extráelo en la carpeta donde quieras trabajar.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no genera el ZIP automáticamente al terminar el análisis, escríbele: "genera el ZIP ahora".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Definición de estados y servicios

**Objetivo:** Identificar y definir los estados y servicios necesarios para la gestión del estado en el portal.

**Tiempo estimado:** 2 días

**Instrucciones:**

- Enumera los estados clave que deben gestionarse en el portal.
- Identifica los servicios backend con los que el portal interactúa.
- Define las propiedades operativas y los umbrales para cada estado.

**Entregable:** Documento que describe los estados y servicios, incluyendo sus propiedades operativas y umbrales.

<details>
<summary>Pistas de conocimiento</summary>

- Considera los diferentes roles de los usuarios y cómo afectan los estados.
- Piensa en cómo los servicios backend pueden impactar la consistencia y latencia de los datos.

</details>

### Fase 2: Implementación de gestión de estado

**Objetivo:** Implementar la gestión de estado en el portal utilizando Angular.

**Tiempo estimado:** 3 días

**Instrucciones:**

- Selecciona una estrategia de gestión de estado adecuada para Angular.
- Implementa la gestión de estado para los estados identificados en la fase anterior.
- Asegura la consistencia y latencia de los datos de acuerdo a los umbrales definidos.

**Entregable:** Código fuente que implementa la gestión de estado en el portal.

<details>
<summary>Pistas de conocimiento</summary>

- Considera las mejores prácticas para la gestión de estado en Angular.
- Piensa en cómo manejar los errores y excepciones de los servicios backend.

</details>

### Fase 3: Optimización y pruebas

**Objetivo:** Optimizar la implementación y realizar pruebas exhaustivas.

**Tiempo estimado:** 2 días

**Instrucciones:**

- Optimiza la implementación de la gestión de estado para mejorar el rendimiento y la escalabilidad.
- Realiza pruebas unitarias y de integración para asegurar la correcta funcionalidad y consistencia de los datos.
- Documenta las pruebas y resultados.

**Entregable:** Código optimizado y documentado, junto con los resultados de las pruebas.

<details>
<summary>Pistas de conocimiento</summary>

- Considera técnicas de optimización como la memoización y la reducción de la latencia.
- Piensa en cómo puedes automatizar las pruebas para asegurar la calidad del código.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es la gestión de estado en Angular y por qué es importante para el portal de autogestión?
- **paraQueSirve**: ¿Para qué sirve la gestión de estado en el contexto del portal de autogestión?
- **comoSeUsa**: ¿Cómo se usa la gestión de estado en Angular para mejorar la experiencia del usuario y la consistencia de los datos?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar la gestión de estado en Angular y cómo se pueden evitar?
- **queDecisionesImplica**: ¿Qué decisiones implica la implementación de la gestión de estado en el portal de autogestión y cómo se pueden justificar?

## Criterios de Evaluacion

- Definición clara de estados y servicios.
- Implementación correcta de la gestión de estado en Angular.
- Optimización del rendimiento y escalabilidad.
- Pruebas exhaustivas y documentadas.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT). Devuelve un ZIP con el proyecto. Sirve si no tenes un agente en el IDE.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
