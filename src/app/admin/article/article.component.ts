import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { Article } from '../../models/article';
import { FormsModule } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { ArticleCategoryService } from '../../services/article_category.service';
import { ArticleCategory } from '../../models/article_category';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [NavbarComponent, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
  providers: [ArticleService, CategoryService, ArticleCategoryService]
})
export class ArticleComponent implements OnInit{
  public article!: Article;
  public page_title!: String;
  public categories!: Category[];
  public categorySelected!: string;

  ngOnInit(): void {

  }
  constructor(
    private _articleService: ArticleService,
    private _articleCategoryService: ArticleCategoryService,
    private _categoryService: CategoryService,
    private _router: Router
  ){
    this.page_title = 'Crear articulo';
    this.article = new Article('', '', '', '');
    this.getCategories();
    this.categorySelected = '';
  }
  onSubmit(){
    this._articleService
    .create(this.article)
    .pipe()
    .subscribe({
      next: (element:any) => {
        let categoryId = this.categorySelected;
        if(element.status == 'success'){
          let articleId = element.article._id;
          
          let articleCategory = new ArticleCategory('', '', '');
          articleCategory.article_id = articleId;
          articleCategory.category_id = categoryId;
          this._articleCategoryService
          .save(articleCategory)
          .pipe()
          .subscribe({
            next: (element:any) => {
              console.log(element)
              if(element.status == 'success'){
                this._router.navigate(['/admin/news']);
              }
            },
            error: (error) => {
              console.log(error)
            }
          })
        }        
      },
      error: (error:any) => {
        console.log(error);
      }
    });
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
  onChange(event: any){
    /** category id */
    let categoryId = event.target.value;
    this.categorySelected = categoryId;
  }
}
