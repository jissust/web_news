import { Component, OnInit } from '@angular/core';
import { ResultComponent } from './components/result/result.component';
import { Global } from '../../services/global';
import { GameService } from '../../services/games.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-result-and-position',
  standalone: true,
  imports: [ResultComponent, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './result-and-position.component.html',
  styleUrl: './result-and-position.component.css',
  providers: [GameService],
})
export class ResultAndPositionComponent implements OnInit {
  public nextResult: any = [];
  public previousResult: any = [];
  public positions: any = [];
  public reducedPositionList: any = [];
  public teamId!: string;
  public group!: string;
  public year!: number;
  public localTournament!: string;
  public localTournamentId: number = 44;
  public liberatorsCup: number = 18;
  public positionsLiberatorsCup: any = [];
  public groupLiberatorsCup!: string;
  public liberatorsCupName!: string;

  ngOnInit(): void {
    this.getPosition();
    this.getPositionLiberatorsCup();
    this.getNextGame();
    this.getPreviousGame();
  }

  constructor(private _games: GameService) {
    this.teamId = Global.teamId;
    this.year = Global.year;
    this.localTournament = Global.localTournament;
    this.liberatorsCupName = Global.liberatorsCupName;
  }
  getNextGame() {
    let date = new Date();
    let current = date.toISOString().slice(0, 10);
    let nextMonth = date.getMonth() + 1;
    let nextYear = date.getFullYear();

    if (nextMonth === 12) {
      nextMonth = 0;
      nextYear++;
    }

    let firstDateNext = new Date(nextYear, nextMonth, 1);
    firstDateNext.setDate(firstDateNext.getDate() - 1);
    let lastDay = firstDateNext.toISOString().slice(0, 10);

    this._games
      .getGames(current, lastDay)
      .pipe()
      .subscribe({
        next: (element: any) => {
          this.nextResult = element.result.reverse()[0];
        },
        error: (error) => {
          console.log(`Error: ${error}`);
        },
      });
  }
  getPreviousGame() {
    let date = new Date();
    let current = date.toISOString().slice(0, 10);
    let lastMonth = date.getMonth() - 1;
    let lastYear = date.getFullYear();

    if (lastMonth < 0) {
      lastMonth = 11;
      lastYear--;
    }
    let firstDayPrevious = new Date(lastYear, lastMonth, 1);

    this._games
      .getPreviousGame(current, firstDayPrevious.toISOString().slice(0, 10))
      .pipe()
      .subscribe({
        next: (element: any) => {
          this.previousResult = element.result[0];
        },
        error: (error) => {
          console.log(`Error: ${error}`);
        },
      });
  }
  getPosition() {
    this._games
      .getPosition(this.localTournamentId)
      .pipe()
      .subscribe({
        next: (element: any) => {
          let listItems = element.result.total;
          let sl = listItems.find((item: any) => item.team_key == this.teamId);
          this.group = sl.league_round;

          /** tabla de posiciones completa - liga argentina */
          let positions = listItems.filter(
            (item: any) =>
              item.league_round === this.group &&
              item.stage_name === '1st Phase'
          );
          this.positions = positions;

          /** tabla de posiciones reducida - ligar argentina */
          this.reducedPositionList = positions.slice(0, 4);
          if (sl.standing_place > 3) {
            this.reducedPositionList.pop();
            this.reducedPositionList.push(sl);
          }
        },
        error: (error) => {
          console.log(`Error: ${error}`);
        },
      });
  }
  getPositionLiberatorsCup() {
    this._games
      .getPosition(this.liberatorsCup)
      .pipe()
      .subscribe({
        next: (element: any) => {
          let listItems = element.result.total;
          let sl = listItems.find((item: any) => item.team_key == this.teamId);
          this.groupLiberatorsCup = sl.league_round;
          /** tabla de posiciones - copa libertadores */
          let positions = listItems.filter(
            (item: any) => item.league_round === this.groupLiberatorsCup
          );
          this.positionsLiberatorsCup = positions;
        },
        error: (error) => {
          console.log(`Error: ${error}`);
        },
      });
  }
}
