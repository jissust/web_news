import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Global } from "./global";

@Injectable()
export class ArticleCarruselService {
    public url!: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.urlApi;
    }
    save(articleId: any, image: any): Observable<any>{
        return this._http
        .post(this.url + 'upload-image/' + articleId, image);  
    }
    getArticleCarrusel(articleId: any): Observable<any>{
        return this._http.get(this.url + 'article_carrusel/' + articleId);
    }
}
