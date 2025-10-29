import { Component, inject, OnInit, signal } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductData } from '../../shared/models/productData.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  myCart = signal<any>([]);
  private cartService = inject(CartService);
  ngOnInit(): void {
    this.cartService.loadFromLocalStorage();
    this.cartService.cartsSubject.subscribe((res: any[]) => {
      this.myCart.set(res);
    });
  }

  // counter
  quaninty = signal(0);
  increment() {
    this.quaninty.set(this.quaninty() + 1);
  }
  decrement() {
    this.quaninty.set(this.quaninty() - 1);
  }

  //remove item
  removeItem(item: ProductData) {
    Swal.fire({
      title: 'Are you sure?',
      text: `This will remove "${item.name}" from your cart.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCart = this.myCart().filter(
          (cartItem: ProductData) => cartItem.name !== item.name
        );
        this.myCart.set(updatedCart);

        Swal.fire({
          title: 'Deleted!',
          text: `"${item.name}" has been removed.`,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  }
}
