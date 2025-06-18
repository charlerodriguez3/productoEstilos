import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { Router, RouterOutlet} from '@angular/router';
import { ProductService } from './services/productService';
import { Product } from './models/Product';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,  RouterOutlet, NzTableModule, NzButtonModule, NzDividerModule, NzTagModule],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  dataSet: Product[] = [];
  isLoading = false;

  constructor(private apiService: ProductService, private router: Router) { }

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
  
  editProduct(id: number): void {
    this.router.navigate(['/edit-product/', id]);
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
    this.router.navigate(['/create-product']);
  }
}
