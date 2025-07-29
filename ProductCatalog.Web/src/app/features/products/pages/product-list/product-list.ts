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
import { Product } from '../../../core/models/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { NotificationService } from '../../../../core/services/notification.service';
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
  isLoading = true;
  hasError = false;
  errorMessage = '';
  showFilters = true;

  private destroy$ = new Subject<void>();

  constructor(
    private productService: ProductService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProducts() {
    this.isLoading = true;
    this.hasError = false;

    this.productService
      .getAll()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (err) => {
          this.hasError = true;
          this.errorMessage =
            'Falha ao carregar produtos. Verifique a conexão com a API.';
          this.notificationService.showError(this.errorMessage);
          console.error(err);
        },
      });
  }

  refreshData() {
    this.loadProducts();
  }

  retryLoad() {
    this.loadProducts();
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
          error: (err) => {
            this.notificationService.showError('Falha ao excluir o produto.');
            console.error(err);
          },
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
          const statusText = status ? 'ativado' : 'desativado';
          this.notificationService.showSuccess(
            `Produto ${statusText} com sucesso!`
          );
          const index = this.products.findIndex((p) => p.id === product.id);
          if (index !== -1) this.products[index].isActive = status;
        },
        error: (err) => {
          this.notificationService.showError(
            'Falha ao atualizar o status do produto.'
          );
          console.error(err);
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

  getDepartmentName(code: string): string {
    const departments: { [key: string]: string } = {
      '010': 'BEBIDAS',
      '020': 'CONGELADOS',
      '030': 'LATICÍNIOS',
      '040': 'VEGETAIS',
    };
    return departments[code] || code;
  }

  exportAllData() {}
  showHelp() {
    alert('Ajuda...');
  }
}
