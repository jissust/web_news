import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { Router, RouterModule } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, RouterModule, HttpClientModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
  providers: [ArticleService]
})
export class NewsComponent implements OnInit {
  public articles!: any;
  constructor(
    private _articleService: ArticleService,
    private _router: Router,
    
  ){
    this.getArticles()
  }
  ngOnInit(): void {
      
  }
  getArticles(){
    this._articleService.getArticles()
    .pipe()
    .subscribe({
      next: (element: any) => {
        if(element.status == 'success'){
          this.articles = element.articles;
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  delete(id: any){
    console.log(id);
    this._articleService.delete(id)
    .pipe()
    .subscribe({
      next: (element:any) => {
        if (element.status == 'success') {
          this.getArticles();
          this._router.navigate(['/admin/news']);
        }  
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
