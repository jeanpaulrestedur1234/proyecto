import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';  // Asegúrate de que routes esté correctamente configurado

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Para mejorar el rendimiento
    provideRouter(routes) // Asegura que las rutas estén bien configuradas
  ]
};
