import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list';
import { ProductFormComponent } from './pages/product-form/product-form';

// Define as rotas que serão carregadas dentro do 'ProductsModule'
// O Angular vai resolver os caminhos como /products, /products/add, etc.
export const productsRoutes: Routes = [
  {
    path: '', // Rota vazia (o padrão, ex: /products) -> exibe a lista
    component: ProductListComponent,
  },
  {
    path: 'add', // Rota para /products/add -> exibe o formulário
    component: ProductFormComponent,
  },
  {
    path: 'edit/:id', // Rota para /products/edit/some-id -> exibe o formulário em modo de edição
    component: ProductFormComponent,
  },
];
