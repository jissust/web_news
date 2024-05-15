import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { CategoryService } from '../../services/category.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [NavbarComponent, HttpClientModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
  providers: [CategoryService]
})
export class CategoryComponent implements OnInit{
  public categories!:any;

  constructor(
    private _categoryService: CategoryService
  ){
    this.getCategories();  
  }

  ngOnInit(): void {
  
  }

  getCategories(){
    this._categoryService
    .getCategories()
    .pipe()
    .subscribe({
      next: (element: any) => {
        if(element.status == 'success'){
          this.categories = element.category; 
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
