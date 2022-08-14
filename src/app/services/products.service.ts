import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Product,
  createProductDto,
  updateProductDto,
} from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';
  constructor(private http: HttpClient) {}

  getAllProducts() {
    let prods = this.http.get<Product[]>(this.apiUrl);
    return prods;
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  create(dto: createProductDto) {
    return this.http.post<Product>(this.apiUrl, dto);
  }

  update(id: string, dto: updateProductDto) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto);
  }
}
