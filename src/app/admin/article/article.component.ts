import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { Article } from '../../models/article';
import { FormsModule } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [NavbarComponent, FormsModule, HttpClientModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
  providers: [ArticleService]
})
export class ArticleComponent implements OnInit{
  public article!: Article;
  public page_title!: String;

  ngOnInit(): void {
  
  }
  constructor(
    private _articleService: ArticleService
  ){
    this.page_title = 'Crear articulo';
    this.article = new Article('', '', '', '');
  }
  onSubmit(){
    this._articleService
    .create(this.article)
    .pipe()
    .subscribe({
      next: (element:any) => {
        console.log(element);
      },
      error: (error:any) => {
        console.log(error);
      }
    });
  }
}
