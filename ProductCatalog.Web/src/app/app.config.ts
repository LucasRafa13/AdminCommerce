import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
// CORREÇÃO PARA DEPURAÇÃO:
// Vamos usar 'provideNoopAnimations' temporariamente.
// Isso desativa as animações, mas permite que a aplicação carregue.
// Se a tela branca sumir, confirma que o problema está no pacote de animações.
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // Essencial para a API
    // Usando a versão sem operações para contornar o erro de resolução.
    provideNoopAnimations(),
  ],
};
