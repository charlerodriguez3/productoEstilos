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
  }
}
