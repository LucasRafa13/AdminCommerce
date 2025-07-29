export interface Product {
  id: string;
  code: string;
  description: string;
  departmentCode: string;
  price: number;
  isActive: boolean;
}

export interface CreateProductRequest {
  code: string;
  description: string;
  departmentCode: string;
  price: number;
  isActive: boolean;
}

export interface UpdateProductRequest extends CreateProductRequest {
  id: string;
}

export interface Department {
  code: string;
  description: string;
}
