import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

// Imports do Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

// Nossos componentes e serviços
import { Product, Department } from '../../../core/models/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { DepartmentService } from '../../../../core/services/department.service';
import { ProductTableComponent } from '../../components/product-table/product-table';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatDividerModule,
    MatTooltipModule,
    ProductTableComponent,
  ],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  allDepartments: Department[] = []; // Renomeado para clareza
  isLoading = true;
  hasError = false;
  errorMessage = '';
  showFilters = true;

  private destroy$ = new Subject<void>();

  constructor(
    private productService: ProductService,
    private notificationService: NotificationService,
    private router: Router,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    this.loadInitialData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadInitialData() {
    this.isLoading = true;
    this.departmentService
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (depts) => {
          this.allDepartments = depts;
          this.loadProducts(); // Carrega produtos APÓS ter os departamentos
        },
        error: (err) => {
          this.isLoading = false;
          this.hasError = true;
          this.errorMessage = 'Falha crítica ao carregar dados essenciais.';
          this.notificationService.showError(this.errorMessage);
          console.error(err);
        },
      });
  }

  loadProducts() {
    this.isLoading = true;
    this.hasError = false;
    console.log('[DEBUG] Iniciando carregamento de produtos...');

    this.productService
      .getAll()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
          console.log('[DEBUG] Finalizou carregamento de produtos.');
        })
      )
      .subscribe({
        next: (data) => {
          this.products = data;
          console.log('[DEBUG] Produtos recebidos da API:', data);

          if (Array.isArray(data) && data.length > 0) {
            data.forEach((product, index) => {
              console.log(
                `[DEBUG] Produto ${index}:`,
                `ID: ${product.id}`,
                `Code: ${product.code}`,
                `Description: ${product.description}`,
                `DepartmentCode: ${product.departmentCode}`,
                `Price: ${product.price}`,
                `IsActive: ${product.isActive}`
              );
            });
          } else {
            console.warn('[DEBUG] Nenhum produto foi retornado da API.');
          }
        },
        error: (err) => {
          this.hasError = true;
          this.errorMessage = 'Falha ao carregar produtos.';
          this.notificationService.showError(this.errorMessage);
          console.error('[ERRO] Falha ao carregar produtos:', err);
        },
      });
  }

  // ... O resto dos seus métodos (refreshData, navigateToEdit, etc.) permanece o mesmo ...
  refreshData() {
    this.loadProducts();
  }
  retryLoad() {
    this.loadInitialData();
  }
  toggleFilters() {
    this.showFilters = !this.showFilters;
  }
  navigateToAdd() {
    this.router.navigate(['/products/add']);
  }
  navigateToEdit(product: Product) {
    this.router.navigate(['/products/edit', product.id]);
  }

  confirmDelete(product: Product) {
    if (
      confirm(
        `Tem certeza que deseja excluir o produto "${product.description}"?`
      )
    ) {
      this.productService
        .delete(product.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.notificationService.showSuccess(
              'Produto excluído com sucesso!'
            );
            this.loadProducts();
          },
          error: (err) =>
            this.notificationService.showError('Falha ao excluir o produto.'),
        });
    }
  }

  updateProductStatus(event: { product: Product; status: boolean }) {
    const { product, status } = event;
    const updatedProduct = { ...product, isActive: status };

    this.productService
      .update(product.id, updatedProduct)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.notificationService.showSuccess(
            `Status atualizado com sucesso!`
          );
          const index = this.products.findIndex((p) => p.id === product.id);
          if (index !== -1) this.products[index].isActive = status;
        },
        error: (err) => {
          this.notificationService.showError('Falha ao atualizar o status.');
          this.loadProducts();
        },
      });
  }

  getActiveProductsCount(): number {
    return this.products.filter((p) => p.isActive).length;
  }
  getInactiveProductsCount(): number {
    return this.products.filter((p) => !p.isActive).length;
  }
  exportAllData() {}
  showHelp() {
    alert('Ajuda...');
  }
}
