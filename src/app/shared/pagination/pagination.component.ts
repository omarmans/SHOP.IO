import { NgClass } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  Input,
  input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [NgClass],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() totalItems = 0;
  @Input() pageSize = 10;
  @Input() currentPage = 1;
  @Output() pageChange = new EventEmitter<number>();
  get totalPages(): number[] {
    const pagesCount = Math.ceil(this.totalItems / this.pageSize);
    return Array.from({ length: pagesCount }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages.length) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }
  prevPage() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }
}
