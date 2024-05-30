import { Component } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { Category } from '../../../../models/category';
import { CategoryService } from '../../../../services/category.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [NavbarComponent, FormsModule, HttpClientModule, RouterModule, ReactiveFormsModule],
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.css',
  providers: [CategoryService],
})
export class CategoryCreateComponent {
  public page_title!: string;
  public category!: Category;
  public categoryForm: FormGroup;
  public autorSelected!: string;
  public stateInit: boolean = true;

  constructor(
    private _categoryService: CategoryService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _http: HttpClient,
    private toastr: ToastrService
  ) {
    this.page_title = 'Crear categoria';
    this.category = new Category('', '', '');
    this.categoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      autor: new FormControl('')
    });
    this.autorSelected = '';
  }
  onSubmit() {
    this.stateInit = false;
    var form = this.categoryForm;
    
    if(form.valid){
      this.category.name = form.value.name;
      this.category.autor = this.autorSelected;
    this._categoryService
      .create(this.category)
      .pipe()
      .subscribe({
        next: (element: any) => {
          if (element.status == 'success') {
            this.toastr.success(
              'Categoria creara exitosamente.',
              'Categoria creada!'
            );
            this._router.navigate(['/admin/categories'])
          }
        },
        error: (error) => {
          console.log(error);
          this.toastr.error(
            'No se pudo crear la categoria.',
            'Error'
          );
        },
      });
    }else{
      console.log("formulario invalido")
    }
  }
  onChange(event: any){
    console.log(event.target.value)
    this.autorSelected = event.target.value;
  }
}
