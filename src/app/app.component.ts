import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './services/productService';
import { Product } from './models/Product';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NzTableModule, NzButtonModule, NzDividerModule, NzTagModule],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  dataSet: Product[] = [];
  isLoading = false;

  constructor(private apiService: ProductService) { }

  ngOnInit(): void {
    this.loginAndLoadProducts();
  }

  private loginAndLoadProducts(): void {
    this.apiService.token().subscribe({
      next: () => {
        this.loadProducts();
      },
      error: (err) => {
        console.error('Error obteniendo token:', err);
      }
    });
  }

  private loadProducts(): void {
    this.isLoading = true;
    this.apiService.getAllProducts().subscribe({
      next: (products) => {
        this.dataSet = products;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
        this.isLoading = false;
      }
    });
  }
  viewDetails(product: Product): void {
    console.log('Viewing details for:', product);
    this.apiService.getProductById(product.id).subscribe({
      next: (details) => console.log('Details:', details),
      error: (err) => console.error('Error getting details:', err)
    });
  }
  
  editProduct(product: Product): void {
    console.log('Editing product:', product);
    // Aquí puedes abrir un modal o navegar a una vista de edición
  }
  
  deleteProduct(id: number): void {
    console.log('Deleting product ID:', id);
    this.apiService.deleteProduct(id).subscribe({
      next: () => {
        console.log('Product deleted successfully');
        this.dataSet = this.dataSet.filter(p => p.id !== id);
      },
      error: (err) => console.error('Error deleting product:', err)
    });
  }
  
  createProduct(): void {
    const newProduct: Omit<Product, 'id'> = {
      name: 'Nuevo producto',
      description: 'Creado desde Angular',
      unitPrice: 100,
      internalReference: 'REF-123',
      state: true,
      unitMeasure: 'Unidad',
      creationDate: new Date()
    };
  
    this.apiService.createProduct(newProduct).subscribe({
      next: (created) => {
        console.log('Product created:', created);
        this.dataSet.push(created);
      },
      error: (err) => console.error('Error creating product:', err)
    });
  }
}
