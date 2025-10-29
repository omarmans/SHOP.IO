import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RatingAndReviewsComponent } from './pages/product-detail-page/rating-and-reviews/rating-and-reviews.component';
import { FAQsComponent } from './pages/product-detail-page/faqs/faqs.component';
import { DetailsComponent } from './pages/product-detail-page/details/details.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent, title: 'Home' },
  {
    path: 'product-details/:id',
    title: 'product-details',

    loadComponent: () =>
      import('./pages/product-detail-page/product-detail-page.component').then(
        (x) => x.ProductDetailPageComponent
      ),
    children: [
      { path: '', redirectTo: 'review', pathMatch: 'full' },
      { path: 'review', component: RatingAndReviewsComponent },
      { path: 'faqs', component: FAQsComponent },
      { path: 'details', component: DetailsComponent },
    ],
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/proudcts/proudcts.component').then(
        (x) => x.ProudctsComponent
      ),
    title: 'Products',
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./pages/cart/cart.component').then((x) => x.CartComponent),
    title: 'Cart',
  },
];
