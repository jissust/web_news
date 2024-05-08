import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable()
export class GameService {
  public url!: String;
  public allSportsApiKey!: String;
  public teamId!: String;
  public teamsPosition: any = [];

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
  getPosition(){
    let positions = this._http.get(`https://apiv2.allsportsapi.com/football/?&met=Standings&leagueId=44&APIkey=${this.allSportsApiKey}`);
    /*positions.forEach((position:any) => {

      let sl = position.result.total.find((item:any) => item.standing_team === 'San Lorenzo');
      let group = sl.league_round;
      
      position.result.total.find((item:any) => {
        if(item.league_round === group){
          console.log(item)
        } 
      });
      
    })*/

    return positions;

  }
}
