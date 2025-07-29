import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

// Imports do Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Models e Serviços
import {
  Product,
  Department,
  CreateProductRequest,
  UpdateProductRequest,
} from '../../../core/models/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { DepartmentService } from '../../../../core/services/department.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.scss'],
})
export class ProductFormComponent implements OnInit {
  form!: FormGroup;
  departments: Department[] = [];
  isEdit = false;
  isLoading = false;
  productId: string | null = null;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private departmentService: DepartmentService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [''],
      code: ['', [Validators.required, Validators.pattern(/^[A-Z0-9]+$/)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      departmentCode: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0.01)]],
      isActive: [true],
    });

    this.loadDepartments();

    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.isEdit = true;
      this.loadProduct(this.productId);
    }
  }

  loadDepartments() {
    this.departmentService.getAll().subscribe({
      next: (data) => {
        this.departments = data;
        // **MELHORIA:** Se for um novo produto, pré-seleciona o primeiro departamento.
        if (!this.isEdit && this.departments.length > 0) {
          this.form.get('departmentCode')?.setValue(this.departments[0].code);
        }
      },
      error: (error) => {
        console.error('Erro ao carregar departamentos:', error);
        this.notificationService.showError('Falha ao carregar departamentos.');
      },
    });
  }

  loadProduct(id: string) {
    this.isLoading = true;
    this.productService
      .getById(id)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (product) => {
          this.form.patchValue(product);
        },
        error: (error) => {
          this.notificationService.showError('Produto não encontrado.');
          console.error('Erro ao carregar produto:', error);
          this.router.navigate(['/products']);
        },
      });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.notificationService.showWarning(
        'Por favor, corrija os erros no formulário.'
      );
      return;
    }

    this.isLoading = true;
    let request$: Observable<any>;

    if (this.isEdit && this.productId) {
      const payload: UpdateProductRequest = this.form.value;
      request$ = this.productService.update(this.productId, payload);
    } else {
      const payload: CreateProductRequest = this.form.value;
      delete (payload as any).id;
      request$ = this.productService.create(payload);
    }

    request$.pipe(finalize(() => (this.isLoading = false))).subscribe({
      next: () => {
        const message = `Produto ${
          this.isEdit ? 'atualizado' : 'criado'
        } com sucesso!`;
        this.notificationService.showSuccess(message);
        this.router.navigate(['/products']);
      },
      error: (error) => {
        this.notificationService.showError('Erro ao salvar o produto.');
        console.error('Erro ao salvar produto:', error);
      },
    });
  }

  onCancel() {
    this.router.navigate(['/products']);
  }
  hasFieldError(fieldName: string, errorType?: string): boolean {
    const field = this.form.get(fieldName);
    if (!field) return false;
    if (errorType)
      return field.hasError(errorType) && (field.touched || field.dirty);
    return field.invalid && (field.touched || field.dirty);
  }
  getFieldErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (!field || !field.errors) return '';
    const errors = field.errors;
    if (errors['required']) return `Este campo é obrigatório`;
    if (errors['minlength'])
      return `Deve ter pelo menos ${errors['minlength'].requiredLength} caracteres`;
    if (errors['pattern']) return `Formato inválido`;
    if (errors['min']) return `O valor deve ser maior que ${errors['min'].min}`;
    return 'Campo inválido';
  }
}
