import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { Category } from '../../../../models/category';
import { CategoryService } from '../../../../services/category.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [NavbarComponent, FormsModule, HttpClientModule],
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css',
  providers: [CategoryService],
})
export class CategoryCreateComponent {
  public page_title!: string;
  public category!: Category;

  constructor(private _categoryService: CategoryService) {
    this.page_title = 'Crear categoria';
    this.category = new Category('', '', '');
  }
  onSubmit() {
    this._categoryService
      .create(this.category)
      .pipe()
      .subscribe({
        next: (element: any) => {
          if (element.status == 'success') {
            window.location.href = 'admin/categories';
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
