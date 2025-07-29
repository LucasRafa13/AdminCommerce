import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app'; // Seu componente raiz, baseado no nome do arquivo app.ts

// Esta é a forma moderna de iniciar uma aplicação Angular
bootstrapApplication(App, appConfig).catch((err) => console.error(err));
