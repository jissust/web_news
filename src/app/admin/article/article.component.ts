import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { Article } from '../../models/article';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { ArticleCategoryService } from '../../services/article_category.service';
import { ArticleCategory } from '../../models/article_category';
import { ArticleCarruselService } from '../../services/article_carrusel.service';
import { ImgDropzoneJsComponent } from '../img-dropzone-js/img-dropzone-js.component';
import { ListErrorsComponent } from '../components/list-errors/list-errors.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    NavbarComponent,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ImgDropzoneJsComponent,
    ListErrorsComponent,
    ReactiveFormsModule
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
  providers: [
    ArticleService,
    CategoryService,
    ArticleCategoryService,
    ArticleCarruselService,
  ],
})
export class ArticleComponent implements OnInit {
  public article!: Article;
  public page_title!: String;
  public categories!: Category[];
  public categorySelected!: string;
  public fileName!: string;
  public imageChange: File[] = [];
  public getErrors: [] = [];
  public articleForm: FormGroup;
  public stateInit: boolean = true;

  ngOnInit(): void {}
  constructor(
    private _articleService: ArticleService,
    private _articleCategoryService: ArticleCategoryService,
    private _categoryService: CategoryService,
    private _articleCarruselService: ArticleCarruselService,
    private _router: Router,
    private toastr: ToastrService
  ) {
    this.page_title = 'Crear articulo';
    this.article = new Article('', '', '', '');
    this.getCategories();
    this.categorySelected = '';
    this.articleForm = new FormGroup({
      title: new FormControl('',Validators.required),
      category: new FormControl('',Validators.required),
      content: new FormControl('', Validators.required),
    })
  }
  onSubmit() {
    //var form = this.articleForm;
    this.stateInit = false;
    var form = this.articleForm;

    var formData = new FormData();
    this.imageChange.forEach((file, index) => {
      formData.append('file', file);
    });

    if(form.valid){
      
    this._articleService
      .create(form.value)
      .pipe()
      .subscribe({
        next: (element: any) => {
          let categoryId = this.categorySelected;
          if (element.status == 'success') {
            let articleId = element.article._id;

            // Relación entre Article y Category
            let articleCategory = new ArticleCategory('', '', '');
            articleCategory.article_id = articleId;
            articleCategory.category_id = categoryId;

            this._articleCategoryService
              .save(articleCategory)
              .pipe()
              .subscribe({
                next: (element: any) => {
                  if (element.status == 'success') {

                    // Relación entre Article y Article Carrusel (relacion entre imagenes y articulos)
                    this._articleCarruselService
                      .save(articleId, formData)
                      .pipe()
                      .subscribe({
                        next: (element: any) => {
                          this.toastr.success(
                            'El artículo fue creado exitosamente.',
                            'Artículo creado!'
                          );
                          this._router.navigate(['/admin/news']);
                        },
                        error: (error) => {
                          console.log(error);
                          this.toastr.error(
                            'No se pudo crear el artículo.',
                            'Error'
                          );
                        },
                      });
                  }
                },
                error: (error) => {
                  console.log(error);
                  this.toastr.error('', 'Error');
                },
              });

            // Relación entre Article y User
          } else {
            this.toastr.error('No se pudo crear el artículo.', 'Error');
          }
        },
        error: (error: any) => {
          console.log(error);
          this.toastr.error('No se pudo crear el artículo.', 'Error');
        },
      });

    }else{
      console.log("incompleto")
    }
  }
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
  onChange(event: any) {
    /** category id */
    let categoryId = event.target.value;
    this.categorySelected = categoryId;
  }
  onFileSelected(event: any) {
    this.imageChange = event.target.files[0];
    this.fileName = event.target.files[0].name;
  }
}
