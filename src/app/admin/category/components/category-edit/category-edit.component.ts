import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Category } from '../../../../models/category';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [NavbarComponent, FormsModule, HttpClientModule, RouterModule, ReactiveFormsModule],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.css',
  providers: [CategoryService]
})
export class CategoryEditComponent implements OnInit {
  public page_title!: string;
  public category!: Category;
  public categoryForm: FormGroup;
  public autorSelected!: string;
  public stateInit: boolean = true;

  constructor(
    private _categoryService: CategoryService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _http: HttpClient
  ){
    this.page_title = 'Editar categoria';
    this.category = new Category('', '', '');
    this.getCategory();
    this.categoryForm = new FormGroup({
      name: new FormControl(this.category.name, Validators.required),
      autor: new FormControl(this.category.autor)
    });
    this.autorSelected = '';
  }

  ngOnInit(): void {
    
  }
  
  onSubmit(){
    this.stateInit = false;
    var form = this.categoryForm;
    console.log(form)
    if(form.valid){
      this.category.name = form.value.name;
      this.category.autor = this.autorSelected;

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
    }else{
      console.log("formulario invalido")
    }    
  }
  onChange(event: any){
    console.log(event.target.value)
    this.autorSelected = event.target.value;
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

            this.categoryForm = new FormGroup({
              name: new FormControl(this.category.name, Validators.required),
              autor: new FormControl(this.category.autor)
            });
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
