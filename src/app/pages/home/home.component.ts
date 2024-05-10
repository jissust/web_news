import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { ResultAndPositionComponent } from '../result-and-position/result-and-position.component';
import { OutstandingNewsComponent } from '../outstanding-news/outstanding-news.component';
import { VideosComponent } from '../videos/videos.component';
import { NoticeService } from '../../services/notice.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ResultAndPositionComponent, OutstandingNewsComponent, VideosComponent, NavbarComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit {
  public items!:Array<any> ;

  constructor(
    private _home:HomeService, 
    private _notice: NoticeService
  ){}

  ngOnInit(): void {
    this.items = this._notice.getItems();
  }

}
