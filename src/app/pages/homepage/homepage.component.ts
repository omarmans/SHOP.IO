import { Component } from "@angular/core";
import { LandingComponent } from "./landing/landing.component";
import { NewArrivalsComponent } from "./new-arrivals/new-arrivals.component";
import { TopSellingComponent } from "./top-selling/top-selling.component";
import { BrowseComponent } from "./browse/browse.component";
import { CustomersComponent } from "./customers/customers.component";

@Component({
  selector: "app-homepage",
  imports: [
    LandingComponent,
    NewArrivalsComponent,
    TopSellingComponent,
    BrowseComponent,
    CustomersComponent,
  ],
  templateUrl: "./homepage.component.html",
  styleUrl: "./homepage.component.scss",
})
export class HomepageComponent {}
