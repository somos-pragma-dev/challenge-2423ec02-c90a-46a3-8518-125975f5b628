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