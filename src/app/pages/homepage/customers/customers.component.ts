import { NgFor, NgIf } from '@angular/common';
import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { CarouselModule, CarouselComponent } from 'ngx-owl-carousel-o';
import { debounceTime, delay } from 'rxjs';
import { CommentsService } from '../../../services/comments.service';
import { Comment } from '../../../shared/models/comment.interface';

@Component({
  selector: 'app-customers',
  imports: [CarouselModule, NgFor, NgIf],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent implements OnInit {
  private commentSerive = inject(CommentsService);
  ngOnInit(): void {
    this.getComments();
  }
  CUSTOMERS = signal<Comment[]>([]);
  getComments() {
    this.commentSerive
      .getComments()

      .subscribe({
        next: (res: Comment[]) => {
          this.CUSTOMERS.set(res);
          this.commentSerive.setComments(res);
        },
        error: (err) => {
          console.error('Error loading comments:', err);
        },
      });
  }
  @ViewChild('owlCar', { static: false }) owlCar!: CarouselComponent;

  forWard() {
    this.owlCar.next(); // يتقدم شريحة للأمام
  }

  backWard() {
    this.owlCar.prev(); // يتراجع شريحة للخلف
  }
  getStars(rate: number): number[] {
    return Array(5)
      .fill(0)
      .map((_, i) => (i < rate ? 1 : 0));
  }
  carouselOptions = {
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  };
}
