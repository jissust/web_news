import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable()
export class GameService {
  public url!: String;
  public allSportsApiKey!: String;
  public teamId!: String;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
    this.allSportsApiKey = Global.allSportsApiKey;
    this.teamId = Global.teamId;
  }
  getGames(fechaActual: any, ultimoDia: any): Observable<any> {
    return this._http.get(
      this.url +
        `?met=Fixtures&APIkey=${this.allSportsApiKey}&from=${fechaActual}&to=${ultimoDia}&teamId=${this.teamId}`
    );
  }
  getPreviousGame(fechaActual: any, primerDia: any): Observable<any> {
    return this._http.get(
      this.url +
        `?met=Fixtures&APIkey=${this.allSportsApiKey}&from=${primerDia}&to=${fechaActual}&teamId=${this.teamId}`
    );
  }
}
