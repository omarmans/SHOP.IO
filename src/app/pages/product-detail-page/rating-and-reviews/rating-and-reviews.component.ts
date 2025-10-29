import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { DynamicProudctsComponent } from '../../../shared/dynamic-proudcts/dynamic-proudcts.component';
import { CommentsService } from '../../../services/comments.service';
import { debounceTime, delay } from 'rxjs';
import { Comment } from '../../../shared/models/comment.interface';

@Component({
  selector: 'app-rating-and-reviews',
  imports: [NgIf, NgFor, DynamicProudctsComponent],
  templateUrl: './rating-and-reviews.component.html',
  styleUrl: './rating-and-reviews.component.scss',
})
export class RatingAndReviewsComponent implements OnInit {
  showErr = signal(false);
  private commentSerive = inject(CommentsService);
  ngOnInit(): void {
    this.getComments();
  }
  visibleCount = signal(8);
  visibleCustomers = computed(() => {
    return this.CUSTOMERS().slice(0, this.visibleCount());
  });

  showMore() {
    this.visibleCount.update((count) => count + 8);
  }

  CUSTOMERS = signal<Comment[]>([]);
  getComments() {
    this.showErr.set(true);
    this.commentSerive
      .getComments()
      .pipe(delay(5000))
      .subscribe({
        next: (res: Comment[]) => {
          this.CUSTOMERS.set(res);
          this.commentSerive.setComments(res);
          this.showErr.set(false);
        },
        error: (err) => {
          console.error('Error loading comments:', err);
          this.showErr.set(true);
        },
      });
  }
  You_might_also_like = [
    {
      id: 1,
      name: 'Polo with Contrast Trims',
      rate: 5.0,
      price: 212,
      img: 'imgs/also-like/image 7.png',
      mainPrice: 232,
      discountPricePrecntge: -20,
    },
    {
      id: 2,
      name: 'Gradient Graphic T-shirt',
      rate: 4,
      price: 240,
      img: 'imgs/also-like/image 8.png',
    },
    {
      id: 3,
      name: 'Polo with Tipping Details',
      rate: 3,
      price: 80,
      img: 'imgs/also-like/image 9.png',
    },
    {
      id: 3,
      name: 'Black Striped T-shirt',
      rate: 3,
      price: 80,
      img: 'imgs/also-like/image 10.png',
    },
  ];
  isOpen = false;
  selectedOption = 'Latest';

  selectOption(option: string) {
    this.selectedOption = option;
    this.isOpen = false;
  }
  getStars(rate: number): number[] {
    return Array(5)
      .fill(0)
      .map((_, i) => (i < rate ? 1 : 0));
  }
}
