# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener un ZIP con el proyecto completo y arrancable.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Boilerplate del stack que falta

Sin esto no compila ni arranca. Es andamiaje, no toca nada de lo pedagogico:

- **src/index.html** — Sin index.html no hay documento raiz donde Angular monte la aplicacion y ng serve no tiene que servir.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/app/core/state/index.ts` — `StatePersistenceConfig.serialize`: Se invoca `serialize` sobre `StatePersistenceConfig`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/core/state/transaction/transaction.selectors.ts` — `Transaction.filter`: Se invoca `filter` sobre `Transaction`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/core/state/transaction/transaction.selectors.ts` — `Transaction.reduce`: Se invoca `reduce` sobre `Transaction`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/features/dashboard/dashboard.component.ts` — `Transaction.filter`: Se invoca `filter` sobre `Transaction`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Angular, Tecnología Angular, Senior

### Brecha de conocimiento
Necesita fortalecer la practica de Angular

### Misión / candidato
Liderar la iniciativa de gestion de estado en el portal de autogestion

### Reto
- Tema: Gestión de estado en el portal de autogestión
- Seniority: senior-l2
- Tipo: practical
- Título: Implementación de gestión de estado en Angular
- Tiempo estimado: 1 semana

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Definición de estados y servicios — objetivo: Identificar y definir los estados y servicios necesarios para la gestión del estado en el portal. — entregable (NO resolver): Documento que describe los estados y servicios, incluyendo sus propiedades operativas y umbrales.
- Fase 2: Implementación de gestión de estado — objetivo: Implementar la gestión de estado en el portal utilizando Angular. — entregable (NO resolver): Código fuente que implementa la gestión de estado en el portal.
- Fase 3: Optimización y pruebas — objetivo: Optimizar la implementación y realizar pruebas exhaustivas. — entregable (NO resolver): Código optimizado y documentado, junto con los resultados de las pruebas.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (ZIP).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "portal-autogestion",
  "version": "1.0.0",
  "description": "Portal de autogestión de clientes con gestión de estado centralizada",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "jest",
    "lint": "ng lint"
  },
  "private": true,
  "dependencies": {
    "@angular/core": "^20.0.0",
    "@angular/common": "^20.0.0",
    "@angular/router": "^20.0.0",
    "@angular/platform-browser": "^20.0.0",
    "@angular/platform-browser-dynamic": "^20.0.0",
    "@angular/forms": "^20.0.0",
    "@angular/common/http": "^20.0.0",
    "@ngrx/store": "^17.0.0",
    "@ngrx/effects": "^17.0.0",
    "@ngrx/entity": "^17.0.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.6.0",
    "zone.js": "^0.14.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^20.0.0",
    "@angular/cli": "^20.0.0",
    "@angular/compiler-cli": "^20.0.0",
    "@ngrx/store-devtools": "^17.0.0",
    "@types/jest": "^29.5.0",
    "jest": "^29.7.0",
    "jest-preset-angular": "^14.0.0",
    "typescript": "~5.7.0",
    "@angular-eslint/eslint-plugin": "^17.0.0",
    "@angular-eslint/eslint-plugin-template": "^17.0.0",
    "eslint": "^8.57.0"
  }
}

// === ARCHIVO: angular.json ===
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "portal-autogestion": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss",
          "standalone": true
        },
        "@schematics/angular:directive": {
          "standalone": true
        },
        "@schematics/angular:pipe": {
          "standalone": true
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "outputPath": "dist/portal-autogestion",
            "index": "src/index.html",
            "browser": "src/main.ts",
            "polyfills": ["zone.js"],
            "tsConfig": "tsconfig.json",
            "inlineStyleLanguage": "scss",
            "assets": ["src/favicon.ico", "src/assets"],
            "styles": ["src/styles.scss"],
            "scripts": []
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kb",
                  "maximumError": "1mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kb",
                  "maximumError": "4kb"
                }
              ],
              "outputHashing": "all",
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ]
            },
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "configurations": {
            "production": {
              "buildTarget": "portal-autogestion:build:production"
            },
            "development": {
              "buildTarget": "portal-autogestion:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "polyfills": ["zone.js", "zone.js/testing"],
            "tsConfig": "tsconfig.json",
            "inlineStyleLanguage": "scss",
            "assets": ["src/favicon.ico", "src/assets"],
            "styles": ["src/styles.scss"],
            "scripts": []
          }
        }
      }
    }
  }
}

// === ARCHIVO: tsconfig.json ===
{
  "compileOnSave": false,
  "compilerOptions": {
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "sourceMap": true,
    "declaration": false,
    "experimentalDecorators": true,
    "moduleResolution": "bundler",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "useDefineForClassFields": false,
    "lib": ["ES2022", "dom"],
    "baseUrl": "./",
    "paths": {
      "@core/*": ["src/app/core/*"],
      "@features/*": ["src/app/features/*"],
      "@shared/*": ["src/app/shared/*"],
      "@env/*": ["src/environments/*"]
    }
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}

// === ARCHIVO: src/main.ts ===
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from './app/core/state/auth/auth.actions';

/**
 * Punto de entrada de la aplicación Angular.
 * Configura el bootstrap con providers de estado, routing e interceptors.
 */
function initializeApp(): void {
  const store = inject(Store);
  const router = inject(Router);
  
  const token = localStorage.getItem('auth_token');
  const userSession = sessionStorage.getItem('user_session');
  
  if (token && userSession) {
    try {
      const sessionData = JSON.parse(userSession);
      const expirationTime = sessionData.expiresAt;
      const currentTime = Date.now();
      
      if (expirationTime && currentTime < expirationTime) {
        store.dispatch(AuthActions.restoreSession({ 
          token, 
          user: sessionData.user 
        }));
      } else {
        localStorage.removeItem('auth_token');
        sessionStorage.removeItem('user_session');
        router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Error al restaurar sesión:', error);
      localStorage.removeItem('auth_token');
      sessionStorage.removeItem('user_session');
    }
  }
}

/**
 * Configuración global de errores no manejados.
 * Registra handlers para errores de JavaScript y promesas rejections.
 */
function setupGlobalErrorHandling(): void {
  window.onerror = (message, source, lineno, colno, error) => {
    console.error('Error global capturado:', {
      message,
      source,
      lineno,
      colno,
      error: error?.stack
    });
    return false;
  };
  
  window.onunhandledrejection = (event) => {
    console.error('Promesa rechazada no manejada:', event.reason);
    event.preventDefault();
  };
}

/**
 * Inicializa los servicios de tracking de rendimiento.
 * Configura métricas de Core Web Vitals para monitoreo.
 */
function initializePerformanceMonitoring(): void {
  if ('performance' in window && 'PerformanceObserver' in window) {
    const largestContentfulPaintObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry;
      console.log('LCP:', lastEntry.startTime);
    });
    
    const firstInputObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const firstEntry = entries[0] as PerformanceEntry;
      console.log('FID:', firstEntry.startTime);
    });
    
    try {
      largestContentfulPaintObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      firstInputObserver.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      console.warn('Performance observers no soportados en este navegador');
    }
  }
}

/**
 * Bootstrapping de la aplicación Angular con configuración lazy.
 * Aplica providers definidos en appConfig y inicializa servicios globales.
 */
bootstrapApplication(AppComponent, appConfig)
  .then(() => {
    console.log('Aplicación Angular inicializada correctamente');
    initializeApp();
    setupGlobalErrorHandling();
    initializePerformanceMonitoring();
  })
  .catch((err) => {
    console.error('Error durante bootstrap de la aplicación:', err);
    document.body.innerHTML = `<div style="padding: 20px; text-align: center; font-family: sans-serif;">
      <h2>Error de inicialización</h2>
      <p>La aplicación no pudo cargarse. Por favor, recargue la página.</p>
      <pre style="background: #f5f5f5; padding: 10px; overflow: auto;">${err.message}</pre>
    </div>`;
  });

// === ARCHIVO: src/app/core/state/index.ts ===
/**
 * Índice centralizado de exportación para todos los módulos de estado NgRx.
 * Provee acceso unificado a acciones, reducers, selectores y efectos.
 * 
 * Módulos de estado disponibles:
 * - auth: Gestión de autenticación y sesión de usuario
 * - profile: Datos del perfil del cliente
 * - transaction: Operaciones y historial de transacciones
 * 
 * Este archivo facilita las importaciones en toda la aplicación,
 * reduciendo el acoplamiento entre módulos de estado.
 */

export * from './auth/auth.actions';
export * from './auth/auth.reducer';
export * from './auth/auth.selectors';
export * from './auth/auth.effects';

export * from './profile/profile.actions';
export * from './profile/profile.reducer';
export * from './profile/profile.selectors';
export * from './profile/profile.effects';

export * from './transaction/transaction.actions';
export * from './transaction/transaction.reducer';
export * from './transaction/transaction.selectors';
export * from './transaction/transaction.effects';

export { AppState } from './app.state';

/**
 * Tipo que representa la estructura completa del estado de la aplicación.
 * Utilizado para tipar el Store de NgRx en toda la aplicación.
 */
export type { RootState } from './app.state';

/**
 * Interfaz que define la configuración de persistencia de estado.
 * Permite restaurar el estado desde localStorage al iniciar la aplicación.
 */
export interface StatePersistenceConfig {
  key: string;
  storage: Storage;
  serialize: (state: RootState) => string;
  deserialize: (state: string) => Partial<RootState>;
  blacklist?: (keyof RootState)[];
  whitelist?: (keyof RootState)[];
}

/**
 * Configuración predeterminada para persistencia de estado.
 * Persiste el estado de autenticación en sessionStorage.
 */
export const defaultPersistenceConfig: StatePersistenceConfig = {
  key: 'portal_autogestion_state',
  storage: sessionStorage,
  serialize: (state) => JSON.stringify({
    auth: state.auth,
    profile: state.profile
  }),
  deserialize: (state) => {
    try {
      return JSON.parse(state);
    } catch {
      return {};
    }
  },
  whitelist: ['auth', 'profile']
};

/**
 * Utilidad para limpiar todo el estado persistido.
 * Útil para cerrar sesión completamente.
 */
export function clearPersistedState(config: StatePersistenceConfig): void {
  config.storage.removeItem(config.key);
}

/**
 * Utilidad para guardar el estado actual en el almacenamiento configurado.
 * Útil para depuración o recuperación ante errores.
 */
export function persistState(state: RootState, config: StatePersistenceConfig): void {
  try {
    const serialized = config.serialize(state);
    config.storage.setItem(config.key, serialized);
  } catch (error) {
    console.error('Error al persistir estado:', error);
  }
}

// === ARCHIVO: src/app/core/state/auth/auth.actions.ts ===
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../models/auth.model';

/**
 * Grupo de acciones para la gestión de autenticación.
 * Define todas las operaciones relacionadas con login, logout y gestión de sesión.
 * 
 * Acciones disponibles:
 * - login: Inicia el proceso de autenticación con credenciales
 * - loginSuccess: Autenticación exitosa con token y datos de usuario
 * - loginFailure: Error en autenticación con mensaje de error
 * - logout: Cierra la sesión actual del usuario
 * - logoutSuccess: Confirmación de cierre de sesión
 * - restoreSession: Restaura sesión desde token persistido
 * - refreshToken: Renueva el token de acceso
 * - refreshTokenSuccess: Token renovado exitosamente
 * - refreshTokenFailure: Error al renovar token
 * - updateProfile: Actualiza información del perfil del usuario
 * - updateProfileSuccess: Perfil actualizado exitosamente
 * - updateProfileFailure: Error al actualizar perfil
 */
export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': emptyProps(),
    'Login With Credentials': props<{ email: string; password: string }>(),
    'Login Success': props<{ token: string; user: User }>(),
    'Login Failure': props<{ error: string }>(),
    'Logout': emptyProps(),
    'Logout Success': emptyProps(),
    'Restore Session': props<{ token: string; user: User }>(),
    'Refresh Token': emptyProps(),
    'Refresh Token Success': props<{ token: string }>(),
    'Refresh Token Failure': props<{ error: string }>(),
    'Update Profile': props<{ profile: Partial<User> }>(),
    'Update Profile Success': props<{ user: User }>(),
    'Update Profile Failure': props<{ error: string }>(),
    'Clear Error': emptyProps(),
    'Set Loading': props<{ loading: boolean }>(),
    'Validate Token': props<{ token: string }>(),
    'Validate Token Success': props<{ user: User }>(),
    'Validate Token Failure': props<{ error: string }>()
  }
});

/**
 * Acción para iniciar sesión con recordatorio de credenciales.
 * Incluye opción para mantener la sesión activa.
 */
export const AuthLoginWithRemember = createActionGroup({
  source: 'Auth',
  events: {
    'Login With Remember': props<{ 
      email: string; 
      password: string; 
      rememberMe: boolean 
    }>()
  }
});

/**
 * Acciones para manejo de tokens JWT.
 * Incluye rotación y revocación de tokens.
 */
export const TokenActions = createActionGroup({
  source: 'Auth/Token',
  events: {
    'Store Token': props<{ token: string }>(),
    'Remove Token': emptyProps(),
    'Revoke Token': props<{ token: string }>(),
    'Revoke Token Success': emptyProps(),
    'Revoke Token Failure': props<{ error: string }>()
  }
});

/**
 * Tipos de acciones para uso en Effects y Reducers.
 * Facilita el tipado estricto de las acciones de autenticación.
 */
export type AuthActionTypes = 
  | typeof AuthActions
  | typeof AuthLoginWithRemember
  | typeof TokenActions;


// === ARCHIVO: src/app/core/state/auth/auth.reducer.ts ===
import { createReducer, on } from '@ngrx/store';
import { AuthUser, AuthToken } from '../../models/auth.model';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user: AuthUser | null;
  token: AuthToken | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  lastActivity: number | null;
  sessionExpiresAt: number | null;
}

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  lastActivity: null,
  sessionExpiresAt: null,
};

export const authReducer = createReducer(
  initialAuthState,
  
  on(AuthActions.login, (state): AuthState => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  
  on(AuthActions.loginSuccess, (state, { user, token, refreshToken }): AuthState => ({
    ...state,
    user,
    token,
    refreshToken,
    isAuthenticated: true,
    isLoading: false,
    error: null,
    lastActivity: Date.now(),
    sessionExpiresAt: token?.expiresAt ?? null,
  })),
  
  on(AuthActions.loginFailure, (state, { error }): AuthState => ({
    ...state,
    isLoading: false,
    error,
    isAuthenticated: false,
    user: null,
    token: null,
    refreshToken: null,
  })),
  
  on(AuthActions.logout, (state): AuthState => ({
    ...state,
    isLoading: true,
  })),
  
  on(AuthActions.logoutSuccess, (): AuthState => initialAuthState),
  
  on(AuthActions.logoutFailure, (state, { error }): AuthState => ({
    ...state,
    isLoading: false,
    error,
  })),
  
  on(AuthActions.refreshToken, (state): AuthState => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  
  on(AuthActions.refreshTokenSuccess, (state, { token, refreshToken }): AuthState => ({
    ...state,
    token,
    refreshToken,
    isLoading: false,
    lastActivity: Date.now(),
    sessionExpiresAt: token?.expiresAt ?? null,
  })),
  
  on(AuthActions.refreshTokenFailure, (state, { error }): AuthState => ({
    ...state,
    isLoading: false,
    error,
    isAuthenticated: false,
    user: null,
    token: null,
    refreshToken: null,
  })),
  
  on(AuthActions.updateUser, (state, { user }): AuthState => ({
    ...state,
    user,
  })),
  
  on(AuthActions.updateUserSuccess, (state, { user }): AuthState => ({
    ...state,
    user,
    error: null,
  })),
  
  on(AuthActions.updateUserFailure, (state, { error }): AuthState => ({
    ...state,
    error,
  })),
  
  on(AuthActions.setAuthenticated, (state, { user, token }): AuthState => ({
    ...state,
    user,
    token,
    isAuthenticated: true,
    isLoading: false,
    lastActivity: Date.now(),
    sessionExpiresAt: token?.expiresAt ?? null,
  })),
  
  on(AuthActions.clearAuthError, (state): AuthState => ({
    ...state,
    error: null,
  })),
  
  on(AuthActions.updateLastActivity, (state): AuthState => ({
    ...state,
    lastActivity: Date.now(),
  })),
  
  on(AuthActions.checkSessionTimeout, (state): AuthState => {
    if (!state.sessionExpiresAt) {
      return state;
    }
    const now = Date.now();
    if (now >= state.sessionExpiresAt) {
      return {
        ...initialAuthState,
        error: 'Sesión expirada por inactividad',
      };
    }
    return state;
  })
);

export const AUTH_STATE_KEY = 'auth';

// === ARCHIVO: src/app/core/state/auth/auth.selectors.ts ===
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectCurrentUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectAuthToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);

export const selectRefreshToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.refreshToken
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectAuthIsLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

export const selectLastActivity = createSelector(
  selectAuthState,
  (state: AuthState) => state.lastActivity
);

export const selectSessionExpiresAt = createSelector(
  selectAuthState,
  (state: AuthState) => state.sessionExpiresAt
);

export const selectUserFullName = createSelector(
  selectCurrentUser,
  (user) => user ? `${user.firstName} ${user.lastName}` : null
);

export const selectUserEmail = createSelector(
  selectCurrentUser,
  (user) => user?.email ?? null
);

export const selectUserRole = createSelector(
  selectCurrentUser,
  (user) => user?.role ?? null
);

export const selectUserPermissions = createSelector(
  selectCurrentUser,
  (user) => user?.permissions ?? []
);

export const selectHasPermission = (permission: string) =>
  createSelector(
    selectUserPermissions,
    (permissions) => permissions.includes(permission)
  );

export const selectIsSessionValid = createSelector(
  selectAuthState,
  (state: AuthState) => {
    if (!state.sessionExpiresAt) {
      return false;
    }
    return Date.now() < state.sessionExpiresAt;
  }
);

export const selectAuthStatus = createSelector(
  selectIsAuthenticated,
  selectAuthIsLoading,
  selectAuthError,
  (isAuthenticated, isLoading, error) => ({
    isAuthenticated,
    isLoading,
    error,
  })
);

export const selectAuthUserAndToken = createSelector(
  selectCurrentUser,
  selectAuthToken,
  (user, token) => ({ user, token })
);

// === ARCHIVO: src/app/core/state/auth/auth.effects.ts ===
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of, timer } from 'rxjs';
import { map, exhaustMap, catchError, tap, withLatestFrom, switchMap, takeUntil } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';
import { selectAuthToken, selectRefreshToken, selectSessionExpiresAt } from './auth.selectors';
import { AppState } from '../app.state';

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly store = inject(Store<AppState>);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((response) =>
            AuthActions.loginSuccess({
              user: response.user,
              token: response.token,
              refreshToken: response.refreshToken,
            })
          ),
          catchError((error) =>
            of(AuthActions.loginFailure({
              error: error.message || 'Error en el inicio de sesión',
            }))
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ user }) => {
          this.authService.storeTokens(user.id);
          this.router.navigate(['/dashboard']);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      exhaustMap(() =>
        this.authService.logout().pipe(
          map(() => AuthActions.logoutSuccess()),
          catchError(() => of(AuthActions.logoutSuccess()))
        )
      )
    )
  );

  logoutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess, AuthActions.logoutFailure, AuthActions.refreshTokenFailure),
        tap(() => {
          this.authService.clearTokens();
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      withLatestFrom(
        this.store.select(selectRefreshToken),
        this.store.select(selectAuthToken)
      ),
      switchMap(([action, refreshToken, currentToken]) => {
        if (!refreshToken) {
          return of(AuthActions.refreshTokenFailure({ error: 'No hay token de refresh' }));
        }
        return this.authService.refreshToken(refreshToken).pipe(
          map((response) =>
            AuthActions.refreshTokenSuccess({
              token: response.token,
              refreshToken: response.refreshToken,
            })
          ),
          catchError((error) =>
            of(AuthActions.refreshTokenFailure({
              error: error.message || 'Error al refresh token',
            }))
          )
        );
      })
    )
  );

  refreshTokenSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.refreshTokenSuccess),
        tap(({ token }) => {
          this.authService.updateStoredToken(token);
        })
      ),
    { dispatch: false }
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.updateUser),
      exhaustMap(({ user }) =>
        this.authService.updateProfile(user).pipe(
          map((updatedUser) =>
            AuthActions.updateUserSuccess({ user: updatedUser })
          ),
          catchError((error) =>
            of(AuthActions.updateUserFailure({
              error: error.message || 'Error al actualizar perfil',
            }))
          )
        )
      )
    )
  );

  autoRefreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess, AuthActions.refreshTokenSuccess),
      withLatestFrom(this.store.select(selectSessionExpiresAt)),
      switchMap(([_, expiresAt]) => {
        if (!expiresAt) {
          return of(AuthActions.checkSessionTimeout());
        }
        const bufferTime = 5 * 60 * 1000;
        const timeUntilExpiry = expiresAt - Date.now() - bufferTime;
        if (timeUntilExpiry <= 0) {
          return of(AuthActions.refreshToken());
        }
        return timer(timeUntilExpiry).pipe(
          map(() => AuthActions.refreshToken()),
          takeUntil(this.actions$.pipe(ofType(AuthActions.logout)))
        );
      })
    )
  );

  checkSessionTimeout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.checkSessionTimeout),
      withLatestFrom(
        this.store.select(selectSessionExpiresAt),
        this.store.select(selectIsAuthenticated)
      ),
      switchMap(([_, expiresAt, isAuthenticated]) => {
        if (!isAuthenticated || !expiresAt) {
          return [];
        }
        if (Date.now() >= expiresAt) {
          return of(AuthActions.logout());
        }
        return [];
      })
    )
  );
}


// === ARCHIVO: src/app/core/state/profile/profile.actions.ts ===
import { createAction, props } from '@ngrx/store';
import { Profile } from '../../models/profile.model';

export const loadProfile = createAction(
  '[Profile] Load Profile',
  props<{ userId: string }>()
);

export const loadProfileSuccess = createAction(
  '[Profile] Load Profile Success',
  props<{ profile: Profile }>()
);

export const loadProfileFailure = createAction(
  '[Profile] Load Profile Failure',
  props<{ error: string }>()
);

export const updateProfile = createAction(
  '[Profile] Update Profile',
  props<{ profile: Partial<Profile> }>()
);

export const updateProfileSuccess = createAction(
  '[Profile] Update Profile Success',
  props<{ profile: Profile }>()
);

export const updateProfileFailure = createAction(
  '[Profile] Update Profile Failure',
  props<{ error: string }>()
);

export const clearProfile = createAction(
  '[Profile] Clear Profile'
);

export const setProfileLoading = createAction(
  '[Profile] Set Loading',
  props<{ loading: boolean }>()
);

export const setProfileError = createAction(
  '[Profile] Set Error',
  props<{ error: string | null }>()
);

// === ARCHIVO: src/app/core/state/profile/profile.reducer.ts ===
import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Profile } from '../../models/profile.model';
import * as ProfileActions from './profile.actions';

export interface ProfileState extends EntityState<Profile> {
  selectedProfileId: string | null;
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

export const adapter: EntityAdapter<Profile> = createEntityAdapter<Profile>({
  selectId: (profile: Profile) => profile.id,
  sortComparer: false
});

export const initialState: ProfileState = adapter.getInitialState({
  selectedProfileId: null,
  loading: false,
  error: null,
  lastUpdated: null
});

export const profileReducer = createReducer(
  initialState,
  
  on(ProfileActions.loadProfile, (state, { userId }) => ({
    ...state,
    loading: true,
    error: null,
    selectedProfileId: userId
  })),
  
  on(ProfileActions.loadProfileSuccess, (state, { profile }) => 
    adapter.upsertOne(profile, {
      ...state,
      loading: false,
      error: null,
      lastUpdated: Date.now()
    })
  ),
  
  on(ProfileActions.loadProfileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  on(ProfileActions.updateProfile, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(ProfileActions.updateProfileSuccess, (state, { profile }) => 
    adapter.updateOne(
      { id: profile.id, changes: profile },
      {
        ...state,
        loading: false,
        error: null,
        lastUpdated: Date.now()
      }
    )
  ),
  
  on(ProfileActions.updateProfileFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  on(ProfileActions.clearProfile, (state) => 
    adapter.removeAll({
      ...state,
      selectedProfileId: null,
      loading: false,
      error: null,
      lastUpdated: null
    })
  ),
  
  on(ProfileActions.setProfileLoading, (state, { loading }) => ({
    ...state,
    loading
  })),
  
  on(ProfileActions.setProfileError, (state, { error }) => ({
    ...state,
    error
  }))
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

// === ARCHIVO: src/app/core/state/profile/profile.selectors.ts ===
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState, selectAll, selectEntities } from './profile.reducer';

export const selectProfileState = createFeatureSelector<ProfileState>('profile');

export const selectAllProfiles = createSelector(
  selectProfileState,
  selectAll
);

export const selectProfileEntities = createSelector(
  selectProfileState,
  selectEntities
);

export const selectSelectedProfileId = createSelector(
  selectProfileState,
  (state) => state.selectedProfileId
);

export const selectSelectedProfile = createSelector(
  selectProfileEntities,
  selectSelectedProfileId,
  (entities, selectedId) => selectedId ? entities[selectedId] : null
);

export const selectProfileById = (profileId: string) => createSelector(
  selectProfileEntities,
  (entities) => entities[profileId] || null
);

export const selectProfileLoading = createSelector(
  selectProfileState,
  (state) => state.loading
);

export const selectProfileError = createSelector(
  selectProfileState,
  (state) => state.error
);

export const selectProfileLastUpdated = createSelector(
  selectProfileState,
  (state) => state.lastUpdated
);

export const selectProfileTotal = createSelector(
  selectProfileState,
  (state) => state.ids.length
);

export const selectIsProfileStale = (maxAgeMs: number = 300000) => createSelector(
  selectProfileLastUpdated,
  (lastUpdated) => {
    if (!lastUpdated) return true;
    return Date.now() - lastUpdated > maxAgeMs;
  }
);

export const selectHasProfileError = createSelector(
  selectProfileError,
  (error) => error !== null
);

export const selectProfileErrorMessage = createSelector(
  selectProfileError,
  (error) => error
);

export const selectIsProfileLoading = createSelector(
  selectProfileLoading,
  (loading) => loading
);

export const selectProfileByUserId = (userId: string) => createSelector(
  selectAllProfiles,
  (profiles) => profiles.find(p => p.userId === userId) || null
);


// === ARCHIVO: src/app/core/state/profile/profile.effects.ts ===
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap, switchMap } from 'rxjs/operators';
import { ProfileService } from '../../services/profile.service';
import * as ProfileActions from './profile.actions';
import { Profile } from '../../models/profile.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ProfileEffects {
  private readonly actions$ = inject(Actions);
  private readonly profileService = inject(ProfileService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.loadProfile),
      mergeMap(({ userId }) =>
        this.profileService.getProfile(userId).pipe(
          map((profile: Profile) => ProfileActions.loadProfileSuccess({ profile })),
          catchError((error) =>
            of(ProfileActions.loadProfileFailure({ error: error.message || 'Error al cargar el perfil' }))
          )
        )
      )
    )
  );

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.updateProfile),
      mergeMap(({ profile }) =>
        this.profileService.updateProfile(profile).pipe(
          map((updatedProfile: Profile) => ProfileActions.updateProfileSuccess({ profile: updatedProfile })),
          catchError((error) =>
            of(ProfileActions.updateProfileFailure({ error: error.message || 'Error al actualizar el perfil' }))
          )
        )
      )
    )
  );

  updateProfileSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.updateProfileSuccess),
        tap(({ profile }) => {
          this.snackBar.open('Perfil actualizado correctamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        })
      ),
    { dispatch: false }
  );

  loadProfileFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.loadProfileFailure),
        tap(({ error }) => {
          this.snackBar.open(error, 'Cerrar', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          });
        })
      ),
    { dispatch: false }
  );

  navigateToProfile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.loadProfileSuccess),
        tap(({ profile }) => {
          if (profile?.id) {
            console.log(`Perfil cargado exitosamente para usuario: ${profile.id}`);
          }
        })
      ),
    { dispatch: false }
  );

  loadProfileByToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.loadProfileByToken),
      switchMap(() =>
        this.profileService.getCurrentProfile().pipe(
          map((profile: Profile) => ProfileActions.loadProfileSuccess({ profile })),
          catchError((error) =>
            of(ProfileActions.loadProfileFailure({ error: error.message || 'Error al cargar el perfil actual' }))
          )
        )
      )
    )
  );

  clearProfile$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.clearProfile),
        tap(() => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  retryProfileLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.retryProfileLoad),
      map(({ userId }) => ProfileActions.loadProfile({ userId }))
    )
  );

  validateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.validateProfile),
      mergeMap(({ profile }) =>
        this.profileService.validateProfile(profile).pipe(
          map((validationResult) =>
            ProfileActions.validateProfileSuccess({ validationResult })
          ),
          catchError((error) =>
            of(ProfileActions.validateProfileFailure({ error: error.message || 'Error al validar el perfil' }))
          )
        )
      )
    )
  );

  saveProfileDraft$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProfileActions.saveProfileDraft),
        tap(({ profile }) => {
          localStorage.setItem('profile_draft', JSON.stringify(profile));
        })
      ),
    { dispatch: false }
  );

  loadProfileDraft$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProfileActions.loadProfileDraft),
      map(() => {
        const draft = localStorage.getItem('profile_draft');
        if (draft) {
          return ProfileActions.loadProfileDraftSuccess({ draft: JSON.parse(draft) });
        }
        return ProfileActions.loadProfileDraftFailure({ error: 'No se encontró borrador guardado' });
      })
    )
  );
}

// === ARCHIVO: src/app/core/state/transaction/transaction.actions.ts ===
import { createAction, props } from '@ngrx/store';
import { Transaction, TransactionFilter, TransactionSummary } from '../../models/transaction.model';

export const loadTransactions = createAction(
  '[Transaction] Load Transactions',
  props<{ filter?: TransactionFilter }>()
);

export const loadTransactionsSuccess = createAction(
  '[Transaction] Load Transactions Success',
  props<{ transactions: Transaction[]; summary?: TransactionSummary }>()
);

export const loadTransactionsFailure = createAction(
  '[Transaction] Load Transactions Failure',
  props<{ error: string }>()
);

export const loadTransactionById = createAction(
  '[Transaction] Load Transaction By Id',
  props<{ transactionId: string }>()
);

export const loadTransactionByIdSuccess = createAction(
  '[Transaction] Load Transaction By Id Success',
  props<{ transaction: Transaction }>()
);

export const loadTransactionByIdFailure = createAction(
  '[Transaction] Load Transaction By Id Failure',
  props<{ error: string }>()
);

export const createTransaction = createAction(
  '[Transaction] Create Transaction',
  props<{ transaction: Partial<Transaction> }>()
);

export const createTransactionSuccess = createAction(
  '[Transaction] Create Transaction Success',
  props<{ transaction: Transaction }>()
);

export const createTransactionFailure = createAction(
  '[Transaction] Create Transaction Failure',
  props<{ error: string }>()
);

export const updateTransaction = createAction(
  '[Transaction] Update Transaction',
  props<{ transactionId: string; changes: Partial<Transaction> }>()
);

export const updateTransactionSuccess = createAction(
  '[Transaction] Update Transaction Success',
  props<{ transaction: Transaction }>()
);

export const updateTransactionFailure = createAction(
  '[Transaction] Update Transaction Failure',
  props<{ error: string }>()
);

export const deleteTransaction = createAction(
  '[Transaction] Delete Transaction',
  props<{ transactionId: string }>()
);

export const deleteTransactionSuccess = createAction(
  '[Transaction] Delete Transaction Success',
  props<{ transactionId: string }>()
);

export const deleteTransactionFailure = createAction(
  '[Transaction] Delete Transaction Failure',
  props<{ error: string }>()
);

export const clearTransactions = createAction('[Transaction] Clear Transactions');

export const setTransactionFilter = createAction(
  '[Transaction] Set Filter',
  props<{ filter: TransactionFilter }>()
);

export const clearTransactionFilter = createAction('[Transaction] Clear Filter');

export const retryLoadTransactions = createAction(
  '[Transaction] Retry Load Transactions',
  props<{ filter?: TransactionFilter }>()
);

export const exportTransactions = createAction(
  '[Transaction] Export Transactions',
  props<{ format: 'csv' | 'pdf' | 'excel' }>()
);

export const exportTransactionsSuccess = createAction(
  '[Transaction] Export Transactions Success',
  props<{ downloadUrl: string }>()
);

export const exportTransactionsFailure = createAction(
  '[Transaction] Export Transactions Failure',
  props<{ error: string }>()
);

export const selectTransaction = createAction(
  '[Transaction] Select Transaction',
  props<{ transactionId: string }>()
);

export const deselectTransaction = createAction('[Transaction] Deselect Transaction');

export const loadPendingTransactions = createAction('[Transaction] Load Pending Transactions');

export const loadPendingTransactionsSuccess = createAction(
  '[Transaction] Load Pending Transactions Success',
  props<{ transactions: Transaction[] }>()
);

export const loadPendingTransactionsFailure = createAction(
  '[Transaction] Load Pending Transactions Failure',
  props<{ error: string }>()
);

export const approveTransaction = createAction(
  '[Transaction] Approve Transaction',
  props<{ transactionId: string }>()
);

export const approveTransactionSuccess = createAction(
  '[Transaction] Approve Transaction Success',
  props<{ transaction: Transaction }>()
);

export const approveTransactionFailure = createAction(
  '[Transaction] Approve Transaction Failure',
  props<{ error: string }>()
);

export const rejectTransaction = createAction(
  '[Transaction] Reject Transaction',
  props<{ transactionId: string; reason: string }>()
);

export const rejectTransactionSuccess = createAction(
  '[Transaction] Reject Transaction Success',
  props<{ transaction: Transaction }>()
);

export const rejectTransactionFailure = createAction(
  '[Transaction] Reject Transaction Failure',
  props<{ error: string }>()
);

// === ARCHIVO: src/app/core/state/transaction/transaction.reducer.ts ===
import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Transaction, TransactionFilter, TransactionSummary } from '../../models/transaction.model';
import * as TransactionActions from './transaction.actions';

export interface TransactionState extends EntityState<Transaction> {
  selectedTransactionId: string | null;
  loading: boolean;
  error: string | null;
  filter: TransactionFilter | null;
  summary: TransactionSummary | null;
  lastUpdated: string | null;
  exportLoading: boolean;
  exportError: string | null;
  pendingApprovalCount: number;
  operationInProgress: boolean;
}

export const transactionAdapter: EntityAdapter<Transaction> = createEntityAdapter<Transaction>({
  selectId: (transaction: Transaction) => transaction.id,
  sortComparer: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
});

export const initialTransactionState: TransactionState = transactionAdapter.getInitialState({
  selectedTransactionId: null,
  loading: false,
  error: null,
  filter: null,
  summary: null,
  lastUpdated: null,
  exportLoading: false,
  exportError: null,
  pendingApprovalCount: 0,
  operationInProgress: false,
});

export const transactionReducer = createReducer(
  initialTransactionState,

  on(TransactionActions.loadTransactions, (state, { filter }) => ({
    ...state,
    loading: true,
    error: null,
    filter: filter || state.filter,
  })),

  on(TransactionActions.loadTransactionsSuccess, (state, { transactions, summary }) =>
    transactionAdapter.setAll(transactions, {
      ...state,
      loading: false,
      error: null,
      summary: summary || state.summary,
      lastUpdated: new Date().toISOString(),
    })
  ),

  on(TransactionActions.loadTransactionsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(TransactionActions.loadTransactionById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(TransactionActions.loadTransactionByIdSuccess, (state, { transaction }) =>
    transactionAdapter.upsertOne(transaction, {
      ...state,
      loading: false,
      selectedTransactionId: transaction.id,
    })
  ),

  on(TransactionActions.loadTransactionByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(TransactionActions.createTransaction, (state) => ({
    ...state,
    loading: true,
    error: null,
    operationInProgress: true,
  })),

  on(TransactionActions.createTransactionSuccess, (state, { transaction }) =>
    transactionAdapter.addOne(transaction, {
      ...state,
      loading: false,
      operationInProgress: false,
      selectedTransactionId: transaction.id,
    })
  ),

  on(TransactionActions.createTransactionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    operationInProgress: false,
  })),

  on(TransactionActions.updateTransaction, (state) => ({
    ...state,
    loading: true,
    error: null,
    operationInProgress: true,
  })),

  on(TransactionActions.updateTransactionSuccess, (state, { transaction }) =>
    transactionAdapter.updateOne(
      { id: transaction.id, changes: transaction },
      {
        ...state,
        loading: false,
        operationInProgress: false,
      }
    )
  ),

  on(TransactionActions.updateTransactionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    operationInProgress: false,
  })),

  on(TransactionActions.deleteTransaction, (state) => ({
    ...state,
    loading: true,
    error: null,
    operationInProgress: true,
  })),

  on(TransactionActions.deleteTransactionSuccess, (state, { transactionId }) =>
    transactionAdapter.removeOne(transactionId, {
      ...state,
      loading: false,
      operationInProgress: false,
      selectedTransactionId:
        state.selectedTransactionId === transactionId ? null : state.selectedTransactionId,
    })
  ),

  on(TransactionActions.deleteTransactionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    operationInProgress: false,
  })),

  on(TransactionActions.clearTransactions, (state) =>
    transactionAdapter.removeAll({
      ...state,
      selectedTransactionId: null,
      loading: false,
      error: null,
      filter: null,
      summary: null,
    })
  ),

  on(TransactionActions.setTransactionFilter, (state, { filter }) => ({
    ...state,
    filter,
  })),

  on(TransactionActions.clearTransactionFilter, (state) => ({
    ...state,
    filter: null,
  })),

  on(TransactionActions.exportTransactions, (state) => ({
    ...state,
    exportLoading: true,
    exportError: null,
  })),

  on(TransactionActions.exportTransactionsSuccess, (state, { downloadUrl }) => ({
    ...state,
    exportLoading: false,
  })),

  on(TransactionActions.exportTransactionsFailure, (state, { error }) => ({
    ...state,
    exportLoading: false,
    exportError: error,
  })),

  on(TransactionActions.selectTransaction, (state, { transactionId }) => ({
    ...state,
    selectedTransactionId: transactionId,
  })),

  on(TransactionActions.deselectTransaction, (state) => ({
    ...state,
    selectedTransactionId: null,
  })),

  on(TransactionActions.loadPendingTransactions, (state) => ({
    ...state,
    loading: true,
  })),

  on(TransactionActions.loadPendingTransactionsSuccess, (state, { transactions }) =>
    transactionAdapter.upsertMany(transactions, {
      ...state,
      loading: false,
      pendingApprovalCount: transactions.length,
    })
  ),

  on(TransactionActions.loadPendingTransactionsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(TransactionActions.approveTransaction, (state) => ({
    ...state,
    operationInProgress: true,
  })),

  on(TransactionActions.approveTransactionSuccess, (state, { transaction }) =>
    transactionAdapter.updateOne(
      { id: transaction.id, changes: transaction },
      {
        ...state,
        operationInProgress: false,
        pendingApprovalCount: Math.max(0, state.pendingApprovalCount - 1),
      }
    )
  ),

  on(TransactionActions.approveTransactionFailure, (state, { error }) => ({
    ...state,
    operationInProgress: false,
    error,
  })),

  on(TransactionActions.rejectTransaction, (state) => ({
    ...state,
    operationInProgress: true,
  })),

  on(TransactionActions.rejectTransactionSuccess, (state, { transaction }) =>
    transactionAdapter.updateOne(
      { id: transaction.id, changes: transaction },
      {
        ...state,
        operationInProgress: false,
        pendingApprovalCount: Math.max(0, state.pendingApprovalCount - 1),
      }
    )
  ),

  on(TransactionActions.rejectTransactionFailure, (state, { error }) => ({
    ...state,
    operationInProgress: false,
    error,
  }))
);


// === ARCHIVO: src/app/core/state/transaction/transaction.selectors.ts ===
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransactionState, TRANSACTION_FEATURE_KEY } from './transaction.reducer';
import { Transaction } from '../../models/transaction.model';

export const selectTransactionState = createFeatureSelector<TransactionState>(TRANSACTION_FEATURE_KEY);

export const selectAllTransactions = createSelector(
  selectTransactionState,
  (state: TransactionState): Transaction[] => state.ids
    .map(id => state.entities[id])
    .filter((transaction): transaction is Transaction => transaction !== undefined);
);

export const selectTransactionById = (transactionId: string) => createSelector(
  selectTransactionState,
  (state: TransactionState): Transaction | undefined => state.entities[transactionId]
);

export const selectTransactionsLoading = createSelector(
  selectTransactionState,
  (state: TransactionState): boolean => state.loading;
);

export const selectTransactionsError = createSelector(
  selectTransactionState,
  (state: TransactionState): string | null => state.error;
);

export const selectTransactionsLoaded = createSelector(
  selectTransactionState,
  (state: TransactionState): boolean => state.loaded;
);

export const selectPendingTransactions = createSelector(
  selectAllTransactions,
  (transactions: Transaction[]): Transaction[] => transactions.filter(t => t.status === 'pending')
);

export const selectCompletedTransactions = createSelector(
  selectAllTransactions,
  (transactions: Transaction[]): Transaction[] => transactions.filter(t => t.status === 'completed')
);

export const selectFailedTransactions = createSelector(
  selectAllTransactions,
  (transactions: Transaction[]): Transaction[] => transactions.filter(t => t.status === 'failed')
);

export const selectTransactionsByDateRange = (startDate: Date, endDate: Date) => createSelector(
  selectAllTransactions,
  (transactions: Transaction[]): Transaction[] => transactions.filter(t => {
    const transactionDate = new Date(t.createdAt);
    return transactionDate >= startDate && transactionDate <= endDate;
  })
);

export const selectTotalAmount = createSelector(
  selectCompletedTransactions,
  (transactions: Transaction[]): number => transactions.reduce((total, t) => total + t.amount, 0)
);

export const selectTransactionCount = createSelector(
  selectTransactionState,
  (state: TransactionState): number => state.ids.length
);

export const selectRecentTransactions = createSelector(
  selectAllTransactions,
  (transactions: Transaction[]): Transaction[] => {
    const sorted = [...transactions].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return sorted.slice(0, 10);
  }
);

// === ARCHIVO: src/app/core/state/transaction/transaction.effects.ts ===
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap, switchMap } from 'rxjs/operators';
import { TransactionService } from '../../services/transaction.service';
import * as TransactionActions from './transaction.actions';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TransactionEffects {
  private readonly actions$ = inject(Actions);
  private readonly transactionService = inject(TransactionService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.loadTransactions),
      mergeMap(() =>
        this.transactionService.getTransactions().pipe(
          map(transactions => TransactionActions.loadTransactionsSuccess({ transactions })),
          catchError(error =>
            of(TransactionActions.loadTransactionsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadTransactionById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.loadTransactionById),
      mergeMap(action =>
        this.transactionService.getTransactionById(action.transactionId).pipe(
          map(transaction => TransactionActions.loadTransactionByIdSuccess({ transaction })),
          catchError(error =>
            of(TransactionActions.loadTransactionByIdFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.createTransaction),
      mergeMap(action =>
        this.transactionService.createTransaction(action.transaction).pipe(
          map(createdTransaction => 
            TransactionActions.createTransactionSuccess({ transaction: createdTransaction })
          ),
          catchError(error =>
            of(TransactionActions.createTransactionFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.updateTransaction),
      mergeMap(action =>
        this.transactionService.updateTransaction(action.transactionId, action.changes).pipe(
          map(updatedTransaction =>
            TransactionActions.updateTransactionSuccess({ transaction: updatedTransaction })
          ),
          catchError(error =>
            of(TransactionActions.updateTransactionFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionActions.deleteTransaction),
      mergeMap(action =>
        this.transactionService.deleteTransaction(action.transactionId).pipe(
          map(() => TransactionActions.deleteTransactionSuccess({ transactionId: action.transactionId })),
          catchError(error =>
            of(TransactionActions.deleteTransactionFailure({ error: error.message }))
          )
        )
      )
    )
  );

  handleTransactionSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        TransactionActions.createTransactionSuccess,
        TransactionActions.updateTransactionSuccess,
        TransactionActions.deleteTransactionSuccess
      ),
      tap(action => {
        let message = 'Operación completada';
        if (TransactionActions.createTransactionSuccess.is(action)) {
          message = 'Transacción creada correctamente';
        } else if (TransactionActions.updateTransactionSuccess.is(action)) {
          message = 'Transacción actualizada correctamente';
        } else if (TransactionActions.deleteTransactionSuccess.is(action)) {
          message = 'Transacción eliminada correctamente';
        }
        this.snackBar.open(message, 'Cerrar', { duration: 3000 });
      }),
      switchMap(() =>
        this.actions$.pipe(
          ofType(TransactionActions.loadTransactions)
        )
      )
    ), { dispatch: false }
  );

  handleTransactionFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        TransactionActions.loadTransactionsFailure,
        TransactionActions.createTransactionFailure,
        TransactionActions.updateTransactionFailure,
        TransactionActions.deleteTransactionFailure
      ),
      tap(action => {
        this.snackBar.open(`Error: ${action.error}`, 'Cerrar', { duration: 5000 });
      })
    ), { dispatch: false }
  );
}

// === ARCHIVO: src/app/core/services/auth.service.ts ===
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, timer } from 'rxjs';
import { map, catchError, tap, switchMap, shareReplay } from 'rxjs/operators';
import { environment } from '@env/environment';
import { User, LoginRequest, LoginResponse, RefreshTokenRequest, RefreshTokenResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  
  private readonly tokenSubject = new BehaviorSubject<string | null>(null);
  private readonly userSubject = new BehaviorSubject<User | null>(null);
  
  public readonly token$ = this.tokenSubject.asObservable();
  public readonly user$ = this.userSubject.asObservable();
  public readonly isAuthenticated$ = this.token$.pipe(
    map(token => !!token)
  );

  constructor() {
    this.initializeFromStorage();
  }

  private initializeFromStorage(): void {
    const token = localStorage.getItem('auth_token');
    const userJson = localStorage.getItem('auth_user');
    
    if (token && userJson) {
      try {
        const user = JSON.parse(userJson) as User;
        this.tokenSubject.next(token);
        this.userSubject.next(user);
      } catch (error) {
        this.clearStorage();
      }
    }
  }

  login(credentials: LoginRequest): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials, { headers }).pipe(
      map(response => {
        this.handleAuthResponse(response);
        return response.user;
      }),
      catchError(error => {
        console.error('Error en login:', error);
        return throwError(() => new Error(error.error?.message || 'Error de autenticación'));
      })
    );
  }

  logout(): Observable<void> {
    const token = this.tokenSubject.value;
    
    if (!token) {
      this.clearAuth();
      return new Observable(observer => {
        observer.next();
        observer.complete();
      });
    }

    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => this.clearAuth()),
      catchError(() => {
        this.clearAuth();
        return new Observable(observer => {
          observer.next();
          observer.complete();
        });
      })
    );
  }

  refreshToken(): Observable<RefreshTokenResponse> {
    const currentToken = this.tokenSubject.value;
    
    if (!currentToken) {
      return throwError(() => new Error('No hay token para refresh'));
    }

    const request: RefreshTokenRequest = { refreshToken: currentToken };

    return this.http.post<RefreshTokenResponse>(`${this.apiUrl}/refresh`, request).pipe(
      map(response => {
        this.handleTokenRefresh(response);
        return response;
      }),
      catchError(error => {
        this.clearAuth();
        return throwError(() => new Error('Sesión expirada'));
      })
    );
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.tokenSubject.value && !!this.userSubject.value;
  }

  hasRole(role: string): boolean {
    const user = this.userSubject.value;
    return user?.roles?.includes(role) ?? false;
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this.userSubject.value;
    if (!user?.roles) return false;
    return roles.some(role => user.roles.includes(role));
  }

  private handleAuthResponse(response: LoginResponse): void {
    localStorage.setItem('auth_token', response.token);
    localStorage.setItem('auth_user', JSON.stringify(response.user));
    this.tokenSubject.next(response.token);
    this.userSubject.next(response.user);
  }

  private handleTokenRefresh(response: RefreshTokenResponse): void {
    localStorage.setItem('auth_token', response.token);
    this.tokenSubject.next(response.token);
  }

  private clearAuth(): void {
    this.clearStorage();
    this.tokenSubject.next(null);
    this.userSubject.next(null);
  }

  private clearStorage(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  validateSession(): Observable<boolean> {
    const token = this.getToken();
    if (!token) {
      return new Observable(observer => observer.next(false));
    }

    return this.http.post<{ valid: boolean }>(`${this.apiUrl}/validate`, {}).pipe(
      map(response => response.valid),
      catchError(() => {
        this.clearAuth();
        return new Observable(observer => observer.next(false));
      })
    );
  }

  requestPasswordReset(email: string): Observable<void> {
    const params = new HttpParams().set('email', email);
    return this.http.post<void>(`${this.apiUrl}/password-reset`, {}, { params });
  }

  resetPassword(token: string, newPassword: string): Observable<void> {
    const body = { token, newPassword };
    return this.http.post<void>(`${this.apiUrl}/password-reset/confirm`, body);
  }
}


// === ARCHIVO: src/app/core/models/auth.model.ts ===
export interface UserCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: 'Bearer' | 'JWT';
  user: AuthUser;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string;
  roles: UserRole[];
  permissions: string[];
  lastLoginAt?: string;
  createdAt: string;
  isActive: boolean;
  emailVerified: boolean;
  TwoFactorEnabled: boolean;
}

export type UserRole = 'CLIENT' | 'ADMIN' | 'SUPER_ADMIN' | 'SUPPORT';

export interface RefreshTokenRequest {
  refreshToken: string;
  grantType: 'refresh_token';
}

export interface TokenPayload {
  sub: string;
  email: string;
  roles: UserRole[];
  permissions: string[];
  iat: number;
  exp: number;
  iss: string;
  aud: string;
}

export interface AuthError {
  code: AuthErrorCode;
  message: string;
  details?: Record<string, unknown>;
}

export type AuthErrorCode =
  | 'INVALID_CREDENTIALS'
  | 'ACCOUNT_LOCKED'
  | 'ACCOUNT_DISABLED'
  | 'TOKEN_EXPIRED'
  | 'TOKEN_INVALID'
  | 'REFRESH_TOKEN_EXPIRED'
  | 'SESSION_TIMEOUT'
  | 'MAX_SESSIONS_REACHED'
  | 'REQUIRED_2FA'
  | 'INVALID_2FA_CODE'
  | 'NETWORK_ERROR';

export interface SessionInfo {
  sessionId: string;
  deviceId: string;
  deviceName: string;
  browser: string;
  os: string;
  ipAddress: string;
  location: string;
  startedAt: string;
  lastActivityAt: string;
  isCurrentSession: boolean;
}

export interface LogoutRequest {
  token: string;
  revokeAllSessions?: boolean;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  resetToken: string;
  newPassword: string;
  confirmPassword: string;
}

// === ARCHIVO: src/app/core/services/profile.service.ts ===
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, retry, shareReplay, timeout } from 'rxjs/operators';
import { environment } from '@env/environment';

export interface Profile {
  id: string;
  customerId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  address?: Address;
  preferences: UserPreferences;
  kycStatus: KycStatus;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface UserPreferences {
  language: string;
  currency: string;
  notifications: NotificationPreferences;
  theme: 'light' | 'dark' | 'system';
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  marketing: boolean;
  transactions: boolean;
  security: boolean;
}

export type KycStatus = 'PENDING' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED' | 'NOT_STARTED';

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: Address;
  preferences?: Partial<UserPreferences>;
}

export interface ProfileUpdateResponse {
  success: boolean;
  message: string;
  profile: Profile;
  idempotencyKey: string;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    details?: ValidationError[];
  };
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/profile`;
  private readonly defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  getProfile(customerId: string): Observable<Profile> {
    if (!customerId || customerId.trim().length === 0) {
      return throwError(() => new Error('Customer ID is required'));
    }

    const params = new HttpParams()
      .set('includes', 'preferences,address,kyc')
      .set('version', 'v2');

    return this.http.get<Profile>(`${this.apiUrl}/customers/${customerId}`, {
      headers: this.defaultHeaders,
      params,
      observe: 'response'
    }).pipe(
      timeout(environment.maxRequestTimeout || 2000),
      map(response => {
        if (!response.body) {
          throw new Error('Empty response body');
        }
        return response.body;
      }),
      retry({
        count: environment.retryAttempts || 2,
        delay: environment.retryDelay || 1000
      }),
      catchError(this.handleError.bind(this)),
      shareReplay(1)
    );
  }

  updateProfile(customerId: string, updates: UpdateProfileRequest, idempotencyKey?: string): Observable<ProfileUpdateResponse> {
    if (!customerId || customerId.trim().length === 0) {
      return throwError(() => new Error('Customer ID is required'));
    }

    if (!updates || Object.keys(updates).length === 0) {
      return throwError(() => new Error('At least one field must be provided for update'));
    }

    const headers = this.defaultHeaders.set('Idempotency-Key', idempotencyKey || this.generateIdempotencyKey(updates));

    return this.http.patch<ProfileUpdateResponse>(
      `${this.apiUrl}/customers/${customerId}`,
      updates,
      { headers }
    ).pipe(
      timeout(environment.maxRequestTimeout || 2000),
      map(response => {
        if (!response) {
          throw new Error('Empty response body');
        }
        return response;
      }),
      catchError(this.handleError.bind(this))
    );
  }

  uploadProfileImage(customerId: string, file: File): Observable<{ imageUrl: string }> {
    if (!customerId || customerId.trim().length === 0) {
      return throwError(() => new Error('Customer ID is required'));
    }

    if (!file || file.size === 0) {
      return throwError(() => new Error('File is required'));
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return throwError(() => new Error('Invalid file type. Allowed: JPEG, PNG, WebP'));
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return throwError(() => new Error('File size exceeds 5MB limit'));
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('type', 'profile');

    const headers = this.defaultHeaders.delete('Content-Type');

    return this.http.post<{ imageUrl: string }>(
      `${this.apiUrl}/customers/${customerId}/image`,
      formData,
      { headers }
    ).pipe(
      timeout(environment.maxRequestTimeout || 2000),
      catchError(this.handleError.bind(this))
    );
  }

  verifyProfileOwnership(customerId: string, verificationCode: string): Observable<{ verified: boolean }> {
    if (!customerId || !verificationCode) {
      return throwError(() => new Error('Customer ID and verification code are required'));
    }

    return this.http.post<{ verified: boolean }>(
      `${this.apiUrl}/customers/${customerId}/verify`,
      { code: verificationCode }
    ).pipe(
      timeout(environment.maxRequestTimeout || 2000),
      catchError(this.handleError.bind(this))
    );
  }

  resendVerificationEmail(customerId: string): Observable<{ sent: boolean }> {
    if (!customerId || customerId.trim().length === 0) {
      return throwError(() => new Error('Customer ID is required'));
    }

    return this.http.post<{ sent: boolean }>(
      `${this.apiUrl}/customers/${customerId}/resend-verification`,
      {}
    ).pipe(
      timeout(environment.maxRequestTimeout || 2000),
      catchError(this.handleError.bind(this))
    );
  }

  private generateIdempotencyKey(data: UpdateProfileRequest): string {
    const content = JSON.stringify(data);
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return `idem_${Date.now()}_${Math.abs(hash).toString(36)}`;
  }

  private handleError(error: unknown): Observable<never> {
    if (error instanceof Error) {
      if (error.name === 'TimeoutError') {
        console.error('[ProfileService] Request timeout exceeded');
        return throwError(() => new Error('La solicitud ha excedido el tiempo máximo de espera'));
      }
      console.error('[ProfileService] Error:', error.message);
      return throwError(() => error);
    }

    const httpError = error as ApiErrorResponse;
    if (httpError.error) {
      console.error('[ProfileService] API Error:', httpError.error);
      return throwError(() => new Error(httpError.error.message));
    }

    console.error('[ProfileService] Unknown error:', error);
    return throwError(() => new Error('Ha ocurrido un error inesperado al procesar tu solicitud'));
  }
}

// === ARCHIVO: src/app/core/services/transaction.service.ts ===
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry, timeout, finalize } from 'rxjs/operators';
import { environment } from '@env/environment';

export interface Transaction {
  id: string;
  transactionReference: string;
  customerId: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: Money;
  description: string;
  category: string;
  merchant?: MerchantInfo;
  paymentMethod: PaymentMethod;
  flags: TransactionFlags;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  settledAt?: string;
  processedAt?: string;
}

export type TransactionType = 'PAYMENT' | 'REFUND' | 'TRANSFER' | 'WITHDRAWAL' | 'DEPOSIT' | 'FEE' | 'INTEREST';

export type TransactionStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED' | 'REVERSED';

export interface Money {
  amount: number;
  currency: string;
  formatted: string;
}

export interface MerchantInfo {
  id: string;
  name: string;
  category: string;
  location?: string;
  logoUrl?: string;
}

export interface PaymentMethod {
  type: 'CARD' | 'BANK_TRANSFER' | 'WALLET' | 'CASH' | 'CRYPTO';
  last4?: string;
  brand?: string;
  bankName?: string;
  walletProvider?: string;
}

export interface TransactionFlags {
  isSuspicious: boolean;
  requiresReview: boolean;
  isInternational: boolean;
  isRecurring: boolean;
  hasDispute: boolean;
}

export interface TransactionListRequest {
  customerId: string;
  page?: number;
  pageSize?: number;
  startDate?: string;
  endDate?: string;
  type?: TransactionType;
  status?: TransactionStatus;
  category?: string;
  minAmount?: number;
  maxAmount?: number;
  sortBy?: 'createdAt' | 'amount' | 'status';
  sortOrder?: 'asc' | 'desc';
}

export interface TransactionListResponse {
  transactions: Transaction[];
  pagination: PaginationInfo;
  summary: TransactionSummary;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface TransactionSummary {
  totalAmount: Money;
  byType: Record<TransactionType, Money>;
  byStatus: Record<TransactionStatus, number>;
}

export interface CreateTransactionRequest {
  customerId: string;
  type: TransactionType;
  amount: number;
  currency: string;
  description: string;
  category: string;
  paymentMethodId: string;
  metadata?: Record<string, unknown>;
  idempotencyKey?: string;
}

export interface TransactionResponse {
  transaction: Transaction;
  status: string;
  message: string;
}

export interface TransactionFilter {
  types?: TransactionType[];
  statuses?: TransactionStatus[];
  categories?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  amountRange?: {
    min: number;
    max: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/transactions`;
  private readonly defaultHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  getTransactions(request: TransactionListRequest): Observable<TransactionListResponse> {
    this.validateTransactionRequest(request);

    let params = new HttpParams()
      .set('page', (request.page || 1).toString())
      .set('pageSize', (request.pageSize || 20).toString());

    if (request.startDate) {
      params = params.set('startDate', request.startDate);
    }
    if (request.endDate) {
      params = params.set('endDate', request.endDate);
    }
    if (request.type) {
      params = params.set('type', request.type);
    }
    if (request.status) {
      params = params.set('status', request.status);
    }
    if (request.category) {
      params = params.set('category', request.category);
    }
    if (request.minAmount !== undefined) {
      params = params.set('minAmount', request.minAmount.toString());
    }
    if (request.maxAmount !== undefined) {
      params = params.set('maxAmount', request.maxAmount.toString());
    }
    if (request.sortBy) {
      params = params.set('sortBy', request.sortBy);
    }
    if (request.sortOrder) {
      params = params.set('sortOrder', request.sortOrder);
    }

    return this.http.get<TransactionListResponse>(
      `${this.apiUrl}/customers/${request.customerId}`,
      {
        headers: this.defaultHeaders,
        params,
        observe: 'response'
      }
    ).pipe(
      timeout(environment.maxRequestTimeout || 2000),
      map(response => {
        if (!response.body) {
          throw new Error('Empty response body');
        }
        return response.body;
      }),
      retry({
        count: environment.retryAttempts || 2,
        delay: environment.retryDelay || 1000
      }),
      catchError(this.handleError.bind(this))
    );
  }

  getTransactionById(transactionId: string, customerId: string): Observable<Transaction> {
    if (!transactionId || transactionId.trim().length === 0) {
      return throwError(() => new Error('Transaction ID is required'));
    }
    if (!customerId || customerId.trim().length === 0) {
      return throwError(() => new Error('Customer ID is required'));
    }

    const params = new HttpParams().set('includes', 'merchant,paymentMethod,flags');

    return this.http.get<Transaction>(
      `${this.apiUrl}/${transactionId}/customers/${customerId}`,
      {
        headers: this.defaultHeaders,
        params
      }
    ).pipe(
      timeout(environment.maxRequestTimeout || 2000),
      catchError(this.handleError.bind(this))
    );
  }

  createTransaction(request: CreateTransactionRequest): Observable<TransactionResponse> {
    this.validateCreateRequest(request);

    const headers = request.idempotencyKey
      ? this.defaultHeaders.set('Idempotency-Key', request.idempotencyKey)
      : this.defaultHeaders.set('Idempotency-Key', this.generateIdempotencyKey(request));

    return this.http.post<TransactionResponse>(
      `${this.apiUrl}`,
      request,
      { headers }
    ).pipe(
      timeout(environment.maxRequestTimeout || 2000),
      map(response => {
        if (!response) {
          throw new Error('Empty response body');
        }
        return response;
      }),
      catchError(this.handleError.bind(this))
    );
  }

  cancelTransaction(transactionId: string, customerId: string, reason?: string): Observable<TransactionResponse> {
    if (!transactionId || transactionId.trim().length === 0) {
      return throwError(() => new Error('Transaction ID is required'));
    }
    if (!customerId || customerId.trim().length === 0) {
      return throwError(() => new Error('Customer ID is required'));
    }

    return this.http.post<TransactionResponse>(
      `${this.apiUrl}/${transactionId}/cancel`,
      { customerId, reason }
    ).pipe(
      timeout(environment.maxRequestTimeout || 2000),
      catchError(this.handleError.bind(this))
    );
  }

  getTransactionStats(customerId: string, period: 'day' | 'week' | 'month' | 'year'): Observable<TransactionSummary> {
    if (!customerId || customerId.trim().length === 0) {
      return throwError(() => new Error('Customer ID is required'));
    }

    const params = new HttpParams()
      .set('customerId', customerId)
      .set('period', period);

    return this.http.get<TransactionSummary>(
      `${this.apiUrl}/stats`,
      {
        headers: this.defaultHeaders,
        params
      }
    ).pipe(
      timeout(environment.maxRequestTimeout || 2000),
      catchError(this.handleError.bind(this))
    );
  }

  exportTransactions(
    customerId: string,
    format: 'csv' | 'pdf' | 'json',
    filters?: TransactionFilter
  ): Observable<Blob> {
    if (!customerId || customerId.trim().length === 0) {
      return throwError(() => new Error('Customer ID is required'));
    }

    let params = new HttpParams()
      .set('customerId', customerId)
      .set('format', format);

    if (filters) {
      if (filters.dateRange) {
        params = params.set('startDate', filters.dateRange.start);
        params = params.set('endDate', filters.dateRange.end);
      }
      if (filters.types?.length) {
        params = params.set('types', filters.types.join(','));
      }
      if (filters.statuses?.length) {
        params = params.set('statuses', filters.statuses.join(','));
      }
    }

    const headers = this.defaultHeaders.set('Accept', this.getAcceptHeader(format));

    return this.http.get(
      `${this.apiUrl}/export`,
      {
        headers,
        params,
        responseType: 'blob'
      }
    ).pipe(
      timeout(environment.maxRequestTimeout || 2000),
      catchError(this.handleError.bind(this))
    );
  }

  private validateTransactionRequest(request: TransactionListRequest): void {
    if (!request.customerId || request.customerId.trim().length === 0) {
      throw new Error('Customer ID is required');
    }
    if (request.page !== undefined && request.page < 1) {
      throw new Error('Page must be greater than 0');
    }
    if (request.pageSize !== undefined && (request.pageSize < 1 || request.pageSize > 100)) {
      throw new Error('PageSize must be between 1 and 100');
    }
  }

  private validateCreateRequest(request: CreateTransactionRequest): void {
    if (!request.customerId) {
      throw new Error('Customer ID is required');
    }
    if (!request.type) {
      throw new Error('Transaction type is required');
    }
    if (request.amount === undefined || request.amount <= 0) {
      throw new Error('Amount must be greater than 0');
    }
    if (!request.currency || request.currency.trim().length === 0) {
      throw new Error('Currency is required');
    }
  }

  private generateIdempotencyKey(data: CreateTransactionRequest): string {
    const content = `${data.customerId}${data.type}${data.amount}${data.currency}${Date.now()}`;
    let hash = 0;
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return `txn_${Math.abs(hash).toString(36)}_${Date.now()}`;
  }

  private getAcceptHeader(format: 'csv' | 'pdf' | 'json'): string {
    switch (format) {
      case 'csv':
        return 'text/csv';
      case 'pdf':
        return 'application/pdf';
      case 'json':
        return 'application/json';
      default:
        return 'application/octet-stream';
    }
  }

  private handleError(error: unknown): Observable<never> {
    if (error instanceof Error) {
      if (error.name === 'TimeoutError') {
        console.error('[TransactionService] Request timeout exceeded');
        return throwError(() => new Error('La solicitud ha excedido el tiempo máximo de espera'));
      }
      console.error('[TransactionService] Error:', error.message);
      return throwError(() => error);
    }

    console.error('[TransactionService] Unknown error:', error);
    return throwError(() => new Error('Ha ocurrido un error inesperado al procesar la transacción'));
  }
}

// === ARCHIVO: src/app/core/models/profile.model.ts ===
export interface Profile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: Address;
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
  status: ProfileStatus;
  avatarUrl?: string;
  documentType?: DocumentType;
  documentNumber?: string;
  nationality?: string;
  birthDate?: Date;
  occupation?: string;
  monthlyIncome?: number;
  riskProfile?: RiskProfile;
  kycStatus: KycStatus;
  lastLoginAt?: Date;
  failedLoginAttempts: number;
  accountLocked: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  marketingConsent: boolean;
  dataProcessingConsent: boolean;
}

export interface Address {
  street: string;
  streetNumber: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  addressType: AddressType;
}

export type AddressType = 'residential' | 'commercial' | 'billing' | 'shipping';

export type DocumentType = 'dni' | 'passport' | 'driver_license' | 'national_id';

export type ProfileStatus = 'active' | 'inactive' | 'suspended' | 'pending_verification' | 'blocked';

export type KycStatus = 'not_started' | 'in_progress' | 'pending_review' | 'approved' | 'rejected' | 'expired';

export type RiskProfile = 'conservative' | 'moderate' | 'aggressive' | 'none';

export interface UserPreferences {
  language: string;
  currency: string;
  timezone: string;
  notifications: NotificationPreferences;
  theme: 'light' | 'dark' | 'system';
  twoFactorEnabled: boolean;
  biometricEnabled: boolean;
  sessionTimeout: number;
  defaultDashboard: string;
}

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
  transactionAlerts: boolean;
  securityAlerts: boolean;
  marketingCommunications: boolean;
  productUpdates: boolean;
  weeklyDigest: boolean;
}

export interface ProfileUpdateRequest {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: Partial<Address>;
  preferences?: Partial<UserPreferences>;
  marketingConsent?: boolean;
  dataProcessingConsent?: boolean;
}

export interface ProfileUpdateResponse {
  success: boolean;
  message: string;
  updatedProfile: Profile;
  timestamp: Date;
}

export interface ProfileValidationError {
  field: string;
  message: string;
  code: ValidationErrorCode;
}

export type ValidationErrorCode = 
  | 'REQUIRED_FIELD'
  | 'INVALID_FORMAT'
  | 'DUPLICATE_VALUE'
  | 'MAX_LENGTH_EXCEEDED'
  | 'MIN_LENGTH_NOT_MET'
  | 'INVALID_PHONE'
  | 'INVALID_EMAIL'
  | 'INVALID_DOCUMENT'
  | 'INVALID_ADDRESS'
  | 'AGE_RESTRICTION'
  | 'COUNTRY_RESTRICTION';

export interface ProfileListItem {
  id: string;
  email: string;
  fullName: string;
  status: ProfileStatus;
  avatarUrl?: string;
  lastLoginAt?: Date;
}

export interface ProfileSearchCriteria {
  query?: string;
  status?: ProfileStatus[];
  kycStatus?: KycStatus[];
  createdAfter?: Date;
  createdBefore?: Date;
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ProfileSearchResponse {
  items: ProfileListItem[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const PROFILE_INITIAL_STATE: Partial<Profile> = {
  status: 'pending_verification',
  kycStatus: 'not_started',
  failedLoginAttempts: 0,
  accountLocked: false,
  emailVerified: false,
  phoneVerified: false,
  marketingConsent: false,
  dataProcessingConsent: false,
};

export const DEFAULT_PREFERENCES: UserPreferences = {
  language: 'es',
  currency: 'EUR',
  timezone: 'Europe/Madrid',
  notifications: {
    email: true,
    sms: false,
    push: true,
    transactionAlerts: true,
    securityAlerts: true,
    marketingCommunications: false,
    productUpdates: false,
    weeklyDigest: false,
  },
  theme: 'system',
  twoFactorEnabled: false,
  biometricEnabled: false,
  sessionTimeout: 1800,
  defaultDashboard: 'overview',
};

// === ARCHIVO: src/app/core/models/transaction.model.ts ===
export interface Transaction {
  id: string;
  accountId: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  currency: string;
  description: string;
  category: TransactionCategory;
  merchant?: MerchantInfo;
  counterparty?: CounterpartyInfo;
  createdAt: Date;
  updatedAt: Date;
  processedAt?: Date;
  settledAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  reference: string;
  externalReference?: string;
  metadata: TransactionMetadata;
  tags: string[];
  attachments: Attachment[];
  isReversed: boolean;
  reversalId?: string;
  recurringRuleId?: string;
  installmentInfo?: InstallmentInfo;
  exchangeRate?: ExchangeRateInfo;
  fees: FeeInfo[];
  balanceAfter?: number;
  balanceBefore?: number;
}

export type TransactionType = 
  | 'credit'
  | 'debit'
  | 'transfer'
  | 'payment'
  | 'withdrawal'
  | 'deposit'
  | 'refund'
  | 'fee'
  | 'interest'
  | 'dividend';

export type TransactionStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'reversed'
  | 'expired'
  | 'on_hold';

export type TransactionCategory = 
  | 'shopping'
  | 'utilities'
  | 'entertainment'
  | 'food'
  | 'transport'
  | 'health'
  | 'education'
  | 'travel'
  | 'investment'
  | 'salary'
  | 'transfer'
  | 'other';

export interface MerchantInfo {
  id: string;
  name: string;
  category: string;
  location?: string;
  logoUrl?: string;
  website?: string;
  mcc?: string;
}

export interface CounterpartyInfo {
  id: string;
  name: string;
  accountNumber?: string;
  bankName?: string;
  documentType?: string;
  documentNumber?: string;
}

export interface TransactionMetadata {
  ipAddress?: string;
  deviceId?: string;
  channel: 'web' | 'mobile' | 'atm' | 'branch' | 'api';
  location?: string;
  browser?: string;
  os?: string;
  sessionId?: string;
  customFields?: Record<string, unknown>;
}

export interface Attachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
  uploadedAt: Date;
}

export interface InstallmentInfo {
  totalInstallments: number;
  currentInstallment: number;
  installmentAmount: number;
  firstDueDate: Date;
  lastDueDate: Date;
  interestRate?: number;
}

export interface ExchangeRateInfo {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  rateDate: Date;
}

export interface FeeInfo {
  type: FeeType;
  amount: number;
  currency: string;
  description: string;
  taxAmount?: number;
}

export type FeeType = 
  | 'commission'
  | 'processing_fee'
  | 'transfer_fee'
  | 'atm_fee'
  | 'currency_conversion'
  | 'maintenance'
  | 'other';

export interface TransactionSummary {
  totalCredits: number;
  totalDebits: number;
  netAmount: number;
  transactionCount: number;
  averageAmount: number;
  largestTransaction: number;
  smallestTransaction: number;
  byCategory: Record<TransactionCategory, number>;
  byStatus: Record<TransactionStatus, number>;
  byType: Record<TransactionType, number>;
}

export interface TransactionFilter {
  accountId?: string;
  type?: TransactionType[];
  status?: TransactionStatus[];
  category?: TransactionCategory[];
  dateFrom?: Date;
  dateTo?: Date;
  amountMin?: number;
  amountMax?: number;
  merchantId?: string;
  tags?: string[];
  searchQuery?: string;
}

export interface TransactionListResponse {
  transactions: Transaction[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

export interface TransactionCreateRequest {
  accountId: string;
  type: TransactionType;
  amount: number;
  currency: string;
  description: string;
  category: TransactionCategory;
  counterpartyId?: string;
  metadata?: Partial<TransactionMetadata>;
  scheduledAt?: Date;
  recurringRuleId?: string;
}

export interface TransactionCreateResponse {
  success: boolean;
  transaction: Transaction;
  message: string;
  estimatedCompletionTime?: Date;
}

export interface TransactionExportRequest {
  filter: TransactionFilter;
  format: 'csv' | 'pdf' | 'excel';
  includeAttachments: boolean;
  dateRange: {
    from: Date;
    to: Date;
  };
}

export const TRANSACTION_STATUS_COLORS: Record<TransactionStatus, string> = {
  pending: '#FFA500',
  processing: '#1E90FF',
  completed: '#228B22',
  failed: '#DC143C',
  cancelled: '#808080',
  reversed: '#9370DB',
  expired: '#A9A9A9',
  on_hold: '#FF8C00',
};

export const TRANSACTION_TYPE_ICONS: Record<TransactionType, string> = {
  credit: 'arrow-down-circle',
  debit: 'arrow-up-circle',
  transfer: 'swap-horizontal',
  payment: 'credit-card',
  withdrawal: 'cash',
  deposit: 'bank',
  refund: 'replay',
  fee: 'receipt',
  interest: 'trending-up',
  dividend: 'pie-chart',
};

// === ARCHIVO: src/app/core/state/app.state.ts ===
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AuthState } from './auth/auth.reducer';
import { ProfileState } from './profile/profile.reducer';
import { TransactionState } from './transaction/transaction.reducer';
import { environment } from '@env/environment';

export interface AppState {
  auth: AuthState;
  profile: ProfileState;
  transactions: TransactionState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: null as unknown as ActionReducerMap<AuthState>,
  profile: null as unknown as ActionReducerMap<ProfileState>,
  transactions: null as unknown as ActionReducerMap<TransactionState>,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];

export interface StateSelectors<T> {
  selectCurrentState: (state: AppState) => T | undefined;
  selectIsLoading: (state: AppState) => boolean;
  selectError: (state: AppState) => string | null;
  selectLastUpdated: (state: AppState) => Date | null;
}

export const createStateSelectors = <T>(
  featureKey: keyof AppState
): StateSelectors<T> => ({
  selectCurrentState: (state: AppState) => {
    const featureState = state[featureKey];
    return featureState as T | undefined;
  },
  selectIsLoading: (state: AppState) => {
    const featureState = state[featureKey];
    return 'isLoading' in featureState ? (featureState as Record<string, unknown>).isLoading as boolean : false;
  },
  selectError: (state: AppState) => {
    const featureState = state[featureKey];
    return 'error' in featureState ? (featureState as Record<string, unknown>).error as string | null : null;
  },
  selectLastUpdated: (state: AppState) => {
    const featureState = state[featureKey];
    return 'lastUpdated' in featureState ? (featureState as Record<string, unknown>).lastUpdated as Date | null : null;
  },
});

export interface StateEffects {
  dispatch: boolean;
  useEffectsErrorHandler?: boolean;
}

export const defaultStateEffects: StateEffects = {
  dispatch: true,
  useEffectsErrorHandler: true,
};

export interface StateConfig {
  enableDevTools: boolean;
  maxAge?: number;
  hydrationEnabled: boolean;
  persistenceEnabled: boolean;
  persistenceKey: string;
}

export const STATE_CONFIG: StateConfig = {
  enableDevTools: !environment.production,
  maxAge: 50,
  hydrationEnabled: false,
  persistenceEnabled: true,
  persistenceKey: 'portal_autogestion_state',
};

export interface StatePersistenceService {
  saveState: (state: Partial<AppState>) => void;
  loadState: () => Partial<AppState> | null;
  clearState: () => void;
  setWhitelist: (keys: (keyof AppState)[]) => void;
  setBlacklist: (keys: (keyof AppState)[]) => void;
}

export interface StateManager {
  dispatch: (action: import('./auth/auth.actions').AuthActionTypes) => void;
  select: <T>(selector: (state: AppState) => T) => import('rxjs').Observable<T>;
  getState: () => AppState;
  resetState: (feature?: keyof AppState) => void;
}

export interface RootState {
  auth: AuthState;
  profile: ProfileState;
  transactions: TransactionState;
}

export type RootStateKeyType = keyof RootState;

export const STATE_KEYS: RootStateKeyType[] = ['auth', 'profile', 'transactions'];

export interface StateMetadata {
  key: RootStateKeyType;
  reducerPath: string;
  stateKey: string;
  persistenceEnabled: boolean;
  cacheEnabled: boolean;
  cacheDuration?: number;
}

export const STATE_METADATA: Record<RootStateKeyType, StateMetadata> = {
  auth: {
    key: 'auth',
    reducerPath: 'auth',
    stateKey: 'auth',
    persistenceEnabled: true,
    cacheEnabled: false,
  },
  profile: {
    key: 'profile',
    reducerPath: 'profile',
    stateKey: 'profile',
    persistenceEnabled: false,
    cacheEnabled: true,
    cacheDuration: 300000,
  },
  transactions: {
    key: 'transactions',
    reducerPath: 'transactions',
    stateKey: 'transactions',
    persistenceEnabled: false,
    cacheEnabled: true,
    cacheDuration: 60000,
  },
};

export const selectAuthState = (state: AppState): AuthState | undefined => state.auth;
export const selectProfileState = (state: AppState): ProfileState | undefined => state.profile;
export const selectTransactionsState = (state: AppState): TransactionState | undefined => state.transactions;

export const selectIsAnyLoading = (state: AppState): boolean => {
  const authState = state.auth;
  const profileState = state.profile;
  const transactionsState = state.transactions;
  
  const authLoading = authState && 'isLoading' in authState ? (authState as Record<string, unknown>).isLoading as boolean : false;
  const profileLoading = profileState && 'isLoading' in profileState ? (profileState as Record<string, unknown>).isLoading as boolean : false;
  const transactionsLoading = transactionsState && 'isLoading' in transactionsState ? (transactionsState as Record<string, unknown>).isLoading as boolean : false;
  
  return authLoading || profileLoading || transactionsLoading;
};

export const selectAnyError = (state: AppState): string | null => {
  const authState = state.auth;
  const profileState = state.profile;
  const transactionsState = state.transactions;
  
  const authError = authState && 'error' in authState ? (authState as Record<string, unknown>).error as string | null : null;
  const profileError = profileState && 'error' in profileState ? (profileState as Record<string, unknown>).error as string | null : null;
  const transactionsError = transactionsState && 'error' in transactionsState ? (transactionsState as Record<string, unknown>).error as string | null : null;
  
  return authError || profileError || transactionsError;
};

export const APP_INITIAL_STATE: AppState = {
  auth: {} as AuthState,
  profile: {} as ProfileState,
  transactions: {} as TransactionState,
};


// === ARCHIVO: src/app/core/interceptors/auth.interceptor.ts ===
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAuthToken } from '../state/auth/auth.selectors';

const PUBLIC_API_ENDPOINTS = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/refresh',
  '/api/public'
];

function isPublicEndpoint(url: string): boolean {
  return PUBLIC_API_ENDPOINTS.some(endpoint => url.includes(endpoint));
}

function addAuthHeader(req: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
}

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const store = inject(Store);
  
  if (isPublicEndpoint(req.url)) {
    return next(req);
  }

  let token: string | null = null;
  
  store.select(selectAuthToken).subscribe(authToken => {
    token = authToken;
  }).unsubscribe();

  if (!token) {
    return next(req);
  }

  const authReq = addAuthHeader(req, token);
  
  return next(authReq);
};

// === ARCHIVO: src/app/core/interceptors/error.interceptor.ts ===
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError, catchError } from 'rxjs';
import * as AuthActions from '../state/auth/auth.actions';

export interface ErrorResponse {
  status: number;
  message: string;
  code?: string;
  timestamp?: string;
}

const ERROR_MESSAGES: Record<number, string> = {
  400: 'Solicitud incorrecta. Verifique los datos ingresados.',
  401: 'Su sesión ha expirado. Por favor, inicie sesión nuevamente.',
  403: 'No tiene permiso para realizar esta acción.',
  404: 'Recurso no encontrado.',
  409: 'Conflicto de datos. El recurso ya existe o fue modificado.',
  422: 'Datos inválidos. Complete todos los campos requeridos.',
  429: 'Demasiadas solicitudes. Espere un momento e intente nuevamente.',
  500: 'Error interno del servidor. Intente más tarde.',
  502: 'Servicio no disponible. Intente más tarde.',
  503: 'Mantenimiento en progreso. Intente más tarde.'
};

export function getErrorMessage(status: number, defaultMessage?: string): string {
  return ERROR_MESSAGES[status] || defaultMessage || 'Ha ocurrido un error inesperado.';
}

function isAuthError(status: number): boolean {
  return status === 401 || status === 403;
}

function shouldRetry(status: number): boolean {
  return status === 0 || status === 503 || status === 502;
}

export const errorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const store = inject(Store);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const errorResponse: ErrorResponse = {
        status: error.status,
        message: getErrorMessage(error.status, error.message),
        code: error.error?.code,
        timestamp: new Date().toISOString()
      };

      console.error('Error HTTP interceptado:', {
        url: req.url,
        method: req.method,
        status: errorResponse.status,
        message: errorResponse.message,
        timestamp: errorResponse.timestamp
      });

      if (isAuthError(error.status)) {
        store.dispatch(AuthActions.logout());
        
        if (error.status === 401) {
          console.warn('Token expirado o inválido. Redirigiendo al login.');
        } else if (error.status === 403) {
          console.warn('Acceso denegado. El usuario no tiene permisos.');
        }
      }

      if (shouldRetry(error.status)) {
        console.warn('Error de conexión. Considere implementar lógica de reintento.');
      }

      return throwError(() => errorResponse);
    })
  );
};

// === ARCHIVO: src/app/app.config.ts ===
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideRouterStore } from '@ngrx/router-store';

import { routes } from './app.routes';
import { authReducer } from './core/state/auth/auth.reducer';
import { profileReducer } from './core/state/profile/profile.reducer';
import { transactionReducer } from './core/state/transaction/transaction.reducer';
import { AuthEffects } from './core/state/auth/auth.effects';
import { ProfileEffects } from './core/state/profile/profile.effects';
import { TransactionEffects } from './core/state/transaction/transaction.effects';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { RootState, StatePersistenceConfig } from './core/state/index';

const DEFAULT_PERSISTENCE_CONFIG: StatePersistenceConfig = {
  blacklist: ['router']
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions()
    ),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([authInterceptor, errorInterceptor])
    ),
    provideStore<RootState>({
      auth: authReducer,
      profile: profileReducer,
      transactions: transactionReducer
    }),
    provideEffects([AuthEffects, ProfileEffects, TransactionEffects]),
    provideRouterStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75
    })
  ]
};

if (typeof window !== 'undefined') {
  const persistedState = localStorage.getItem('appState');
  if (persistedState) {
    try {
      const parsedState = JSON.parse(persistedState);
      console.log('Estado persistido cargado:', {
        hasAuth: !!parsedState.auth,
        hasProfile: !!parsedState.profile,
        hasTransactions: !!parsedState.transactions
      });
    } catch (error) {
      console.error('Error al cargar el estado persistido:', error);
    }
  }
}


// === ARCHIVO: src/app/features/dashboard/dashboard.component.ts ===
import { Component, OnInit, OnDestroy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, combineLatest, filter } from 'rxjs';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { ErrorMessageComponent } from '@shared/components/error-message/error-message.component';
import { AuthActions } from '@core/state/auth/auth.actions';
import { ProfileActions } from '@core/state/profile/profile.actions';
import { TransactionActions } from '@core/state/transaction/transaction.actions';
import { AuthSelectors } from '@core/state/auth/auth.selectors';
import { ProfileSelectors } from '@core/state/profile/profile.selectors';
import { TransactionSelectors } from '@core/state/transaction/transaction.selectors';
import { User } from '@core/models/auth.model';
import { Profile } from '@core/models/profile.model';
import { Transaction } from '@core/models/transaction.model';

interface DashboardState {
  isLoading: boolean;
  error: string | null;
  user: User | null;
  profile: Profile | null;
  transactions: Transaction[];
  recentTransactions: Transaction[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, LoaderComponent, ErrorMessageComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly destroy$ = new Subject<void>();

  readonly dashboardState = signal<DashboardState>({
    isLoading: true,
    error: null,
    user: null,
    profile: null,
    transactions: [],
    recentTransactions: []
  });

  readonly isLoading = computed(() => this.dashboardState().isLoading);
  readonly error = computed(() => this.dashboardState().error);
  readonly user = computed(() => this.dashboardState().user);
  readonly profile = computed(() => this.dashboardState().profile);
  readonly transactions = computed(() => this.dashboardState().transactions);
  readonly recentTransactions = computed(() => this.dashboardState().recentTransactions);

  readonly hasUser = computed(() => this.dashboardState().user !== null);
  readonly hasProfile = computed(() => this.dashboardState().profile !== null);
  readonly hasTransactions = computed(() => this.dashboardState().transactions.length > 0);
  readonly hasError = computed(() => this.dashboardState().error !== null);

  readonly userFullName = computed(() => {
    const user = this.dashboardState().user;
    if (!user) return '';
    return `${user.firstName} ${user.lastName}`.trim();
  });

  readonly userInitials = computed(() => {
    const user = this.dashboardState().user;
    if (!user) return '';
    const first = user.firstName?.charAt(0) || '';
    const last = user.lastName?.charAt(0) || '';
    return `${first}${last}`.toUpperCase();
  });

  readonly profileCompletion = computed(() => {
    const profile = this.dashboardState().profile;
    if (!profile) return 0;
    let completed = 0;
    const total = 5;
    if (profile.email) completed++;
    if (profile.phone) completed++;
    if (profile.address) completed++;
    if (profile.preferences) completed++;
    if (profile.notifications) completed++;
    return Math.round((completed / total) * 100);
  });

  readonly totalBalance = computed(() => {
    const transactions = this.dashboardState().transactions;
    return transactions
      .filter(t => t.type === 'credit')
      .reduce((sum, t) => sum + t.amount, 0) -
    transactions
      .filter(t => t.type === 'debit')
      .reduce((sum, t) => sum + t.amount, 0);
  });

  readonly transactionCount = computed(() => this.dashboardState().transactions.length);
  readonly pendingCount = computed(() => 
    this.dashboardState().transactions.filter(t => t.status === 'pending').length
  );

  readonly lastTransactionDate = computed(() => {
    const transactions = this.dashboardState().transactions;
    if (transactions.length === 0) return null;
    const sorted = [...transactions].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return sorted[0].date;
  });

  readonly transactionsByType = computed(() => {
    const transactions = this.dashboardState().transactions;
    return {
      credit: transactions.filter(t => t.type === 'credit').length,
      debit: transactions.filter(t => t.type === 'debit').length,
      transfer: transactions.filter(t => t.type === 'transfer').length
    };
  });

  ngOnInit(): void {
    this.initializeDashboard();
    this.subscribeToStateChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeDashboard(): void {
    this.store.dispatch(AuthActions.loadUser());
    this.store.dispatch(ProfileActions.loadProfile());
    this.store.dispatch(TransactionActions.loadTransactions());
  }

  private subscribeToStateChanges(): void {
    combineLatest([
      this.store.select(AuthSelectors.selectUser),
      this.store.select(AuthSelectors.selectIsAuthenticated),
      this.store.select(AuthSelectors.selectAuthLoading),
      this.store.select(AuthSelectors.selectAuthError)
    ]).pipe(
      takeUntil(this.destroy$),
      filter(([user]) => user !== undefined)
    ).subscribe(([user, isAuthenticated, loading, error]) => {
      this.updateState('user', user);
      this.updateState('isLoading', loading);
      if (error) {
        this.updateState('error', error);
      }
    });

    combineLatest([
      this.store.select(ProfileSelectors.selectProfile),
      this.store.select(ProfileSelectors.selectProfileLoading),
      this.store.select(ProfileSelectors.selectProfileError)
    ]).pipe(
      takeUntil(this.destroy$),
      filter(([profile]) => profile !== undefined)
    ).subscribe(([profile, loading, error]) => {
      this.updateState('profile', profile);
      if (loading) {
        this.updateState('isLoading', true);
      }
      if (error) {
        this.updateState('error', error);
      }
    });

    combineLatest([
      this.store.select(TransactionSelectors.selectAllTransactions),
      this.store.select(TransactionSelectors.selectTransactionLoading),
      this.store.select(TransactionSelectors.selectTransactionError)
    ]).pipe(
      takeUntil(this.destroy$),
      filter(([transactions]) => transactions !== undefined)
    ).subscribe(([transactions, loading, error]) => {
      const recent = this.getRecentTransactions(transactions);
      this.updateState('transactions', transactions);
      this.updateState('recentTransactions', recent);
      if (!loading && !error) {
        this.updateState('isLoading', false);
      }
      if (error) {
        this.updateState('error', error);
      }
    });
  }

  private getRecentTransactions(transactions: Transaction[]): Transaction[] {
    return [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }

  private updateState<K extends keyof DashboardState>(key: K, value: DashboardState[K]): void {
    this.dashboardState.update(state => ({
      ...state,
      [key]: value
    }));
  }

  refreshData(): void {
    this.dashboardState.update(state => ({
      ...state,
      isLoading: true,
      error: null
    }));
    this.initializeDashboard();
  }

  retryLoad(): void {
    this.dashboardState.update(state => ({
      ...state,
      error: null
    }));
    this.refreshData();
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  }

  formatDate(date: string | Date): string {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  }

  formatDateShort(date: string | Date): string {
    return new Intl.DateTimeFormat('es-ES', {
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  }

  getTransactionStatusClass(status: string): string {
    const statusClasses: Record<string, string> = {
      completed: 'status--completed',
      pending: 'status--pending',
      failed: 'status--failed',
      cancelled: 'status--cancelled'
    };
    return statusClasses[status] || '';
  }

  getTransactionTypeLabel(type: string): string {
    const typeLabels: Record<string, string> = {
      credit: 'Ingreso',
      debit: 'Gasto',
      transfer: 'Transferencia',
      payment: 'Pago'
    };
    return typeLabels[type] || type;
  }

  onTransactionClick(transaction: Transaction): void {
    console.log('Transacción seleccionada:', transaction.id);
  }

  onProfileEdit(): void {
    console.log('Editar perfil');
  }

  onViewAllTransactions(): void {
    console.log('Ver todas las transacciones');
  }
}

// === ARCHIVO: src/app/features/dashboard/dashboard.component.html ===
<div class="dashboard">
  <header class="dashboard__header">
    <div class="dashboard__header-content">
      <h1 class="dashboard__title">Panel de Control</h1>
      <p class="dashboard__subtitle">Bienvenido de nuevo, {{ userFullName() }}</p>
    </div>
    <div class="dashboard__header-actions">
      <button 
        class="btn btn--secondary" 
        (click)="refreshData()"
        [disabled]="isLoading()">
        <span class="btn__icon">↻</span>
        Actualizar
      </button>
    </div>
  </header>

  <app-loader *ngIf="isLoading()"></app-loader>

  <app-error-message 
    *ngIf="hasError() && !isLoading()"
    [message]="error()!"
    (retry)="retryLoad()">
  </app-error-message>

  <div class="dashboard__content" *ngIf="!isLoading() && !hasError()">
    <section class="dashboard__overview">
      <div class="card card--user">
        <div class="card__header">
          <h2 class="card__title">Información del Usuario</h2>
        </div>
        <div class="card__body">
          <div class="user-info" *ngIf="hasUser()">
            <div class="user-info__avatar">
              <span class="user-info__initials">{{ userInitials() }}</span>
            </div>
            <div class="user-info__details">
              <h3 class="user-info__name">{{ userFullName() }}</h3>
              <p class="user-info__email">{{ user()?.email }}</p>
              <p class="user-info__id">ID: {{ user()?.id }}</p>
            </div>
          </div>
          <div class="user-info__empty" *ngIf="!hasUser()">
            <p>No hay información del usuario disponible</p>
          </div>
        </div>
      </div>

      <div class="card card--balance">
        <div class="card__header">
          <h2 class="card__title">Balance Total</h2>
        </div>
        <div class="card__body">
          <div class="balance-display">
            <span class="balance-display__amount">{{ formatCurrency(totalBalance()) }}</span>
            <span class="balance-display__label">Balance actual</span>
          </div>
        </div>
      </div>

      <div class="card card--stats">
        <div class="card__header">
          <h2 class="card__title">Estadísticas</h2>
        </div>
        <div class="card__body">
          <div class="stats-grid">
            <div class="stat-item">
              <span class="stat-item__value">{{ transactionCount() }}</span>
              <span class="stat-item__label">Transacciones</span>
            </div>
            <div class="stat-item">
              <span class="stat-item__value">{{ pendingCount() }}</span>
              <span class="stat-item__label">Pendientes</span>
            </div>
            <div class="stat-item">
              <span class="stat-item__value">{{ transactionsByType().credit }}</span>
              <span class="stat-item__label">Ingresos</span>
            </div>
            <div class="stat-item">
              <span class="stat-item__value">{{ transactionsByType().debit }}</span>
              <span class="stat-item__label">Gastos</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="dashboard__profile">
      <div class="card card--profile">
        <div class="card__header card__header--actions">
          <h2 class="card__title">Perfil del Cliente</h2>
          <button class="btn btn--primary btn--small" (click)="onProfileEdit()">
            Editar Perfil
          </button>
        </div>
        <div class="card__body">
          <div class="profile-content" *ngIf="hasProfile(); else noProfile">
            <div class="profile-completion">
              <div class="profile-completion__header">
                <span class="profile-completion__label">Perfil completado</span>
                <span class="profile-completion__value">{{ profileCompletion() }}%</span>
              </div>
              <div class="profile-completion__bar">
                <div 
                  class="profile-completion__progress" 
                  [style.width.%]="profileCompletion()">
                </div>
              </div>
            </div>

            <div class="profile-details">
              <div class="profile-field" *ngIf="profile()?.email">
                <span class="profile-field__label">Email</span>
                <span class="profile-field__value">{{ profile()?.email }}</span>
              </div>
              <div class="profile-field" *ngIf="profile()?.phone">
                <span class="profile-field__label">Teléfono</span>
                <span class="profile-field__value">{{ profile()?.phone }}</span>
              </div>
              <div class="profile-field" *ngIf="profile()?.address">
                <span class="profile-field__label">Dirección</span>
                <span class="profile-field__value">{{ profile()?.address }}</span>
              </div>
              <div class="profile-field" *ngIf="profile()?.city">
                <span class="profile-field__label">Ciudad</span>
                <span class="profile-field__value">{{ profile()?.city }}</span>
              </div>
              <div class="profile-field" *ngIf="profile()?.postalCode">
                <span class="profile-field__label">Código Postal</span>
                <span class="profile-field__value">{{ profile()?.postalCode }}</span>
              </div>
              <div class="profile-field" *ngIf="profile()?.country">
                <span class="profile-field__label">País</span>
                <span class="profile-field__value">{{ profile()?.country }}</span>
              </div>
            </div>

            <div class="profile-preferences" *ngIf="profile()?.preferences">
              <h4 class="profile-preferences__title">Preferencias</h4>
              <div class="preference-tags">
                <span 
                  class="preference-tag" 
                  *ngFor="let pref of profile()?.preferences">
                  {{ pref }}
                </span>
              </div>
            </div>
          </div>
          <ng-template #noProfile>
            <div class="profile-empty">
              <p>No hay información del perfil disponible</p>
              <button class="btn btn--primary" (click)="onProfileEdit()">
                Completar Perfil
              </button>
            </div>
          </ng-template>
        </div>
      </div>
    </section>

    <section class="dashboard__transactions">
      <div class="card card--transactions">
        <div class="card__header card__header--actions">
          <h2 class="card__title">Transacciones Recientes</h2>
          <button class="btn btn--secondary btn--small" (click)="onViewAllTransactions()">
            Ver Todas
          </button>
        </div>
        <div class="card__body">
          <div class="transactions-list" *ngIf="hasTransactions(); else noTransactions">
            <div 
              class="transaction-item" 
              *ngFor="let transaction of recentTransactions()"
              (click)="onTransactionClick(transaction)">
              <div class="transaction-item__icon" [ngClass]="getTransactionStatusClass(transaction.status)">
                <span class="transaction-item__icon-text">{{ getTransactionTypeLabel(transaction.type).charAt(0) }}</span>
              </div>
              <div class="transaction-item__details">
                <span class="transaction-item__description">{{ transaction.description }}</span>
                <span class="transaction-item__date">{{ formatDate(transaction.date) }}</span>
              </div>
              <div class="transaction-item__amount" [ngClass]="transaction.type">
                <span class="transaction-item__amount-value">
                  {{ transaction.type === 'debit' ? '-' : '+' }}{{ formatCurrency(transaction.amount) }}
                </span>
                <span class="transaction-item__status" [ngClass]="getTransactionStatusClass(transaction.status)">
                  {{ transaction.status }}
                </span>
              </div>
            </div>
          </div>
          <ng-template #noTransactions>
            <div class="transactions-empty">
              <p>No hay transacciones recientes</p>
            </div>
          </ng-template>
        </div>
      </div>
    </section>

    <section class="dashboard__activity">
      <div class="card card--activity">
        <div class="card__header">
          <h2 class="card__title">Actividad Reciente</h2>
        </div>
        <div class="card__body">
          <div class="activity-timeline" *ngIf="lastTransactionDate()">
            <div class="activity-item">
              <div class="activity-item__marker"></div>
              <div class="activity-item__content">
                <span class="activity-item__title">Última transacción</span>
                <span class="activity-item__date">{{ formatDate(lastTransactionDate()!) }}</span>
              </div>
            </div>
            <div class="activity-item" *ngIf="hasProfile()">
              <div class="activity-item__marker"></div>
              <div class="activity-item__content">
                <span class="activity-item__title">Perfil actualizado</span>
                <span class="activity-item__date">{{ formatDate(profile()?.lastUpdated || '') }}</span>
              </div>
            </div>
            <div class="activity-item" *ngIf="hasUser()">
              <div class="activity-item__marker"></div>
              <div class="activity-item__content">
                <span class="activity-item__title">Último inicio de sesión</span>
                <span class="activity-item__date">{{ formatDate(user()?.lastLogin || '') }}</span>
              </div>
            </div>
          </div>
          <div class="activity-empty" *ngIf="!lastTransactionDate()">
            <p>No hay actividad reciente</p>
          </div>
        </div>
      </div>
    </section>
  </div>

  <footer class="dashboard__footer" *ngIf="!isLoading()">
    <p class="dashboard__footer-text">
      Portal de Autogestión - {{ currentYear() }}
    </p>
  </footer>
</div>

// === ARCHIVO: src/app/features/dashboard/dashboard.component.scss ===
.dashboard {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--color-background, #f5f7fa);
  padding: var(--spacing-md, 1.5rem);

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-lg, 2rem);
    padding-bottom: var(--spacing-md, 1.5rem);
    border-bottom: 1px solid var(--color-border, #e0e4e8);
  }

  &__header-content {
    flex: 1;
  }

  &__title {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-text-primary, #1a202c);
    margin: 0 0 var(--spacing-xs, 0.5rem) 0;
  }

  &__subtitle {
    font-size: 1rem;
    color: var(--color-text-secondary, #718096);
    margin: 0;
  }

  &__header-actions {
    display: flex;
    gap: var(--spacing-sm, 1rem);
  }

  &__content {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: var(--spacing-lg, 2rem);
    flex: 1;
  }

  &__overview {
    grid-column: span 12;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-md, 1.5rem);

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }

  &__profile {
    grid-column: span 6;

    @media (max-width: 1024px) {
      grid-column: span 12;
    }
  }

  &__transactions {
    grid-column: span 6;

    @media (max-width: 1024px) {
      grid-column: span 12;
    }
  }

  &__activity {
    grid-column: span 12;
  }

  &__footer {
    margin-top: var(--spacing-xl, 3rem);
    padding-top: var(--spacing-md, 1.5rem);
    border-top: 1px solid var(--color-border, #e0e4e8);
    text-align: center;
  }

  &__footer-text {
    font-size: 0.875rem;
    color: var(--color-text-muted, #a0aec0);
    margin: 0;
  }
}

.card {
  background: var(--color-surface, #ffffff);
  border-radius: var(--border-radius-lg, 0.75rem);
  box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.1));
  overflow: hidden;
  transition: box-shadow var(--transition-fast, 0.15s ease);

  &:hover {
    box-shadow: var(--shadow-md, 0 4px 6px rgba(0, 0, 0, 0.1));
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-md, 1.5rem);
    border-bottom: 1px solid var(--color-border, #e0e4e8);

    &--actions {
      padding-right: var(--spacing-md, 1.5rem);
    }
  }

  &__title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-text-primary, #1a202c);
    margin: 0;
  }

  &__body {
    padding: var(--spacing-md, 1.5rem);
  }
}

.user-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-md, 1.5rem);

  &__avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--color-primary, #3182ce), var(--color-primary-dark, #2c5282));
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__initials {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-surface, #ffffff);
  }

  &__details {
    flex: 1;
  }

  &__name {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-text-primary, #1a202c);
    margin: 0 0 var(--spacing-xs, 0.5rem) 0;
  }

  &__email {
    font-size: 0.875rem;
    color: var(--color-text-secondary, #718096);
    margin: 0 0 var(--spacing-xs, 0.25rem) 0;
  }

  &__id {
    font-size: 0.75rem;
    color: var(--color-text-muted, #a0aec0);
    margin: 0;
  }

  &__empty {
    text-align: center;
    padding: var(--spacing-lg, 2rem);
    color: var(--color-text-muted, #a0aec0);
  }
}

.balance-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &__amount {
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--color-text-primary, #1a202c);
    margin-bottom: var(--spacing-xs, 0.5rem);
  }

  &__label {
    font-size: 0.875rem;
    color: var(--color-text-muted, #a0aec0);
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md, 1.5rem);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--spacing-sm, 1rem);
  background: var(--color-background, #f7fafc);
  border-radius: var(--border-radius-md, 0.5rem);

  &__value {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--color-primary, #3182ce);
    margin-bottom: var(--spacing-xs, 0.25rem);
  }

  &__label {
    font-size: 0.75rem;
    color: var(--color-text-muted, #a0aec0);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
}

.profile-completion {
  margin-bottom: var(--spacing-lg, 2rem);

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-xs, 0.5rem);
  }

  &__label {
    font-size: 0.875rem;
    color: var(--color-text-secondary, #718096);
  }

  &__value {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-primary, #3182ce);
  }

  &__bar {
    height: 8px;
    background: var(--color-background, #edf2f7);
    border-radius: 4px;
    overflow: hidden;
  }

  &__progress {
    height: 100%;
    background: linear-gradient(90deg, var(--color-primary, #3182ce), var(--color-success, #38a169));
    border-radius: 4px;
    transition: width var(--transition-normal, 0.3s ease);
  }
}

.profile-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-md, 1.5rem);
  margin-bottom: var(--spacing-lg, 2rem);

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.profile-field {
  display: flex;
  flex-direction: column;

  &__label {
    font-size: 0.75rem;
    color: var(--color-text-muted, #a0aec0);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: var(--spacing-xs, 0.25rem);
  }

  &__value {
    font-size: 0.9375rem;
    color: var(--color-text-primary, #1a202c);
    font-weight: 500;
  }
}

.profile-preferences {
  &__title {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text-secondary, #718096);
    margin: 0 0 var(--spacing-sm, 1rem) 0;
  }
}

.preference-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs, 0.5rem);
}

.preference-tag {
  display: inline-block;
  padding: var(--spacing-xs, 0.5rem) var(--spacing-sm, 1rem);
  background: var(--color-background, #edf2f7);
  color: var(--color-text-secondary, #718096);
  border-radius: var(--border-radius-full, 9999px);
  font-size: 0.75rem;
  font-weight: 500;
}

.profile-empty {
  text-align: center;
  padding: var(--spacing-xl, 3rem);

  p {
    color: var(--color-text-muted, #a0aec0);
    margin-bottom: var(--spacing-md, 1.5rem);
  }
}

.transactions-list {
  display: flex;
  flex-direction: column;
}

.transaction-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md, 1.5rem);
  padding: var(--spacing-md, 1.5rem) 0;
  border-bottom: 1px solid var(--color-border, #e0e4e8);
  cursor: pointer;
  transition: background-color var(--transition-fast, 0.15s ease);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: var(--color-background, #f7fafc);
    margin: 0 calc(var(--spacing-md, 1.5rem) * -1);
    padding-left: var(--spacing-md, 1.5rem);
    padding-right: var(--spacing-md, 1.5rem);
  }

  &__icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    background: var(--color-background, #edf2f7);
    color: var(--color-text-secondary, #718096);

    &.status--completed {
      background: rgba(56, 161, 105, 0.1);
      color: var(--color-success, #38a169);
    }

    &.status--pending {
      background: rgba(237, 137, 54, 0.1);
      color: var(--color-warning, #ed8936);
    }

    &.status--failed {
      background: rgba(245, 101, 101, 0.1);
      color: var(--color-error, #f56565);
    }
  }

  &__icon-text {
    font-weight: 600;
    font-size: 0.875rem;
  }

  &__details {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__description {
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--color-text-primary, #1a202c);
    margin-bottom: var(--spacing-xs, 0.25rem);
  }

  &__date {
    font-size: 0.75rem;
    color: var(--color-text-muted, #a0aec0);
  }

  &__amount {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    &.credit {
      .transaction-item__amount-value {
        color: var(--color-success, #38a169);
      }
    }

    &.debit {
      .transaction-item__amount-value {
        color: var(--color-error, #e53e3e);
      }
    }
  }

  &__amount-value {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: var(--spacing-xs, 0.25rem);
  }

  &__status {
    font-size: 0.6875rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 2px 8px;
    border-radius: 4px;

    &.status--completed {
      background: rgba(56, 161, 105, 0.1);
      color: var(--color-success, #38a169);
    }

    &.status--pending {
      background: rgba(237, 137, 54, 0.1);
      color: var(--color-warning, #ed8936);
    }

    &.status--failed {
      background: rgba(245, 101, 101, 0.1);
      color: var(--color-error, #f56565);
    }

    &.status--cancelled {
      background: rgba(160, 174, 192, 0.1);
      color: var(--color-text-muted, #a0aec0);
    }
  }
}

.transactions-empty {
  text-align: center;
  padding: var(--spacing-xl, 3rem);
  color: var(--color-text-muted, #a0aec0);
}

.activity-timeline {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md, 1.5rem);
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-md, 1.5rem);

  &__marker {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--color-primary, #3182ce);
    flex-shrink: 0;
    margin-top: 4px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      width: 2px;
      height: calc(100% + var(--spacing-md, 1.5rem));
      background: var(--color-border, #e0e4e8);
    }

    &:last-child::after {
      display: none;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--color-text-primary, #1a202c);
    margin-bottom: var(--spacing-xs, 0.25rem);
  }

  &__date {
    font-size: 0.75rem;
    color: var(--color-text-muted, #a0aec0);
  }
}

.activity-empty {
  text-align: center;
  padding: var(--spacing-lg, 2rem);
  color: var(--color-text-muted, #a0aec0);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs, 0.5rem);
  padding: var(--spacing-sm, 1rem) var(--spacing-md, 1.5rem);
  font-size: 0.9375rem;
  font-weight: 500;
  border: none;
  border-radius: var(--border-radius-md, 0.5rem);
  cursor: pointer;
  transition: all var(--transition-fast, 0.15s ease);

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &--primary {
    background: var(--color-primary, #3182ce);
    color: var(--color-surface, #ffffff);

    &:hover:not(:disabled) {
      background: var(--color-primary-dark, #2c5282);
    }
  }

  &--secondary {
    background: var(--color-background, #edf2f7);
    color: var(--color-text-secondary, #718096);

    &:hover:not(:disabled) {
      background: var(--color-border, #e0e4e8);
    }
  }

  &--small {
    padding: var(--spacing-xs, 0.5rem) var(--spacing-sm, 1rem);
    font-size: 0.8125rem;
  }

  &__icon {
    font-size: 1rem;
  }
}

:host {
  display: block;
}


// === ARCHIVO: src/app/shared/components/loader/loader.component.ts ===
import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export type LoaderSize = 'small' | 'medium' | 'large';
export type LoaderColor = 'primary' | 'secondary' | 'white';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  template: `
    <div 
      class="loader-container" 
      [class.loader-overlay]="overlay"
      [attr.aria-busy]="true"
      [attr.aria-label]="message || 'Cargando'">
      <div 
        class="loader-spinner"
        [ngClass]="'loader-' + size"
        [class.loader-white]="color === 'white''
        [class.loader-primary]="color === 'primary'"
        [class.loader-secondary]="color === 'secondary'">
        <svg viewBox="0 0 50 50" class="loader-svg">
          <circle 
            cx="25" 
            cy="25" 
            r="20" 
            fill="none" 
            stroke-width="4"
            class="loader-circle">
          </circle>
        </svg>
      </div>
      <p 
        *ngIf="message" 
        class="loader-message"
        [class.loader-message-white]="color === 'white'">
        {{ message }}
      </p>
    </div>
  `,
  styles: [`
    .loader-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 16px;
      gap: 12px;
    }

    .loader-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.9);
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .loader-spinner {
      display: inline-block;
      position: relative;
    }

    .loader-svg {
      animation: rotate 1.5s linear infinite;
      width: 100%;
      height: 100%;
    }

    .loader-circle {
      stroke: currentColor;
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }

    .loader-small .loader-svg {
      width: 24px;
      height: 24px;
    }

    .loader-medium .loader-svg {
      width: 40px;
      height: 40px;
    }

    .loader-large .loader-svg {
      width: 64px;
      height: 64px;
    }

    .loader-white .loader-circle {
      stroke: #ffffff;
    }

    .loader-primary .loader-circle {
      stroke: #1976d2;
    }

    .loader-secondary .loader-circle {
      stroke: #757575;
    }

    .loader-message {
      margin: 0;
      font-size: 14px;
      color: #333;
      text-align: center;
    }

    .loader-message-white {
      color: #ffffff;
    }

    @keyframes rotate {
      100% {
        transform: rotate(360deg);
      }
    }

    @keyframes dash {
      0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
      }
      100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
      }
    }
  `]
})
export class LoaderComponent {
  @Input() size: LoaderSize = 'medium';
  @Input() color: LoaderColor = 'primary';
  @Input() message?: string;
  @Input() overlay = false;
}

// === ARCHIVO: src/app/shared/components/error-message/error-message.component.ts ===
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ErrorType = 'error' | 'warning' | 'info' | 'success';

export interface ErrorMessageConfig {
  type: ErrorType;
  title?: string;
  message: string;
  dismissible?: boolean;
  actionLabel?: string;
  actionCallback?: () => void;
}

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  template: `
    <div 
      class="error-message" 
      [ngClass]="'error-message--' + type"
      role="alert"
      [attr.aria-live]="type === 'error' ? 'assertive' : 'polite'">
      
      <div class="error-message__icon-container">
        <svg 
          *ngIf="type === 'error'" 
          class="error-message__icon" 
          viewBox="0 0 24 24" 
          fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
        <svg 
          *ngIf="type === 'warning'" 
          class="error-message__icon" 
          viewBox="0 0 24 24" 
          fill="currentColor">
          <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
        </svg>
        <svg 
          *ngIf="type === 'info'" 
          class="error-message__icon" 
          viewBox="0 0 24 24" 
          fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
        <svg 
          *ngIf="type === 'success'" 
          class="error-message__icon" 
          viewBox="0 0 24 24" 
          fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </div>

      <div class="error-message__content">
        <h4 
          *ngIf="title" 
          class="error-message__title">
          {{ title }}
        </h4>
        <p class="error-message__message">{{ message }}</p>
        
        <button 
          *ngIf="actionLabel" 
          class="error-message__action"
          (click)="onActionClick()"
          type="button">
          {{ actionLabel }}
        </button>
      </div>

      <button 
        *ngIf="dismissible" 
        class="error-message__dismiss"
        (click)="onDismiss()"
        type="button"
        aria-label="Cerrar mensaje">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
    </div>
  `,
  styles: [`
    .error-message {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 16px;
      border-radius: 8px;
      margin: 8px 0;
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .error-message--error {
      background-color: #ffebee;
      border: 1px solid #ef5350;
      color: #c62828;
    }

    .error-message--warning {
      background-color: #fff3e0;
      border: 1px solid #ffa726;
      color: #e65100;
    }

    .error-message--info {
      background-color: #e3f2fd;
      border: 1px solid #42a5f5;
      color: #1565c0;
    }

    .error-message--success {
      background-color: #e8f5e9;
      border: 1px solid #66bb6a;
      color: #2e7d32;
    }

    .error-message__icon-container {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
    }

    .error-message__icon {
      width: 100%;
      height: 100%;
    }

    .error-message__content {
      flex: 1;
      min-width: 0;
    }

    .error-message__title {
      margin: 0 0 4px 0;
      font-size: 16px;
      font-weight: 600;
    }

    .error-message__message {
      margin: 0;
      font-size: 14px;
      line-height: 1.5;
    }

    .error-message__action {
      margin-top: 12px;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .error-message--error .error-message__action {
      background-color: #ef5350;
      color: white;
    }

    .error-message--error .error-message__action:hover {
      background-color: #e53935;
    }

    .error-message--warning .error-message__action {
      background-color: #ffa726;
      color: white;
    }

    .error-message--warning .error-message__action:hover {
      background-color: #fb8c00;
    }

    .error-message--info .error-message__action {
      background-color: #42a5f5;
      color: white;
    }

    .error-message--info .error-message__action:hover {
      background-color: #1e88e5;
    }

    .error-message--success .error-message__action {
      background-color: #66bb6a;
      color: white;
    }

    .error-message--success .error-message__action:hover {
      background-color: #43a047;
    }

    .error-message__dismiss {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      padding: 0;
      border: none;
      background: transparent;
      cursor: pointer;
      opacity: 0.7;
      transition: opacity 0.2s ease;
    }

    .error-message__dismiss:hover {
      opacity: 1;
    }

    .error-message__dismiss svg {
      width: 18px;
      height: 18px;
    }
  `]
})
export class ErrorMessageComponent {
  @Input() type: ErrorType = 'error';
  @Input() title?: string;
  @Input() message = '';
  @Input() dismissible = false;
  @Input() actionLabel?: string;
  @Input() actionCallback?: () => void;

  @Output() dismiss = new EventEmitter<void>();
  @Output() action = new EventEmitter<void>();

  onDismiss(): void {
    this.dismiss.emit();
  }

  onActionClick(): void {
    if (this.actionCallback) {
      this.actionCallback();
    }
    this.action.emit();
  }
}

// === ARCHIVO: src/app/app.routes.ts ===
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => 
      import('./features/dashboard/dashboard.component').then(
        m => m.DashboardComponent
      ),
    data: {
      title: 'Panel Principal',
      requiresAuth: true,
      breadcrumb: 'Panel Principal'
    }
  },
  {
    path: 'perfil',
    loadComponent: () => 
      import('./features/profile/profile.component').then(
        m => m.ProfileComponent
      ),
    data: {
      title: 'Mi Perfil',
      requiresAuth: true,
      breadcrumb: 'Mi Perfil'
    }
  },
  {
    path: 'transacciones',
    loadComponent: () => 
      import('./features/transactions/transactions.component').then(
        m => m.TransactionsComponent
      ),
    data: {
      title: 'Mis Transacciones',
      requiresAuth: true,
      breadcrumb: 'Transacciones'
    }
  },
  {
    path: 'transacciones/:id',
    loadComponent: () => 
      import('./features/transaction-detail/transaction-detail.component').then(
        m => m.TransactionDetailComponent
      ),
    data: {
      title: 'Detalle de Transacción',
      requiresAuth: true,
      breadcrumb: 'Detalle'
    }
  },
  {
    path: 'configuracion',
    loadComponent: () => 
      import('./features/settings/settings.component').then(
        m => m.SettingsComponent
      ),
    data: {
      title: 'Configuración',
      requiresAuth: true,
      breadcrumb: 'Configuración'
    }
  },
  {
    path: 'ayuda',
    loadComponent: () => 
      import('./features/help/help.component').then(
        m => m.HelpComponent
      ),
    data: {
      title: 'Ayuda',
      requiresAuth: false,
      breadcrumb: 'Ayuda'
    }
  },
  {
    path: 'login',
    loadComponent: () => 
      import('./features/auth/login/login.component').then(
        m => m.LoginComponent
      ),
    data: {
      title: 'Iniciar Sesión',
      requiresAuth: false,
      breadcrumb: 'Iniciar Sesión'
    }
  },
  {
    path: 'registro',
    loadComponent: () => 
      import('./features/auth/register/register.component').then(
        m => m.RegisterComponent
      ),
    data: {
      title: 'Registrarse',
      requiresAuth: false,
      breadcrumb: 'Registrarse'
    }
  },
  {
    path: 'recuperar-password',
    loadComponent: () => 
      import('./features/auth/recover-password/recover-password.component').then(
        m => m.RecoverPasswordComponent
      ),
    data: {
      title: 'Recuperar Contraseña',
      requiresAuth: false,
      breadcrumb: 'Recuperar Contraseña'
    }
  },
  {
    path: 'error-404',
    loadComponent: () => 
      import('./features/errors/not-found/not-found.component').then(
        m => m.NotFoundComponent
      ),
    data: {
      title: 'Página No Encontrada',
      requiresAuth: false
    }
  },
  {
    path: 'error-500',
    loadComponent: () => 
      import('./features/errors/server-error/server-error.component').then(
        m => m.ServerErrorComponent
      ),
    data: {
      title: 'Error del Servidor',
      requiresAuth: false
    }
  },
  {
    path: '**',
    redirectTo: 'error-404'
  }
];


// === ARCHIVO: src/environments/environment.ts ===
export const environment = {
  production: false,
  api: {
    baseUrl: 'http://localhost:3000/api',
    authUrl: 'http://localhost:3000/api/auth',
    profileUrl: 'http://localhost:3000/api/profile',
    transactionUrl: 'http://localhost:3000/api/transactions',
    timeout: 2000,
    retryAttempts: 3,
    retryDelay: 1000,
  },
  features: {
    enableDebugMode: true,
    enablePerformanceMonitoring: true,
    enableStatePersistence: true,
    enableAutoSave: true,
    maxConcurrentRequests: 5,
    cacheEnabled: true,
    cacheTTL: 300000,
    optimisticUpdates: true,
  },
  auth: {
    tokenKey: 'auth_token',
    refreshTokenKey: 'refresh_token',
    sessionKey: 'user_session',
    tokenExpirationBuffer: 300000,
    autoRefreshEnabled: true,
    sessionTimeout: 1800000,
  },
  logging: {
    level: 'debug',
    enableConsole: true,
    enableRemote: false,
    remoteEndpoint: '',
    logActions: true,
    logStateChanges: true,
    logHttpRequests: true,
    logPerformanceMetrics: true,
  },
  performance: {
    enableWebVitals: true,
    reportInterval: 5000,
    metricsToTrack: ['FCP', 'LCP', 'FID', 'CLS', 'TTFB'],
    maxMetricsBuffer: 50,
    enableLongTaskDetection: true,
    longTaskThreshold: 50,
  },
  state: {
    persistenceKey: 'portal_state',
    blacklist: ['router', 'loading'],
    whitelist: ['auth', 'profile', 'transaction'],
    syncInterval: 60000,
    enableDevTools: true,
    maxHistorySize: 50,
  },
  user: {
    maxActiveUsers: 10000,
    sessionWarningTime: 120000,
    idleTimeout: 300000,
    maxLoginAttempts: 5,
    lockoutDuration: 900000,
  },
  ui: {
    theme: 'light',
    language: 'es',
    currency: 'COP',
    dateFormat: 'DD/MM/YYYY',
    decimalSeparator: ',',
    thousandSeparator: '.',
  },
  security: {
    enableCsrfProtection: true,
    enableXssProtection: true,
    enableContentSecurityPolicy: true,
    allowedDomains: ['localhost:3000', 'localhost:4200'],
  },
  analytics: {
    enabled: true,
    trackPageViews: true,
    trackEvents: true,
    trackErrors: true,
    sampleRate: 100,
  },
  errorHandling: {
    showDetailedErrors: true,
    enableErrorBoundary: true,
    maxRetries: 3,
    retryableStatusCodes: [408, 429, 500, 502, 503, 504],
    fallbackMessage: 'Ha ocurrido un error. Por favor, intente de nuevo.',
  },
  notifications: {
    enabled: true,
    position: 'top-right',
    duration: 5000,
    maxVisible: 3,
    types: {
      success: { duration: 3000, icon: true },
      error: { duration: 8000, icon: true },
      warning: { duration: 5000, icon: true },
      info: { duration: 4000, icon: true },
    },
  },
};

export type EnvironmentConfig = typeof environment;

// === ARCHIVO: src/environments/environment.prod.ts ===
export const environment = {
  production: true,
  api: {
    baseUrl: 'https://api.portalautogestion.com/api',
    authUrl: 'https://api.portalautogestion.com/api/auth',
    profileUrl: 'https://api.portalautogestion.com/api/profile',
    transactionUrl: 'https://api.portalautogestion.com/api/transactions',
    timeout: 2000,
    retryAttempts: 2,
    retryDelay: 500,
  },
  features: {
    enableDebugMode: false,
    enablePerformanceMonitoring: true,
    enableStatePersistence: true,
    enableAutoSave: true,
    maxConcurrentRequests: 3,
    cacheEnabled: true,
    cacheTTL: 600000,
    optimisticUpdates: true,
  },
  auth: {
    tokenKey: 'auth_token_prod',
    refreshTokenKey: 'refresh_token_prod',
    sessionKey: 'user_session_prod',
    tokenExpirationBuffer: 600000,
    autoRefreshEnabled: true,
    sessionTimeout: 3600000,
  },
  logging: {
    level: 'error',
    enableConsole: false,
    enableRemote: true,
    remoteEndpoint: 'https://logs.portalautogestion.com/api/v1/logs',
    logActions: false,
    logStateChanges: false,
    logHttpRequests: false,
    logPerformanceMetrics: true,
  },
  performance: {
    enableWebVitals: true,
    reportInterval: 10000,
    metricsToTrack: ['LCP', 'FID', 'CLS'],
    maxMetricsBuffer: 100,
    enableLongTaskDetection: true,
    longTaskThreshold: 100,
  },
  state: {
    persistenceKey: 'portal_state_prod',
    blacklist: ['router', 'loading', 'debug'],
    whitelist: ['auth', 'profile', 'transaction'],
    syncInterval: 300000,
    enableDevTools: false,
    maxHistorySize: 20,
  },
  user: {
    maxActiveUsers: 10000,
    sessionWarningTime: 180000,
    idleTimeout: 600000,
    maxLoginAttempts: 3,
    lockoutDuration: 1800000,
  },
  ui: {
    theme: 'light',
    language: 'es',
    currency: 'COP',
    dateFormat: 'DD/MM/YYYY',
    decimalSeparator: ',',
    thousandSeparator: '.',
  },
  security: {
    enableCsrfProtection: true,
    enableXssProtection: true,
    enableContentSecurityPolicy: true,
    allowedDomains: ['api.portalautogestion.com', 'portalautogestion.com'],
  },
  analytics: {
    enabled: true,
    trackPageViews: true,
    trackEvents: true,
    trackErrors: true,
    sampleRate: 10,
  },
  errorHandling: {
    showDetailedErrors: false,
    enableErrorBoundary: true,
    maxRetries: 2,
    retryableStatusCodes: [408, 429, 502, 503, 504],
    fallbackMessage: 'Ha ocurrido un error inesperado. Por favor, intente más tarde.',
  },
  notifications: {
    enabled: true,
    position: 'top-right',
    duration: 4000,
    maxVisible: 3,
    types: {
      success: { duration: 2500, icon: true },
      error: { duration: 6000, icon: true },
      warning: { duration: 4000, icon: true },
      info: { duration: 3000, icon: true },
    },
  },
};

export type EnvironmentConfig = typeof environment;

```
