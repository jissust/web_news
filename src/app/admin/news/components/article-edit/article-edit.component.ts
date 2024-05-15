import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { Article } from '../../../../models/article';
import { ArticleService } from '../../../../services/article.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-article-edit',
  standalone: true,
  imports: [NavbarComponent, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './article-edit.component.html',
  styleUrl: './article-edit.component.css',
  providers: [ArticleService]
})
export class ArticleEditComponent implements OnInit{
  public page_title!: string;
  public article!: Article;  
  constructor(
    private _articleService: ArticleService,
    private _router: Router,
    private _route: ActivatedRoute
  ){
    this.page_title = 'Editar noticia';
    this.article = new Article('','','','');
    this.getArticle();
  }
  ngOnInit(): void {

  }
  onSubmit(){
    console.log(this.article);
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
}
