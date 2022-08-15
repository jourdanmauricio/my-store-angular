import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError, zip } from 'rxjs';
import { checkTime } from '../interceptors/time.interceptor';
import {
  Product,
  createProductDto,
  updateProductDto,
} from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = `${environment.API_URL}/api`;
  constructor(private http: HttpClient) {}

  getAll(limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http
      .get<Product[]>(`${this.apiUrl}/products`, {
        params,
        context: checkTime(),
      })
      .pipe(
        map((products) =>
          products.map((item) => {
            return { ...item, taxes: 0.21 * item.price };
          })
        )
      );
  }

  getByCategory(categoryId: string, limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit !== undefined && offset !== undefined) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }

    return this.http.get<Product[]>(
      `${this.apiUrl}/categories/${categoryId}/products`,
      { params }
    );
  }

  getOne(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.InternalServerError) {
          return throwError(() => 'Algo fallo en el server');
        }
        if (error.status === HttpStatusCode.NotFound) {
          return throwError(() => 'El producto no existe');
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError(() => 'No estas autorizado');
        }
        return throwError(() => 'Ups algo salió mal');
      })
    );
  }

  fetchReadAndUpdate(id: string, dto: updateProductDto) {
    return zip(this.getOne(id), this.update(id, dto));
  }

  create(dto: createProductDto) {
    return this.http.post<Product>(`${this.apiUrl}/products`, dto);
  }

  update(id: string, dto: updateProductDto) {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }
}
