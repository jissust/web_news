import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Global } from "./global";

@Injectable()
export class CategoryService{
    public url!: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.urlApi;
    }
    create(category: any): Observable<any> {
        let params = JSON.stringify(category);
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.post(this.url + 'category/save', params, { headers: headers });
    }
    getCategories(){
        return this._http.get(this.url + 'category/categories');    
    }
    getCategory(categoryId: string){
        return this._http.get(this.url + 'category/' + categoryId)
    }
}
