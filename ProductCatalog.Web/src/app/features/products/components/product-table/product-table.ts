// ProductTableComponent
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotificationService } from '../../../../core/services/notification.service';
import { Product, Department } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './product-table.html',
  styleUrls: ['./product-table.scss'],
})
export class ProductTableComponent implements OnInit, OnChanges {
  @Input() products: Product[] = [];
  @Input() allDepartments: Department[] = [];
  @Input() isLoading: boolean = false;
  @Input() showFilters: boolean = true;

  @Output() edit = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<Product>();
  @Output() statusChange = new EventEmitter<{
    product: Product;
    status: boolean;
  }>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<Product>([]);
  displayedColumns: string[] = [
    'code',
    'description',
    'department',
    'price',
    'status',
    'actions',
  ];

  searchTerm = '';
  selectedDepartment = '';
  selectedStatus = '';

  private departmentMap: { [key: string]: string } = {};

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.setupFilterPredicate();

    if (this.allDepartments.length > 0) {
      this.departmentMap = this.allDepartments.reduce((map, dept) => {
        map[dept.code] = dept.description;
        return map;
      }, {} as { [key: string]: string });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const departmentsChanged =
      changes['allDepartments'] && this.allDepartments.length > 0;

    if (departmentsChanged) {
      console.debug(
        '[DEBUG] Atualizando departmentMap com:',
        this.allDepartments
      );
      this.departmentMap = this.allDepartments.reduce((map, dept) => {
        map[dept.code] = dept.description;
        return map;
      }, {} as { [key: string]: string });
    }

    if (changes['products'] || departmentsChanged) {
      console.debug('[DEBUG] Aplicando produtos após mudança:', this.products);
      this.dataSource.data = this.products;
    }
  }

  setupFilterPredicate() {
    this.dataSource.filterPredicate = (data: Product, _: string) => {
      const deptName = this.getDepartmentName(data.departmentCode);
      const matchesSearch =
        !this.searchTerm ||
        data.code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        data.description.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesDepartment =
        !this.selectedDepartment ||
        data.departmentCode === this.selectedDepartment;

      const matchesStatus =
        this.selectedStatus === '' ||
        data.isActive.toString() === this.selectedStatus;

      return matchesSearch && matchesDepartment && matchesStatus;
    };
  }

  applyFilter() {
    this.dataSource.filter = 'trigger';
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedDepartment = '';
    this.selectedStatus = '';
    this.applyFilter();
    this.notificationService.showInfo('Filtros limpos com sucesso');
  }

  getDepartmentName(code: string): string {
    if (!code || !this.departmentMap[code]) {
      return 'N/A';
    }
    return this.departmentMap[code];
  }

  onEdit(product: Product) {
    this.edit.emit(product);
  }

  onDelete(product: Product) {
    this.delete.emit(product);
  }

  toggleStatus(product: Product, event: any) {
    this.statusChange.emit({ product, status: event.checked });
  }
}
