import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { RouterOutlet } from '@angular/router';
import { Product } from './models/Product';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule,NzButtonModule, NzDividerComponent,NzTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  // Define the dataSet property as an array of PersonData objects
  dataSet: Product[] = [];

  ngOnInit(): void {
    // You can populate your dataSet here, perhaps from an API call,
    // or with some initial static data as shown below.
    this.dataSet = [
      {
        id: 1,
        name: 'John Doe',
        unitPrice: 32,
        description: '10 Downing Street, London'
      },
      {
        id: 2,
        name: 'Jane Smith',
        unitPrice: 42,
        description: '21B Baker Street, London'
      },
      {
        id: 3,
        name: 'Mike Johnson',
        unitPrice: 28,
        description: '1600 Pennsylvania Avenue, Washington D.C.'
      },
      {
        id: 4,
        name: 'Alice Williams',
        unitPrice: 35,
        description: '123 Main Street, Anytown'
      }
    ];


    //   constructor(private apiService: ApiService) { } // <-- Inject the service

    // ngOnInit(): void {
    //   this.loginAndLoadProducts();
    // }

    // private loginAndLoadProducts(): void {
    //   this.apiService.login().subscribe({
    //     next: () => {
    //       console.log('Login successful, fetching products...');
    //       this.loadProducts();
    //     },
    //     error: (err) => {
    //       console.error('Login failed:', err);
    //       this.isLoading = false;
    //       // Handle login error (e.g., show a message to the user)
    //     }
    //   });
    // }

    // loadProducts(): void {
    //   this.isLoading = true;
    //   this.apiService.getAllProducts().subscribe({
    //     next: (products) => {
    //       this.dataSet = products;
    //       this.isLoading = false;
    //       console.log('Products loaded:', products);
    //     },
    //     error: (err) => {
    //       console.error('Error loading products:', err);
    //       this.isLoading = false;
    //       // Handle error (e.g., show an error message)
    //     }
    //   });
    // }

    // viewDetails(product: Product): void {
    //   console.log('Viewing details for:', product.name);
    //   this.apiService.getProductById(product.id).subscribe({
    //     next: (details) => console.log('Details:', details),
    //     error: (err) => console.error('Error getting details:', err)
    //   });
    // }

    // editProduct(product: Product): void {
    //   console.log('Editing product:', product.name);
    //   // Example: updating price
    //   const updatedPrice = product.price + 5;
    //   this.apiService.updateProduct(product.id, { price: updatedPrice }).subscribe({
    //     next: (updated) => {
    //       console.log('Product updated in UI:', updated);
    //       this.loadProducts(); // Reload to reflect changes
    //     },
    //     error: (err) => console.error('Error updating product:', err)
    //   });
    // }

    // createProduct(): void {
    //   const newProduct = {
    //     name: 'New Gadget ' + (this.dataSet.length + 1),
    //     description: 'A newly added item.',
    //     price: Math.floor(Math.random() * 100) + 10,
    //     stock: Math.floor(Math.random() * 500) + 10
    //   };
    //   this.apiService.createProduct(newProduct).subscribe({
    //     next: (created) => {
    //       console.log('Product created:', created);
    //       this.loadProducts(); // Reload to include new product
    //     },
    //     error: (err) => console.error('Error creating product:', err)
    //   });
    // }

    // deleteProduct(id: string): void {
    //   console.log('Deleting product ID:', id);
    //   this.apiService.deleteProduct(id).subscribe({
    //     next: () => {
    //       console.log('Product deleted successfully');
    //       this.dataSet = this.dataSet.filter(p => p.id !== id); // Remove from local dataset
    //     },
    //     error: (err) => console.error('Error deleting product:', err)
    //   });
    // }
  }
}
