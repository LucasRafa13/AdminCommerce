import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    // Carrega o ARQUIVO de rotas diretamente, sem um módulo intermediário.
    // Esta é a abordagem moderna e mais segura.
    loadChildren: () =>
      import('./features/products/products.routes').then(
        (m) => m.productsRoutes
      ),
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: '**', // Rota coringa para qualquer outra coisa
    redirectTo: 'products',
  },
];
