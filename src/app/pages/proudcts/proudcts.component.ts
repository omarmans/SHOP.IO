import {
  NgClass,
  NgFor,
  NgIf,
  NgStyle,
  NgSwitch,
  NgSwitchCase,
} from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { products } from '../../shared/data/products';
import { PaginationComponent } from '../../shared/pagination/pagination.component';

@Component({
  selector: 'app-proudcts',
  imports: [
    NgStyle,
    NgClass,
    NgIf,
    NgFor,
    NgSwitch,
    NgSwitchCase,
    PaginationComponent,
  ],
  templateUrl: './proudcts.component.html',
  styleUrl: './proudcts.component.scss',
})
export class ProudctsComponent implements OnInit {
  ngOnInit() {
    //عشان يظهر المنتج من الاول و ف نفس الوقت يظهر التعليقات
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  products = products;
  currentPage = 1;
  pageSize = 10;

  get pagedProducts() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.products().slice(start, start + this.pageSize);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }
  isColorsOpened = signal(false);
  isSizesOpened = signal(false);
  isFilterOpened = signal(false);
  isDressOpened = signal(false);
  isOpen = false;
  isFilterMenuopend = false;

  toggleInSmallScreen() {
    this.isFilterMenuopend = !this.isFilterMenuopend;
    console.log(this.isFilterMenuopend);
  }
  selectedOption = 'Most Popular';
  selectOption(option: string) {
    this.selectedOption = option;
    this.isOpen = false;
  }
  toggleColors() {
    this.isColorsOpened.update((v) => !v);
  }

  toggleSizes() {
    this.isSizesOpened.update((v) => !v);
  }
  togglefilters() {
    this.isFilterOpened.update((v) => !v);
  }
  toggleStyle() {
    this.isDressOpened.update((v) => !v);
  }
  filters = signal<string[]>([
    'T-shirts',
    'Shorts',
    'Shirts',
    'Hoodie',
    'Jeans',
  ]);
  DressStyle = signal<string[]>(['Casual', 'Formal', 'Party', 'Gym', 'Jeans']);
  colors = signal<string[]>([
    '#00C12B',
    '#F50606',
    '#F5DD06',
    '#F57906',
    '#06CAF5',
    '#063AF5',
    '#7D06F5',
    '#F506A4',
    '#FFFFFF',
    '#000000',
  ]);
  sizes = signal([
    'XX-Small',
    'X-Small',

    'Small',
    'Medium',
    'Large',
    'X-large',

    'XX-large',

    '3X-large',
    '4X-large',
  ]);
  getStars(rate: number): ('full' | 'half' | 'empty')[] {
    const full = Math.floor(rate);
    const half = rate % 1 >= 0.25 && rate % 1 < 0.75;
    const empty = 5 - full - (half ? 1 : 0);

    return [
      ...Array(full).fill('full'),
      ...(half ? ['half'] : []),
      ...Array(empty).fill('empty'),
    ];
  }
  closeFilter() {
    this.isFilterMenuopend = false;
  }
}
