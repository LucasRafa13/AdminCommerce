import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Importa as rotas que acabamos de definir
import { productsRoutes } from './products.routes';

// Importa os componentes standalone que este módulo gerencia
import { ProductListComponent } from './pages/product-list/product-list';
import { ProductFormComponent } from './pages/product-form/product-form';
import { ProductTableComponent } from './components/product-table/product-table';

// Importa todos os módulos do Angular Material necessários para esses componentes
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [
    // Módulos essenciais do Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Conecta as rotas filhas ao sistema de roteamento
    RouterModule.forChild(productsRoutes),

    // Componentes standalone que serão usados nas rotas acima
    ProductListComponent,
    ProductFormComponent,
    ProductTableComponent,

    // Todos os módulos do Angular Material
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatDividerModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
  ],
})
export class ProductsModule {}
