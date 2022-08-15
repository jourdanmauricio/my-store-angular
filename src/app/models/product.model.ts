import { Category } from './category.model';

export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  category: Category;
  description: string;
  taxes?: number;
}

export interface createProductDto extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

export interface updateProductDto extends Partial<createProductDto> {}
