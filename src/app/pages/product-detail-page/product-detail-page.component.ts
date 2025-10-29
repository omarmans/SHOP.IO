import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {
  ActivatedRoute,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { newArrivals } from '../../shared/data/newArrivals';
import { ProductData } from '../../shared/models/productData.interface';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail-page',
  imports: [
    RouterOutlet,
    NgFor,
    NgSwitchCase,
    NgSwitch,
    NgIf,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
  ],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss',
})
export class ProductDetailPageComponent implements OnInit {
  product?: ProductData;
  products = newArrivals;
  productFormData!: FormGroup;
  private toastr = inject(ToastrService); // ✅ Inject Toastr
  private cartservice = inject(CartService);
  private formBuilder = inject(FormBuilder);
  ngOnInit() {
    //عشان يظهر المنتج من الاول و ف نفس الوقت يظهر التعليقات
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.product = this.products().find((p: ProductData) => p?.id === id);

    this.productFormData = this.formBuilder.group({
      productName: [this.product?.name, Validators.required],
      size: ['', Validators.required],
      color: ['', Validators.required],
      img: [this.product?.img, Validators.required],
      price: [this.product?.price, Validators.required],
      amount: [this.quaninty(), Validators.required],
    });
  }
  // counter
  quaninty = signal(0);
  increment() {
    this.quaninty.set(this.quaninty() + 1);
    const amount = this.productFormData.get('amount')?.value || 0;
    this.productFormData.get('amount')?.setValue(amount + 1);
  }
  decrement() {
    this.quaninty.set(this.quaninty() - 1);
    const amount = this.productFormData.get('amount')?.value || 0;
    if (amount > 0) {
      this.productFormData.get('amount')?.setValue(amount - 1);
    }
  }
  imgs = signal([
    'imgs/product/frame1.png',
    'imgs/product/frame2.png',
    'imgs/product/52ce3b469d8d7ff6e33f95a574450e07218fc909.png',
  ]);
  //#########COLORS#################
  colors = signal(['#4F4631', '#314F4A', '#31344F']);
  selectedColor = signal<string | null>(null);
  selectColor = (color: string) => {
    this.selectedColor.set(color);
    this.productFormData.get('color')?.setValue(color);
  };
  isSelected = (color: string) => {
    return computed(() => this.selectedColor() === color);
  };
  //#########COLORS#################

  sizes = signal(['Small', 'Medium', 'Large', 'X-large']);
  private route = inject(ActivatedRoute);

  getStars(rate: any): ('full' | 'half' | 'empty')[] {
    const full = Math.floor(rate);
    const half = rate % 1 >= 0.25 && rate % 1 < 0.75;
    const empty = 5 - full - (half ? 1 : 0);

    return [
      ...Array(full).fill('full'),
      ...(half ? ['half'] : []),
      ...Array(empty).fill('empty'),
    ];
  }

  onSubmit() {
    if (!this.product) return;

    const selectedColor = this.productFormData.get('color')?.value;
    const selectedSize = this.productFormData.get('size')?.value;
    const amount = this.productFormData.get('amount')?.value;

    if (!selectedColor || !selectedSize || !amount) {
      this.toastr.warning('Please fill in all fields!', 'Missing Info');
      return;
    }

    const finalData = {
      ...this.product,
      color: selectedColor,
      size: selectedSize,
      amount: amount,
    };
    const carts = this.cartservice.addToCart(finalData);
    localStorage.setItem('carts', JSON.stringify(carts));
    console.log('✅ Final Object:', finalData);
    this.toastr.success('add to Cart Succesully');
    // Swal.fire({
    //   title: 'Added!',
    //   text: 'The product has been added to your cart.',
    //   icon: 'success',
    //   confirmButtonText: 'OK',
    // });
    this.productFormData.reset({
      productName: this.product.name,
      size: '',
      color: '',
      img: this.product.img,
      price: this.product.price,
      amount: 0,
    });
    this.quaninty.set(0);
  }
}

// ngOnInit() {
//   const id = +this.route.snapshot.paramMap.get('id')!;
//   this.productService.getProductById(id).subscribe((res: data) => {
//     this.product = res;
//   });
// }
