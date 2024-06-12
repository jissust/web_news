import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { Global } from './global';

@Injectable()
export class UserService {
    public url!: string;

    constructor(private _http: HttpClient) {
      this.url = Global.urlApi;
    }
    getUsers(): Observable<any>{
        return this._http.get(this.url + '/users');
    }
    delete(id: any): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url + 'user/' + id, { headers: headers });
    }
    create(user: any): Observable<any> {
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-type', 'application/json');
        return this._http.post(this.url + 'user/create', params, { headers: headers });
    }
    update(id:string, user: any): Observable<any> {
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url + 'user/' + id, params, {
            headers: headers,
        });
    }
    getArticle(userId: any): Observable<any> {
        return this._http.get(this.url + 'user/' + userId);
    }
    login(formValue: any): Observable<any>{
        return this._http.post(this.url + '/login', formValue)
    }
}