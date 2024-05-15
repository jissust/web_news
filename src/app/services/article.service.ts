import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable()
export class ArticleService {
  public url!: string;

  constructor(private _http: HttpClient) {
    this.url = Global.urlApi;
  }

  create(article: any): Observable<any> {
    let params = JSON.stringify(article);
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    return this._http.post(this.url + 'save', params, { headers: headers });
  }
  update(article: any): Observable<any> {
    let id = article._id;
    let params = JSON.stringify(article);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'article/' + id, params, {
      headers: headers,
    });
  }
  getArticles(last: any = null): Observable<any> {
    var articles = 'articles';

    /*if (last != null) {
          articles = 'articles/' + last;
        }*/

    return this._http.get(this.url + articles);
  }
  getArticle(articleId: any): Observable<any> {
    return this._http.get(this.url + 'article/' + articleId);
  }
  delete(id: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.delete(this.url + 'article/' + id, { headers: headers });
  }
}
