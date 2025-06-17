import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap, catchError } from 'rxjs/operators';
import { Product } from '../models/Product';
import { AuthResponse } from '../models/authResponse';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://api.yourapi.com'; // Replace with your actual API base URL
  private authToken: string | null = null;

  // Simulate some initial mock products
  private mockProducts: Product[] = [
    { id: 1, name: 'Laptop Pro', description: 'High-performance laptop', unitPrice: 1200, unitMeasure: '50' },
    { id: 2, name: 'Wireless Mouse', description: 'Ergonomic wireless mouse', unitPrice: 25, unitMeasure: '200' },
    { id: 3, name: 'Mechanical Keyboard', description: 'RGB backlit mechanical keyboard', unitPrice: 80, unitMeasure: '75' },
    { id: 4, name: 'Monitor 4K', description: '27-inch 4K UHD monitor', unitPrice: 350, unitMeasure: '30' }
  ];

  constructor(private http: HttpClient) { }

  /**
   * Retrieves the current authentication token.
   * @returns {string | null} The authentication token.
   */
  getToken(): string | null {
    return this.authToken;
  }

  /**
   * Sets authentication headers for requests.
   * @returns {HttpHeaders} HTTP headers with authorization token.
   */
  private getAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    if (this.authToken) {
      headers = headers.set('Authorization', `Bearer ${this.authToken}`);
    }
    return headers;
  }

  // --- Authentication Endpoint ---
  /**
   * Simulates a login request to obtain an authentication token.
   * In a real app, this would involve sending credentials (username/password).
   * @returns {Observable<AuthResponse>} An observable of the authentication response.
   */
  login(): Observable<AuthResponse> {
    // Simulate API call to /auth/login
    // In a real scenario, you'd send { username: 'user', password: 'password' }
    console.log('Simulating login request...');
    return of({ token: 'dummy_jwt_token_12345', expiresIn: 3600 }).pipe(
      delay(1000), // Simulate network delay
      tap(response => {
        this.authToken = response.token;
        console.log('Token saved:', this.authToken);
        // In a real app, you might save this to localStorage:
        // localStorage.setItem('auth_token', response.token);
      }),
      catchError(error => {
        console.error('Login failed', error);
        return throwError(() => new Error('Login failed'));
      })
    );
  }

  // --- Product Endpoints (CRUD) ---

  /**
   * Fetches all products.
   * @returns {Observable<Product[]>} An observable of an array of products.
   */
  getAllProducts(): Observable<Product[]> {
    // In a real app: return this.http.get<Product[]>(`${this.baseUrl}/products`, { headers: this.getAuthHeaders() });
    console.log('Simulating fetching all products...');
    return of(this.mockProducts).pipe(
      delay(500), // Simulate network delay
      catchError(error => {
        console.error('Failed to get all products', error);
        return throwError(() => new Error('Failed to fetch products'));
      })
    );
  }

  /**
   * Fetches a single product by its ID.
   * @param {string} id - The ID of the product.
   * @returns {Observable<Product>} An observable of a single product.
   */
  getProductById(id: string): Observable<Product> {
    // In a real app: return this.http.get<Product>(`${this.baseUrl}/products/${id}`, { headers: this.getAuthHeaders() });
    console.log(`Simulating fetching product with ID: ${id}`);
    const product = this.mockProducts.find(p => p.id === id);
    if (product) {
      return of(product).pipe(delay(300));
    } else {
      return throwError(() => new Error(`Product with ID ${id} not found`));
    }
  }

  /**
   * Creates a new product.
   * @param {Omit<Product, 'id'>} newProductData - The data for the new product (excluding ID).
   * @returns {Observable<Product>} An observable of the created product with its ID.
   */
  createProduct(newProductData: Omit<Product, 'id'>): Observable<Product> {
    // In a real app: return this.http.post<Product>(`${this.baseUrl}/products`, newProductData, { headers: this.getAuthHeaders() });
    console.log('Simulating creating product:', newProductData);
    const newProduct: Product = { ...newProductData, id: `prod-${this.mockProducts.length + 1}` };
    this.mockProducts.push(newProduct);
    return of(newProduct).pipe(
      delay(700),
      tap(() => console.log('Product created:', newProduct)),
      catchError(error => {
        console.error('Failed to create product', error);
        return throwError(() => new Error('Failed to create product'));
      })
    );
  }

  /**
   * Updates an existing product.
   * @param {string} id - The ID of the product to update.
   * @param {Partial<Product>} updatedProductData - The partial data to update.
   * @returns {Observable<Product>} An observable of the updated product.
   */
  updateProduct(id: string, updatedProductData: Partial<Product>): Observable<Product> {
    // In a real app: return this.http.put<Product>(`${this.baseUrl}/products/${id}`, updatedProductData, { headers: this.getAuthHeaders() });
    console.log(`Simulating updating product ID: ${id} with data:`, updatedProductData);
    const index = this.mockProducts.findIndex(p => p.id === id);
    if (index > -1) {
      this.mockProducts[index] = { ...this.mockProducts[index], ...updatedProductData };
      return of(this.mockProducts[index]).pipe(
        delay(600),
        tap(() => console.log('Product updated:', this.mockProducts[index])),
        catchError(error => {
          console.error('Failed to update product', error);
          return throwError(() => new Error('Failed to update product'));
        })
      );
    } else {
      return throwError(() => new Error(`Product with ID ${id} not found for update`));
    }
  }

  /**
   * Deletes a product by its ID.
   * @param {string} id - The ID of the product to delete.
   * @returns {Observable<void>} An observable that completes upon successful deletion.
   */
  deleteProduct(id: string): Observable<void> {
    // In a real app: return this.http.delete<void>(`${this.baseUrl}/products/${id}`, { headers: this.getAuthHeaders() });
    console.log(`Simulating deleting product with ID: ${id}`);
    const initialLength = this.mockProducts.length;
    this.mockProducts = this.mockProducts.filter(p => p.id !== id);
    if (this.mockProducts.length < initialLength) {
      return of(void 0).pipe(
        delay(400),
        tap(() => console.log(`Product ID ${id} deleted.`)),
        catchError(error => {
          console.error('Failed to delete product', error);
          return throwError(() => new Error('Failed to delete product'));
        })
      );
    } else {
      return throwError(() => new Error(`Product with ID ${id} not found for deletion`));
    }
  }
}