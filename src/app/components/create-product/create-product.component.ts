import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { Product } from '../../models/Product';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProductService } from '../../services/productService';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzButtonModule, NzFormModule, NzInputModule, NzInputNumberModule, NzSwitchModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]], 
      unitPrice: [null, [Validators.required, Validators.min(0)]],
      internalReference: [null, [Validators.required]], 
      state: [true, [Validators.required]],
      unitMeasure: [null, [Validators.required]], 
      creationDate: [new Date()]
    });
  }

  submitForm(): void {
    if (this.productForm.valid) {
      const newProduct: Omit<Product, 'id'> = this.productForm.value;
      this.productService.createProduct(newProduct).subscribe({
        next: (product) => {
          this.message.success('Product created successfully!');
          console.log('Product created:', product);
          this.productForm.reset({ state: true, creationDate: new Date() }); 
        },
        error: (error) => {
          this.message.error('Failed to create product.');
          console.error('Error creating product:', error);
        }
      });
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
