export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  category: Category;
  description: string;
}

export interface createProductDto extends Omit<Product, 'id' | 'category'> {
  categoryId: number;
}

export interface updateProductDto extends Partial<createProductDto> {}
