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

@Component({
  selector: 'app-article-edit',
  standalone: true,
  imports: [NavbarComponent, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './article-edit.component.html',
  styleUrl: './article-edit.component.css',
  providers: [ArticleService, CategoryService, ArticleCategoryService]
})
export class ArticleEditComponent implements OnInit{
  public page_title!: string;
  public article!: Article;
  public categories!: Category[];
  public categorySelected!: string;

  constructor(
    private _articleService: ArticleService,
    private _categoryService: CategoryService,
    private _articleCategoryService: ArticleCategoryService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.page_title = 'Editar noticia';
    this.article = new Article('','','','');
    this.getArticle();    
    this.getCategories();
  }
  ngOnInit(): void {

  }
  onSubmit(){
    this._articleService.update(this.article)
    .pipe()
    .subscribe({
      next: (element:any) => {
        if(element.status == 'success'){
          this.article = element.art;
          this._router.navigate(['/admin/news']);
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
}
