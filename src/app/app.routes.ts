import { Routes } from '@angular/router';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

export const routes: Routes = [
    { path: 'create-product', component: CreateProductComponent },
    { path: 'edit-product/:id', component: EditProductComponent }
];
