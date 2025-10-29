import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private carts: any[] = [];
  cartsSubject = new BehaviorSubject<any[]>([]);

  addToCart(product: any) {
    this.carts.push(product);
    this.cartsSubject.next(this.carts);
    return this.carts;
  }
  loadFromLocalStorage() {
    const storedCarts = localStorage.getItem('carts');
    if (storedCarts) {
      this.carts = JSON.parse(storedCarts);
      this.cartsSubject.next(this.carts);
    }
  }
}
