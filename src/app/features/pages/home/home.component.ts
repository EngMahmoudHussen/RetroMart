import { Component } from '@angular/core';
import { RecentProductComponent } from "./component/recent-product/recent-product.component";
import { PopularCategoriesComponent } from "./component/popular-categories/popular-categories.component";
import { MainSliderComponent } from "./component/main-slider/main-slider.component";

@Component({
  selector: 'app-home',
  imports: [RecentProductComponent, PopularCategoriesComponent, MainSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
