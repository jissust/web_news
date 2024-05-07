import { Component, OnInit } from '@angular/core';
import { ResultComponent } from './components/result/result.component';
import { Global } from '../../services/global';
import { GameService } from '../../services/games.service';
import { HttpClientModule } from '@angular/common/http';
import { elementAt } from 'rxjs';
import { Element } from '@angular/compiler';

@Component({
  selector: 'app-result-and-position',
  standalone: true,
  imports: [ResultComponent, HttpClientModule],
  templateUrl: './result-and-position.component.html',
  styleUrl: './result-and-position.component.css',
  providers: [GameService],
})
export class ResultAndPositionComponent implements OnInit {
  public nextResult: any[] = [];
  public previousResult: any[] = [];

  ngOnInit(): void {
    this.getNextGame();
    this.getPreviousGame();
  }

  constructor(private _games: GameService) {}
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
      .getPreviousGame(
        current,
        firstDayPrevious.toISOString().slice(0, 10)
      )
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
}
