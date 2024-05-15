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

    getCategories(){
        return this._http.get(this.url + 'category/categories');    
    }
}
