import { Component, signal } from '@angular/core';
import { DynamicProudctsComponent } from '../../../shared/dynamic-proudcts/dynamic-proudcts.component';
import { topSelling } from '../../../shared/data/topSelling';

@Component({
  selector: 'app-top-selling',
  imports: [DynamicProudctsComponent],
  templateUrl: './top-selling.component.html',
  styleUrl: './top-selling.component.scss',
})
export class TopSellingComponent {
  header = signal('Top SELLING');
  topSelling = topSelling;
}
