import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { AuthResponse } from '../models/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'https://localhost:7058/api'; // Asegúrate que coincide con tu backend
  private authToken: string | null = null;

  constructor(private http: HttpClient) { }

  // Llama al endpoint real para obtener el token (sin credenciales)
  token(): Observable<AuthResponse> {
    return new Observable(observer => {
      this.http.post<AuthResponse>(`${this.baseUrl}/auth/token`, {}).subscribe({
        next: (res) => {
          this.authToken = res.token;
          observer.next(res);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authToken || ''}`
    });
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/product`, {
      headers: this.getAuthHeaders()
    });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/product/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/productos`, product, {
      headers: this.getAuthHeaders()
    });
  }

  updateProduct(id: number, product: Partial<Product>): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/productos/${id}`, product, {
      headers: this.getAuthHeaders()
    });
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/productos/${id}`, {
      headers: this.getAuthHeaders()
    });
  }

  // Opcional: puedes guardar el token en localStorage si quieres persistencia
  saveToken(token: string): void {
    this.authToken = token;
    localStorage.setItem('auth_token', token);
  }

  loadToken(): void {
    this.authToken = localStorage.getItem('auth_token');
  }

}
