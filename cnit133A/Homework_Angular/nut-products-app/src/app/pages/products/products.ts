import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../../models/product.interface';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']  // fixed typo
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Product[]>('assets/products.json')  // correct path
      .subscribe({
        next: (data) => {
          console.log('Products loaded:', data);
          this.products = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading products:', err);
          this.error = 'Failed to load products';
          this.loading = false;
        }
      });
  }
}