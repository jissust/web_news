import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Category } from '../../../../models/category';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [NavbarComponent, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.css',
  providers: [CategoryService]
})
export class CategoryEditComponent {
  public page_title!: string;
  public category!: Category;

  constructor(
    private _categoryService: CategoryService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _http: HttpClient
  ){
    this.page_title = 'Editar categoria';
    this.category = new Category('', '', '');
    this.getCategory();
  }
  onSubmit(){
    this._categoryService.update(this.category)
    .pipe()
    .subscribe({
      next: (element: any) => {
        if(element.status == 'success'){
          this._router.navigate(['/admin/categories'])
        }
      },
      error: (error)=>{
        console.log(error)
      }
    })
    
  }
  getCategory(){
    this._route.params
    .pipe()
    .subscribe({
      next: (element: any) => {
        this._categoryService.getCategory(element.id)
        .pipe()
        .subscribe({
          next: (element: any) => {
            this.category = element.category;
          },
          error: (error) => {
            console.log(error);
          }
        })
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
