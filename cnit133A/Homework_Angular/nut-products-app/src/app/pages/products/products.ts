import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Product } from '../../../models/product.interface';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Product[]>('products.json')  // Changed from 'assets/products.json'
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