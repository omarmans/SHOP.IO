import { Component, signal } from '@angular/core';
import { DynamicProudctsComponent } from '../../../shared/dynamic-proudcts/dynamic-proudcts.component';
import { newArrivals } from '../../../shared/data/newArrivals';

@Component({
  selector: 'app-new-arrivals',
  imports: [DynamicProudctsComponent],
  templateUrl: './new-arrivals.component.html',
  styleUrl: './new-arrivals.component.scss',
})
export class NewArrivalsComponent {
  header = signal('New Arrivals');
  newArrivals = newArrivals;
}
