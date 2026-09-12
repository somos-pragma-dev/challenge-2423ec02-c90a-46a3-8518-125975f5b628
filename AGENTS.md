# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Implementación de gestión de estado en Angular**.

| | |
|---|---|
| Tema | Gestión de estado en el portal de autogestión |
| Nivel | senior-l2 |
| Chapter | Frontend |
| Especialidad | Angular |
| Stack | TypeScript / Angular 20 |
| Patron arquitectonico | capas estándar con gestión de estado centralizada (NgRx) |
| Tiempo estimado | 1 semana |

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Corre `npm install && npm run build` y mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `npm install && npm run build` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Definición de estados y servicios**: Documento que describe los estados y servicios, incluyendo sus propiedades operativas y umbrales.
- **Fase 2 — Implementación de gestión de estado**: Código fuente que implementa la gestión de estado en el portal.
- **Fase 3 — Optimización y pruebas**: Código optimizado y documentado, junto con los resultados de las pruebas.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Lo que falta y tenes que completar

### 1. Boilerplate del stack (1)

Sin esto el proyecto no compila ni arranca. **Es tu trabajo crearlo**, y no toca nada de lo pedagogico: es andamiaje del stack.

- [ ] **src/index.html** — Sin index.html no hay documento raiz donde Angular monte la aplicacion y ng serve no tiene que servir.

### 2. Referencias colgando (4)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `src/app/core/state/index.ts` — `StatePersistenceConfig.serialize`
      Se invoca `serialize` sobre `StatePersistenceConfig`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/core/state/transaction/transaction.selectors.ts` — `Transaction.filter`
      Se invoca `filter` sobre `Transaction`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/core/state/transaction/transaction.selectors.ts` — `Transaction.reduce`
      Se invoca `reduce` sobre `Transaction`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/features/dashboard/dashboard.component.ts` — `Transaction.filter`
      Se invoca `filter` sobre `Transaction`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

### Presentes (35)

- `package.json`
- `angular.json`
- `tsconfig.json`
- `src/main.ts`
- `src/app/core/state/index.ts`
- `src/app/core/state/auth/auth.actions.ts`
- `src/app/core/state/auth/auth.reducer.ts`
- `src/app/core/state/auth/auth.selectors.ts`
- `src/app/core/state/auth/auth.effects.ts`
- `src/app/core/state/profile/profile.actions.ts`
- `src/app/core/state/profile/profile.reducer.ts`
- `src/app/core/state/profile/profile.selectors.ts`
- `src/app/core/state/profile/profile.effects.ts`
- `src/app/core/state/transaction/transaction.actions.ts`
- `src/app/core/state/transaction/transaction.reducer.ts`
- `src/app/core/state/transaction/transaction.selectors.ts`
- `src/app/core/state/transaction/transaction.effects.ts`
- `src/app/core/services/auth.service.ts`
- `src/app/core/models/auth.model.ts`
- `src/app/core/services/profile.service.ts`
- `src/app/core/services/transaction.service.ts`
- `src/app/core/models/profile.model.ts`
- `src/app/core/models/transaction.model.ts`
- `src/app/core/state/app.state.ts`
- `src/app/core/interceptors/auth.interceptor.ts`
- `src/app/core/interceptors/error.interceptor.ts`
- `src/app/app.config.ts`
- `src/app/features/dashboard/dashboard.component.ts`
- `src/app/features/dashboard/dashboard.component.html`
- `src/app/features/dashboard/dashboard.component.scss`
- `src/app/shared/components/loader/loader.component.ts`
- `src/app/shared/components/error-message/error-message.component.ts`
- `src/app/app.routes.ts`
- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `src/app/core`
- `src/app/core/state`
- `src/app/core/services`
- `src/app/core/models`
- `src/app/features`
- `src/app/shared`
- `src/environments`

## Verificacion

```bash
npm install && npm run build
```

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- El patron es **capas estándar con gestión de estado centralizada (NgRx)**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Frontend, Especialidad Angular, Tecnología Angular, Senior
- Brecha que el reto ataca: Necesita fortalecer la practica de Angular
- Mision: Liderar la iniciativa de gestion de estado en el portal de autogestion

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
