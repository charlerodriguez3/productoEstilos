import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { ProductService } from '../../services/productService';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { Product } from '../../models/Product';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  imports: [CommonModule, ReactiveFormsModule, NzButtonModule, NzFormModule, NzInputModule, NzInputNumberModule, NzSwitchModule, NzSpinModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
 productForm!: FormGroup;
  productId: number | null = null;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.isLoading = true;
      forkJoin([
        this.productService.token(),
        this.productService.getProductById(this.productId)
      ]).subscribe({
        next: ([tokenResponse, product]) => {
          this.productForm.patchValue(product);
          if (product.creationDate) {
            this.productForm.get('creationDate')?.patchValue(new Date(product.creationDate));
          }
          this.isLoading = false;
        },
        error: (error) => {
          this.message.error('Failed to load product for editing.');
          console.error('Error loading product for edit:', error);
          this.isLoading = false;
          this.router.navigate(['/']);
        }
      });
    } else {
      this.message.error('No product ID provided for editing.');
      this.router.navigate(['/']);
    }
  }

  initForm(): void {
    this.productForm = this.fb.group({
      id: [null], 
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      unitPrice: [null, [Validators.required, Validators.min(0)]],
      internalReference: [null, [Validators.required]],
      state: [true, [Validators.required]],
      unitMeasure: [null, [Validators.required]],
      creationDate: [null]
    });
  }

  submitForm(): void {
    if (this.productForm.valid) {
      const productToUpdate: Partial<Product> = {
        id: this.productId!,
        name: this.productForm.value.name,
        description: this.productForm.value.description,
        unitPrice: this.productForm.value.unitPrice,
        internalReference: this.productForm.value.internalReference,
        state: this.productForm.value.state,
        unitMeasure: this.productForm.value.unitMeasure,
      };


      if (this.productId !== null) {
        this.productService.updateProduct(this.productId, productToUpdate).subscribe({
          next: () => {
            this.message.success('Product updated successfully!');
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/']);
            });
          },
          error: (error) => {
            this.message.error('Failed to update product.');
            console.error('Error updating product:', error);
          }
        });
      } else {
        this.message.error('Product ID is missing for update operation.');
      }
    } else {
      Object.values(this.productForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
