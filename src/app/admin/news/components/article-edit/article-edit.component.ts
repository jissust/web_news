import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Article } from '../../../../models/article';
import { ArticleService } from '../../../../services/article.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Category } from '../../../../models/category';
import { CategoryService } from '../../../../services/category.service';
import { ArticleCategoryService } from '../../../../services/article_category.service';
import { Global } from '../../../../services/global';
import { ArticleCarruselService } from '../../../../services/article_carrusel.service';
import { ImgDropzoneJsComponent } from '../../../img-dropzone-js/img-dropzone-js.component';
import { ListErrorsComponent } from '../../../components/list-errors/list-errors.component';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-article-edit',
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
  templateUrl: './article-edit.component.html',
  styleUrl: './article-edit.component.css',
  providers: [
    ArticleService,
    CategoryService,
    ArticleCategoryService,
    ArticleCarruselService,
  ],
})
export class ArticleEditComponent implements OnInit {
  public page_title!: string;
  public article!: Article;
  public categories!: Category[];
  public categorySelected!: string;
  public url!: string;
  public article_carrusel_images!: [];
  public imageChange: File[] = [];
  public fileName!: string;
  public getErrors: [] = [];
  public articleForm: FormGroup;
  public stateInit: boolean = true;

  constructor(
    private _articleService: ArticleService,
    private _categoryService: CategoryService,
    private _articleCategoryService: ArticleCategoryService,
    private _articleCarruselService: ArticleCarruselService,
    private _router: Router,
    private _route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.page_title = 'Editar noticia';
    this.article = new Article('', '', '', '');
    this.getCategories();
    this.getArticle();
    this.articleForm = new FormGroup({
      title: new FormControl(this.article.title,Validators.required),
      content: new FormControl(this.article.content, Validators.required),
      category: new FormControl(this.categorySelected,Validators.required)
    })
  }
  ngOnInit(): void {
    this.url = Global.urlApi;
  }
  onSubmit() {

    this.stateInit = false;
    var form = this.articleForm;
    this.article.title = form.value.title;
    this.article.content = form.value.content;
    
    if(form.valid){
    var formData = new FormData();
    //formData.append('file', this.imageChange);
    this.imageChange.forEach((file, index) => {
      formData.append('file', file);
    });
    console.log(this.categorySelected)
    console.log(this.article)
    this._articleService
      .update(this.article)
      .pipe()
      .subscribe({
        next: (element: any) => {
          if (element.status == 'success') {
            this.article = element.art;

            //Relación entre Article y Category
            this._articleCategoryService
              .update(this.categorySelected, this.article)
              .pipe()
              .subscribe({
                next: (element: any) => {
                  //console.log(element);
                  //this._router.navigate(['/admin/news']);
                },
                error: (error) => {
                  console.log(error);
                },
              });

            // Relación entre Article y Article Carrusel (relacion entre imagenes y articulos)
            this._articleCarruselService
              .save(this.article._id, formData)
              .pipe()
              .subscribe({
                next: (element: any) => {
                  this.toastr.success(
                    'El artículo fue editado exitosamente.',
                    'Artículo editado!'
                  );
                  this._router.navigate(['/admin/news']);
                },
                error: (error) => {
                  this.toastr.error('No se pudo editar el artículo.', 'Error');
                },
              });
          }
        },
        error: (error: any) => {
          console.log(error);
          this.toastr.error('No se pudo editar el artículo.', 'Error');
        },
      });
    }else{
      console.log("formulario invalido")
    }
  }
  getArticle() {
    this._route.params.pipe().subscribe({
      next: (element: any) => {
        let id = element.id;
        this._articleService
          .getArticle(id)
          .pipe()
          .subscribe({
            next: (element: any) => {
              if (element.status == 'success') {
                
                this.article = element.article;
                
                this.categorySelected = '';
                this.getArticleCategory();

                /*this.articleForm = new FormGroup({
                  title: new FormControl(this.article.title,Validators.required),
                  category: new FormControl(this.categorySelected,Validators.required),
                  content: new FormControl(this.article.content, Validators.required)
                })*/
                this.getArticleCarrusel();
              }
            },
            error: (error) => {
              console.log(error);
            },
          });
      },
      error: (error) => {
        console.log(error);
      },
    });
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
  getArticleCategory () {
    let id = this.article._id;
    this._articleCategoryService
      .getArticleCategory(id)
      .pipe()
      .subscribe({
        next: (element: any) => {
          if (element.status == 'success') {
            this.categorySelected = element.article.category_id;

            this.articleForm = new FormGroup({
              title: new FormControl(this.article.title,Validators.required),
              category: new FormControl(this.categorySelected,Validators.required),
              content: new FormControl(this.article.content, Validators.required)
            })
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  getArticleCarrusel() {
    let id = this.article._id;
    this._articleCarruselService
      .getArticleCarrusel(id)
      .pipe()
      .subscribe({
        next: (element: any) => {
          if (element.status == 'success') {
            this.article_carrusel_images = element.res;
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  onFileSelected(event: any) {
    this.imageChange = event.target.files[0];
    this.fileName = event.target.files[0].name;
  }
  deleteImage(image: any) {
    Swal.fire({
      title: '¿Estas seguro que desea eliminar imagen?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this._articleCarruselService
          .delete(image._id)
          .pipe()
          .subscribe({
            next: (element: any) => {
              this.getArticle();
              this.toastr.success(
                'Imagen eliminado exitosamente.',
                'Imagen eliminada!'
              );
            },
            error: (error) => {
              this.toastr.error(
                'No se pudo eliminar la imagen.',
                'Error al eliminar imagen!'
              );
            },
          });
      }
    });
  }
  onChange(event: any) {
    /** category id */
    let categoryId = event.target.value;
    this.categorySelected = categoryId;
  }
}
