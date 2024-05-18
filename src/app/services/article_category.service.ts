import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable()
export class ArticleCategoryService {
  public url!: string;
  constructor(private _http: HttpClient) {
    this.url = Global.urlApi;
  }
  save(article_category: any): Observable<any> {
    let params = JSON.stringify(article_category);
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    return this._http.post(this.url + 'article_category/save', params, {
      headers: headers,
    });
  }
  getArticleCategory(id: any): Observable<any>{
    return this._http.get(this.url + 'article_category/' + id);
  }
  update(category_id:any, article: any): Observable<any> {
    let id = article._id;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let params = JSON.stringify({'category_id': category_id});

    return this._http.put(this.url + 'article_category/article_id/' + id, params, {
      headers: headers,
    });
  }
}
