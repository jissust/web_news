import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { CategoryService } from '../../services/category.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NavbarComponent, HttpClientModule, RouterModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
  providers: [CategoryService],
})
export class CategoryComponent implements OnInit {
  public categories!: any;

  constructor(
    private _categoryService: CategoryService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _http: HttpClient
  ) {
    this.getCategories();
  }

  ngOnInit(): void {}

  getCategories() {
    this._categoryService
      .getCategories()
      .pipe()
      .subscribe({
        next: (element: any) => {
          if (element.status == 'success') {
            this.categories = element.category;
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  delete(id: any) {
    this._categoryService
      .delete(id)
      .pipe()
      .subscribe({
        next: (element: any) => {
          if (element.status == 'success') {
            this.getCategories();
            this._router.navigate(['/admin/categories']);
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
