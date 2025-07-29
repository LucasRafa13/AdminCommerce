import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  ViewChild,
  OnChanges,
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
import { Product } from '../../../core/models/product.model';

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
    // O componente 'Loading' foi removido daqui, pois não era utilizado e causava o erro.
  ],
  templateUrl: './product-table.html',
  styleUrls: ['./product-table.scss'],
})
export class ProductTableComponent implements OnInit, OnChanges {
  @Input() products: Product[] = [];
  @Input() isLoading: boolean = false;
  @Input() showFilters: boolean = true;

  @Output() add = new EventEmitter<void>();
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

  searchTerm: string = '';
  selectedDepartment: string = '';
  selectedStatus: string = '';

  private departmentMap: { [key: string]: string } = {
    '010': 'BEBIDAS',
    '020': 'CONGELADOS',
    '030': 'LATICÍNIOS',
    '040': 'VEGETAIS',
  };
  departments: string[] = Object.values(this.departmentMap);

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.dataSource.data = this.products;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.filterPredicate = (data: Product, filter: string) => {
      const searchText = this.searchTerm.toLowerCase();
      const departmentName = this.getDepartmentName(data.departmentCode);
      const matchesSearch =
        !this.searchTerm ||
        data.code.toLowerCase().includes(searchText) ||
        data.description.toLowerCase().includes(searchText);
      const matchesDepartment =
        !this.selectedDepartment || departmentName === this.selectedDepartment;
      const matchesStatus =
        this.selectedStatus === '' ||
        data.isActive.toString() === this.selectedStatus;

      return matchesSearch && matchesDepartment && matchesStatus;
    };
  }

  ngOnChanges() {
    if (this.dataSource) {
      this.dataSource.data = this.products;
    }
  }

  applyFilter() {
    this.dataSource.filter = 'trigger'; // Aciona o filterPredicate
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
    return this.departmentMap[code] || 'Desconhecido';
  }

  onAdd() {
    this.add.emit();
  }

  onEdit(product: Product) {
    this.edit.emit(product);
  }

  onDelete(product: Product) {
    this.delete.emit(product);
  }

  toggleStatus(product: Product, event: any) {
    const newStatus = event.checked;
    this.statusChange.emit({ product, status: newStatus });
  }

  exportToCSV() {
    try {
      const csvData = this.convertToCSV(this.dataSource.filteredData);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute(
          'download',
          `produtos_${new Date().toISOString().split('T')[0]}.csv`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      this.notificationService.showSuccess('Exportação realizada com sucesso!');
    } catch (error) {
      this.notificationService.showError(
        'Erro ao exportar dados. Tente novamente.'
      );
    }
  }

  private convertToCSV(data: Product[]): string {
    const headers = ['Código', 'Descrição', 'Departamento', 'Preço', 'Status'];
    const csvRows = [];
    csvRows.push(headers.join(','));
    for (const product of data) {
      const row = [
        product.code,
        `"${product.description}"`,
        this.getDepartmentName(product.departmentCode),
        product.price.toString().replace('.', ','),
        product.isActive ? 'Ativo' : 'Inativo',
      ];
      csvRows.push(row.join(','));
    }
    return csvRows.join('\n');
  }
}
