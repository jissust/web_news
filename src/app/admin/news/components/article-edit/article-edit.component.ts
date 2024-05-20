import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { Article } from '../../../../models/article';
import { ArticleService } from '../../../../services/article.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Category } from '../../../../models/category';
import { CategoryService } from '../../../../services/category.service';
import { ArticleCategoryService } from '../../../../services/article_category.service';
import { Global } from '../../../../services/global';
import { ArticleCarruselService } from '../../../../services/article_carrusel.service';

@Component({
  selector: 'app-article-edit',
  standalone: true,
  imports: [NavbarComponent, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './article-edit.component.html',
  styleUrl: './article-edit.component.css',
  providers: [ArticleService, CategoryService, ArticleCategoryService, ArticleCarruselService]
})
export class ArticleEditComponent implements OnInit{
  public page_title!: string;
  public article!: Article;
  public categories!: Category[];
  public categorySelected!: string;
  public url!: string;
  public article_carrusel_images!: [];
  public imageChange!: string;
  public fileName!: string;

  constructor(
    private _articleService: ArticleService,
    private _categoryService: CategoryService,
    private _articleCategoryService: ArticleCategoryService,
    private _articleCarruselService: ArticleCarruselService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.page_title = 'Editar noticia';
    this.article = new Article('','','','');
    this.getArticle();    
    this.getCategories();
    this.url = Global.urlApi;
    
  }
  ngOnInit(): void {

  }
  onSubmit(){
    var formData = new FormData();
    formData.append('file', this.imageChange);
    this._articleService.update(this.article)
    .pipe()
    .subscribe({
      next: (element:any) => {
        if(element.status == 'success'){
          this.article = element.art;

          /** Relación entre Article y Category */
          this._articleCategoryService.update(this.categorySelected, this.article)
          .pipe()
          .subscribe({
            next: (element:any) => {
              console.log(element)
              //this._router.navigate(['/admin/news']);
            },
            error: (error) => {
              console.log(error)
            }
          })

          /** Relación entre Article y Article Carrusel (relacion entre imagenes y articulos) */
          this._articleCarruselService
          .save(this.article._id, formData)
          .pipe()
          .subscribe({
            next: (element: any) => {
              this._router.navigate(['/admin/news']);
            },
            error: (error) => {

            }
          });  
        }
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }
  getArticle(){
    this._route.params
    .pipe()
    .subscribe({
      next: (element: any) => {
        let id = element.id;
        this._articleService.getArticle(id)
        .pipe()
        .subscribe({
          next: (element:any) => {
            if(element.status == 'success'){
              this.article = element.article;
              this.categorySelected = '';
              this.getArticleCategory();
              this.getArticleCarrusel();
            }
          },
          error: (error) => {
            console.log(error)
          }
        })
      },
      error: (error) => {
        console.log(error);
      }
    })    
  }
  getCategories(){
    this._categoryService.getCategories()
    .pipe()
    .subscribe({
      next: (element:any) => {
        if(element.status == 'success'){
          this.categories = element.category;
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  getArticleCategory(){
    let id = this.article._id;
    this._articleCategoryService
    .getArticleCategory(id)
    .pipe()
    .subscribe({
      next: (element:any) => {
        if(element.status == 'success'){
          this.categorySelected = element.article.category_id;
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  getArticleCarrusel(){
    let id = this.article._id;
    this._articleCarruselService
    .getArticleCarrusel(id)
    .pipe()
    .subscribe({
      next: (element:any) => {
        if(element.status == 'success'){
          this.article_carrusel_images = element.res;
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  onFileSelected(event: any) {
    this.imageChange = event.target.files[0];
    this.fileName = event.target.files[0].name;
  }
}
