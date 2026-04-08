import { OwlOptions } from './../../../../../../../node_modules/ngx-owl-carousel-o/lib/models/owl-options.model.d';
import { Category } from '../../../../../shared/interfaces/category';
import { CategoriesService } from './../../../../../shared/services/categories/categories.service';
import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.scss',
})
export class PopularCategoriesComponent implements OnInit {
  _categoriesService = inject(CategoriesService);
  categores!: Category[];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 5,
      },
    },
    nav: true,
  };
  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories() {
    this._categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log('Hello', res.data);
        this.categores = res.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}
